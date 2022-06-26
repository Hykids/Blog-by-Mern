const router = require("express").Router();
const Post = require("../models/Post");

//Create
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost)
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update
router.put("/:id", async (req, res) => {
    //请求id是否匹配用户id
    try {
        const post = await Post.findById(req.params.id)//postId
        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json("successful")
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can update only your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                await post.delete()//根据用户名删除所有博客
                res.status(200).json("Post has been deleted..")
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can delete only your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET Post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/", async (req, res) => {
    const username = req.query.user
    const tabName = req.query.tab
    try {
        let posts;
        if (tabName) {
            posts = await Post.find({
                tab: {
                    $in: [tabName],
                }
            })
        } else if (username) {
            posts = await Post.find({ username })
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router