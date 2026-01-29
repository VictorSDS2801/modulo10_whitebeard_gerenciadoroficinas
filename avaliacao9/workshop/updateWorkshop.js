const Workshop = require("../schemas/workshop.schema")
const mongoose = require("mongoose")

const updateWorkshop = async (id, data) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("ID da oficina inválido")
            error.status = 400
            throw error
        }

        if (!data || Object.keys(data).length === 0) {
            const error = new Error("Nenhum dado para atualizar foi informado")
            error.status = 400
            throw error
        }

        const updatedWorkshop = await Workshop.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        )

        if (!updatedWorkshop) {
            const error = new Error("Oficina não encontrada")
            error.status = 404
            throw error
        }

        return updatedWorkshop
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro ao atualizar oficina")
        e.status = error.status || 500
        console.error("Erro ao atualizar oficina:", error)
        throw e
    }
}

module.exports = updateWorkshop
