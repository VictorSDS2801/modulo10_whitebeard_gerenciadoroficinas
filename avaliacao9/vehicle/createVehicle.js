const Vehicle = require("../schemas/vehicle.schema")

const createVehicle = async (plate, model, year, owner) => {
    try {
        if (!plate || !model || !year || !owner) {
            const error = new Error("Todos os campos são obrigatórios.")
            error.status = 400
            throw error
        }

        const newVehicle = new Vehicle({ plate, model, year, owner })
        return await newVehicle.save()
    } catch (error) {
        if (error.code === 11000) {
            const e = new Error("Veículo com esta placa já existe")
            e.status = 400
            throw e
        }

        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao criar veículo:", error)
        throw e
    }
}

module.exports = createVehicle
