const Maintenance = require("../schemas/maintenance.schema")
const Vehicle = require("../schemas/vehicle.schema")
const mongoose = require("mongoose")

const deleteMaintenance = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("ID da manutenção inválido")
            error.status = 400
            throw error
        }

        const maintenance = await Maintenance.findById(id)

        if (!maintenance) {
            const error = new Error("Manutenção não encontrada")
            error.status = 404
            throw error
        }

        await Vehicle.findByIdAndUpdate(
            maintenance.vehicle,
            { $pull: { maintenances: id } }
        )

        await maintenance.deleteOne()
        return maintenance
    } catch (error) {
        const e = new Error("Erro ao deletar manutenção")
        e.status = error.status || 500
        console.error("Erro ao deletar manutenção:", error)
        throw e
    }
}

module.exports = deleteMaintenance
