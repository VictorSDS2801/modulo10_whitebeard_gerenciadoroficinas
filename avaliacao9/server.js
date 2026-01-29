const mongoose = require("mongoose")
const app = require("./app")

const port = process.env.PORT || 3000
mongoose.connect(
    "mongodb+srv://victordiogo2801_db_user:victor2801@cluster0.d4xde7i.mongodb.net/WorkshopMaintenance"
)
.then(() => {
    console.log("Conectado ao MongoDB")
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
})
.catch(err => console.error("Erro ao conectar no MongoDB:", err))