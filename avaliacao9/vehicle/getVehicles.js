const Vehicle = require("../schemas/vehicle.schema")

const getVehicles = async (filters = {}) => {
    try {
        const query = {}

        if (filters.plate) {
            query.plate = { $regex: filters.plate, $options: "i" }
        }

        if (filters.model) {
            query.model = { $regex: filters.model, $options: "i" }
        }

        if (filters.owner) {
            query.owner = { $regex: filters.owner, $options: "i" }
        }

        const vehicles = await Vehicle.find(query)
        return vehicles
    } catch (error) {
        const e = new Error("Erro ao buscar veículos")
        e.status = 500
        console.error("Erro ao buscar veículos:", error)
        throw e
    }
}

module.exports = getVehicles
