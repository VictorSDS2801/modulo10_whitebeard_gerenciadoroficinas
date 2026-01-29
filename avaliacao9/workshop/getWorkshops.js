const Workshop = require("../schemas/workshop.schema")

const getWorkshops = async (filters = {}) => {
    try {
        const query = {}

        if (filters.name) {
            query.name = { $regex: filters.name, $options: "i" }
        }

        if (filters.address) {
            query.address = { $regex: filters.address, $options: "i" }
        }

        if (filters.specialty) {
            query.specialties = { $regex: filters.specialty, $options: "i" }
        }

        const workshops = await Workshop.find(query)
        return workshops
    } catch (error) {
        const e = new Error("Erro ao buscar oficinas")
        e.status = 500
        console.error("Erro ao buscar oficinas:", error)
        throw e
    }
}

module.exports = getWorkshops
