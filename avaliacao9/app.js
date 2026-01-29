const express = require("express")

const app = express()
app.use(express.json())

app.use(require("./routes/workshops.routes"))
app.use(require("./routes/vehicles.routes"))
app.use(require("./routes/maintenances.routes"))

module.exports = app
