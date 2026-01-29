const express = require("express")
const router = express.Router()

const createMaintenance = require("../maintenance/createMaintenance")
const getMaintenances = require("../maintenance/getMaintenances")
const updateMaintenance = require("../maintenance/updateMaintenance")
const deleteMaintenance = require("../maintenance/deleteMaintenance")

router.post("/maintenances", async (req, res) => {
    try {
        const { workshop, vehicle, services, date } = req.body
        const maintenance = await createMaintenance(
            workshop,
            vehicle,
            services,
            date
        )
        res.status(201).json(maintenance)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

router.get("/maintenances", async (req, res) => {
    try {
        const maintenances = await getMaintenances(req.query)
        res.status(200).json(maintenances)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

router.put("/maintenances/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedMaintenance = await updateMaintenance(id, req.body)
        res.status(200).json(updatedMaintenance)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

router.delete("/maintenances/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletedMaintenance = await deleteMaintenance(id)
        res.status(200).json(deletedMaintenance)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

module.exports = router