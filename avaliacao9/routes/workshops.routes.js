const express = require("express")
const router = express.Router()
const Maintenance = require("../schemas/maintenance.schema")
const Workshop = require("../schemas/workshop.schema")
const mongoose = require("mongoose")

const createWorkshop = require("../workshop/createWorkshop")
const getWorkshops = require("../workshop/getWorkshops")
const updateWorkshop = require("../workshop/updateWorkshop")
const deleteWorkshop = require("../workshop/deleteWorkshop")

router.post("/workshops", async (req, res) => {
    try {
        const { name, address, specialties } = req.body
        const workshop = await createWorkshop(name, address, specialties)
        res.status(201).json(workshop)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})
router.get("/workshops/:id/vehicles", async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID da oficina inválido" })
        }

        const workshop = await Workshop
            .findById(id)
            .populate("vehicles")

        if (!workshop) {
            return res.status(404).json({ error: "Oficina não encontrada" })
        }

        res.status(200).json(workshop.vehicles)
    } catch (error) {
        console.error("Erro ao listar veículos da oficina:", error)
        res.status(500).json({ error: "Erro ao listar veículos da oficina" })
    }
})

router.get("/workshops/:id/maintenances", async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID da oficina inválido" })
        }

        const maintenances = await Maintenance.find({ workshop: id })
            .populate("vehicle")

        res.status(200).json(maintenances)
    } catch (error) {
        console.error("Erro ao listar manutenções da oficina:", error)
        res.status(500).json({ error: "Erro ao listar manutenções da oficina" })
    }
})

router.get("/workshops", async (req, res) => {
    try {
        const workshops = await getWorkshops(req.query)
        res.status(200).json(workshops)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

router.put("/workshops/:id", async (req, res) => {
    try {
        const workshop = await updateWorkshop(req.params.id, req.body)
        res.status(200).json(workshop)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

router.delete("/workshops/:id", async (req, res) => {
    try {
        const workshop = await deleteWorkshop(req.params.id)
        res.status(200).json({message: "Oficina deletada com sucesso:", workshop: workshop})
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

module.exports = router