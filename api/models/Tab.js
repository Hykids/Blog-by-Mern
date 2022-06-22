const mongoose = require("mongoose")

const TabSchema = new mongoose.Schema({
    tab: {
        type: String,
        required: true,
        unique: true
    },

},
    { timestamps: true })

module.exports = mongoose.model("Tab", TabSchema);