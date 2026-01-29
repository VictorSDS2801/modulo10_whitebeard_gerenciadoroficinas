const express = require("express")
const router = express.Router()
const Maintenance = require("../schemas/maintenance.schema")
const mongoose = require("mongoose")

const createVehicle = require("../vehicle/createVehicle")
const getVehicles = require("../vehicle/getVehicles")
const updateVehicle = require("../vehicle/updateVehicle")
const deleteVehicle = require("../vehicle/deleteVehicle")

router.post("/vehicles", async (req, res) => {
    try {
        const { plate, model, year, owner } = req.body
        const vehicle = await createVehicle(plate, model, year, owner)
        res.status(201).json(vehicle)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

router.get("/vehicles", async (req, res) => {
    try {
        const vehicles = await getVehicles(req.query)
        res.status(200).json(vehicles)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

router.get("/vehicles/:id/maintenances", async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID do veículo inválido" })
        }

        const maintenances = await Maintenance.find({ vehicle: id })
            .populate("workshop")

        res.status(200).json(maintenances)
    } catch (error) {
        console.error("Erro ao listar manutenções do veículo:", error)
        res.status(500).json({ error: "Erro ao listar manutenções do veículo" })
    }
})


router.put("/vehicles/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedVehicle = await updateVehicle(id, req.body)
        res.status(200).json(updatedVehicle)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

router.delete("/vehicles/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletedVehicle = await deleteVehicle(id)
        res.status(200).json(deletedVehicle)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

module.exports = router