const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema(
    {
        plate: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },
        model: {
            type: String,
            required: true,
            trim: true
        },
        year: {
            type: Number,
            required: true,
            min: 1900
        },
        owner: {
            type: String,
            required: true,
            trim: true
        },
        maintenances: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Maintenance"
            }
        ]
    },
    { timestamps: true }
)

const Vehicle = mongoose.model("Vehicle", vehicleSchema)

module.exports = Vehicle
