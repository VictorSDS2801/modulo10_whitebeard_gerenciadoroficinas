const Vehicle = require("../schemas/vehicle.schema")
const mongoose = require("mongoose")

const deleteVehicle = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("ID do veículo inválido")
            error.status = 400
            throw error
        }

        const deletedVehicle = await Vehicle.findByIdAndDelete(id)

        if (!deletedVehicle) {
            const error = new Error("Veículo não encontrado")
            error.status = 404
            throw error
        }

        return deletedVehicle
    } catch (error) {
        const e = new Error("Erro ao deletar veículo")
        e.status = error.status || 500
        console.error("Erro ao deletar veículo:", error)
        throw e
    }
}

module.exports = deleteVehicle
