const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }, to_username: {
        type: String,
        required: false,
    }, title: {//文章标题
        type: String,
        required: true,
    }
},
    { timestamps: true })

module.exports = mongoose.model("Comment", CommentSchema);