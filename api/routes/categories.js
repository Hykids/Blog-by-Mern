const router = require("express").Router();
const Category = require("../models/Category");

//Create
router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const saveCat = await newCat.save();
        res.status(200).json(saveCat)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put("/:id", async (req, res) => {
    const category = await Category.findById(req.params.id)
    try {
        const updateCat = Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json("successful")
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/", async (res, req) => {
    try {
        const cats = await Category.find()
        res.status(200).json(cats)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;