const express = require("express")
const app = express();
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const tabRoute = require("./routes/tabs")
const categoryRoute = require("./routes/categories")
const multer = require("multer")

dotenv.config()
app.use(express.json());

mongoose.connect(process.env.MONGO_ULR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connect to MONGODB")).catch((error) => console.log(error))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, "hello.jpeg")
    },
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/tabs", tabRoute)
app.use("/api/categories", categoryRoute)

app.listen("3001", () => {
    console.log("Server is running on 3001")
})