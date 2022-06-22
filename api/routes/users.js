const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt")

//更新账户
router.post("/:id", async (req, res) => {
    //请求id是否匹配用户id
    if (req.body.userId === req.params.id) {
        if (req.body.password) {//更新密码
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updateUser)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("You can update only your accout!")
    }
})

//删除
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = User.findById(req.params.id)
            try {
                await Post.deleteMany({ username: user.username })//根据用户名删除所有博客
                await User.findByIdAndDelete(req.params.id)//根据用户id删除用户
                res.status(200).json("User has been deleted..")
            } catch (err) {
                res.status(500).json(err)
            }
        } catch (err) {
            res.status(404).json("User not found")
        }
    } else {
        res.status(401).json("You can update only your accout!")
    }
})

//GET User
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router