const express = require("express")
const app = express();
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")

dotenv.config()
app.use(express.json());

mongoose.connect(process.env.MONGO_ULR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connect to MONGODB")).catch((error) => console.log(error))

app.use("/api/auth", authRoute)

app.listen("3001", () => {
    console.log("Server is running on 3001")
})