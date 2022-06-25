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
const path = require("path")

dotenv.config()
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_ULR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connect to MONGODB")).catch((error) => console.log(error))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res, next) => {
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