const mongoose = require("mongoose")

const workshopSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        specialties: {
            type: [String],
            default: []
        },
        vehicles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vehicle"
            }
        ],
        
    },
    { timestamps: true}
)

const Workshop = mongoose.model("Workshop", workshopSchema)

module.exports = Workshop