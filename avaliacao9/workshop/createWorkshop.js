const Workshop = require("../schemas/workshop.schema")

const createWorkshop = async (name, address, specialties) => {
    try {
        if (!name || !address) {
            const error = new Error("Todos os campos obrigatórios devem ser informados.")
            error.status = 400
            throw error
        }

        const newWorkshop = new Workshop({
            name,
            address,
            specialties
        })

        return await newWorkshop.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao criar a oficina:", error)
        throw e
    }
}

module.exports = createWorkshop
