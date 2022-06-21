const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    posr_id: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    username: {
        type: Array,
        required: true,
    }, to_username: {
        type: Array,
        required: false,
    }

},
    { timestamps: true })

module.exports = mongoose.model("Comment", CommentSchema);