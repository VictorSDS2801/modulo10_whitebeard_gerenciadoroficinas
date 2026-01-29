const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { _id: false } // não cria _id para cada serviço
)

const maintenanceSchema = new mongoose.Schema(
    {
        workshop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workshop",
            required: true
        },
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true
        },
        services: {
            type: [serviceSchema],
            required: true,
            validate: {
                validator: (v) => v.length > 0,
                message: "A manutenção deve ter pelo menos um serviço"
            }
        },
        date: {
            type: Date,
            default: Date.now
        },
        totalCost: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { timestamps: true }
)

// calcula automaticamente o valor total
maintenanceSchema.pre("validate", function (next) {
    this.totalCost = this.services.reduce(
        (sum, service) => sum + service.price,
        0
    )
})

const Maintenance = mongoose.model("Maintenance", maintenanceSchema)

module.exports = Maintenance
