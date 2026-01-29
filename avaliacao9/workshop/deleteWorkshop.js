const Workshop = require("../schemas/workshop.schema")
const mongoose = require("mongoose")

const deleteWorkshop = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("ID da oficina inválido")
            error.status = 400
            throw error
        }

        const deletedWorkshop = await Workshop.findByIdAndDelete(id)

        if (!deletedWorkshop) {
            const error = new Error("Oficina não encontrada")
            error.status = 404
            throw error
        }

        return deletedWorkshop
    } catch (error) {
        const e = new Error("Erro ao deletar oficina")
        e.status = error.status || 500
        console.error("Erro ao deletar oficina:", error)
        throw e
    }
}

module.exports = deleteWorkshop
