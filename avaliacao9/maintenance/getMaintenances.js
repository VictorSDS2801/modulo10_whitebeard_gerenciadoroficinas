const Maintenance = require("../schemas/maintenance.schema")

const getMaintenances = async (filters = {}) => {
    try {
        const query = {}

        if (filters.workshop) query.workshop = filters.workshop
        if (filters.vehicle) query.vehicle = filters.vehicle

        const maintenances = await Maintenance.find(query)
            .populate("workshop")
            .populate("vehicle")

        return maintenances
    } catch (error) {
        const e = new Error("Erro ao buscar manutenções")
        e.status = 500
        console.error("Erro ao buscar manutenções:", error)
        throw e
    }
}

module.exports = getMaintenances
