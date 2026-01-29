const Maintenance = require("../schemas/maintenance.schema")
const Workshop = require("../schemas/workshop.schema")
const Vehicle = require("../schemas/vehicle.schema")
const mongoose = require("mongoose")

const createMaintenance = async (workshop, vehicle, services, date) => {
    try {
        if (!workshop || !vehicle || !services) {
            const error = new Error("Oficina, veículo e serviços são obrigatórios")
            error.status = 400
            throw error
        }

        if (!Array.isArray(services) || services.length === 0) {
            const error = new Error("Informe pelo menos um serviço")
            error.status = 400
            throw error
        }

        if (
            !mongoose.Types.ObjectId.isValid(workshop) ||
            !mongoose.Types.ObjectId.isValid(vehicle)
        ) {
            const error = new Error("ID de oficina ou veículo inválido")
            error.status = 400
            throw error
        }

        const workshopExists = await Workshop.findById(workshop)
        const vehicleExists = await Vehicle.findById(vehicle)

        if (!workshopExists || !vehicleExists) {
            const error = new Error("Oficina ou veículo não encontrado")
            error.status = 404
            throw error
        }

        const maintenance = new Maintenance({
            workshop,
            vehicle,
            services,
            date
        })

        const savedMaintenance = await maintenance.save()

        workshopExists.vehicles.addToSet(vehicle)
        await workshopExists.save()

        vehicleExists.maintenances.addToSet(savedMaintenance._id)
        await vehicleExists.save()

        return savedMaintenance
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro ao registrar manutenção")
        e.status = error.status || 500
        console.error("Erro ao criar manutenção:", error)
        throw e
    }
}

module.exports = createMaintenance
