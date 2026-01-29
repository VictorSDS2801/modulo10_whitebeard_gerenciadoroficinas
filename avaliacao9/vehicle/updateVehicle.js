const Vehicle = require("../schemas/vehicle.schema")
const mongoose = require("mongoose")

const updateVehicle = async (id, data) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("ID do veículo inválido")
            error.status = 400
            throw error
        }

        if (!data || Object.keys(data).length === 0) {
            const error = new Error("Nenhum dado para atualizar foi informado")
            error.status = 400
            throw error
        }

        // remove campos undefined
        Object.keys(data).forEach(key => {
            if (data[key] === undefined) delete data[key]
        })

        // não permitir alterar manutenções diretamente
        delete data.maintenances

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        )

        if (!updatedVehicle) {
            const error = new Error("Veículo não encontrado")
            error.status = 404
            throw error
        }

        return updatedVehicle
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro ao atualizar veículo")
        e.status = error.status || 500
        console.error("Erro ao atualizar veículo:", error)
        throw e
    }
}

module.exports = updateVehicle
