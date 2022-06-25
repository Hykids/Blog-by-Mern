const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")
//hashing library, safely store our password

//注册
//post:create something ,put:updating exiting models
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

//登陆
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, })
        !user && res.status(401).json("用户不存在")

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(403).json("密码错误")
        const { password, ...others } = user
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router