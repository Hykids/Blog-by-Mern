const router = require("express").Router();
const pagination = require('mongoose-sex-page');
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

//万用查询
router.get("/", async (req, res) => {
    const username = req.query.user
    const tabName = req.query.tab
    const title = req.query.title
    const page = req.query.page
    try {
        let posts;
        if (tabName) {
            posts = await pagination(Post).find({
                tab: {
                    $in: [tabName],
                }
            }).sort({ _id: -1 }).page(page || 1).size(6).exec();
        } else if (username) {
            posts = await pagination(Post).find({ username }).sort({ _id: -1 }).page(page || 1).size(6).exec();
        } else if (title) {
            posts = await pagination(Post).find({ "title": title }).sort({ _id: -1 }).page(page || 1).size(6).exec();
        } else {
            posts = await pagination(Post).find().sort({ _id: -1 }).page(page).size(6).exec();
        }
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
})



//模糊查询
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/", async (req, res) => {
    if (req.query.title) {
        try {
            const regex = new RegExp(escapeRegex(req.query.title), 'gi');
            const posts = Post.find({ "name": regex })
            res.status(200).json(posts)
        } catch (err) {
            res.status(500).json(err)
        }
    }
})

module.exports = router