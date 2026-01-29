const Maintenance = require("../schemas/maintenance.schema")
const mongoose = require("mongoose")

const updateMaintenance = async (id, data) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("ID da manutenção inválido")
            error.status = 400
            throw error
        }

        if (!data || Object.keys(data).length === 0) {
            const error = new Error("Nenhum dado para atualizar")
            error.status = 400
            throw error
        }

        const updated = await Maintenance.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        )

        if (!updated) {
            const error = new Error("Manutenção não encontrada")
            error.status = 404
            throw error
        }

        return updated
    } catch (error) {
        const e = new Error("Erro ao atualizar manutenção")
        e.status = error.status || 500
        console.error("Erro ao atualizar manutenção:", error)
        throw e
    }
}

module.exports = updateMaintenance
