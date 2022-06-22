const router = require("express").Router();
const Tab = require("../models/Tab");

//Create
router.post("/", async (req, res) => {
    const newTab = new Tab(req.body);
    try {
        const saveTab = await newTab.save();
        res.status(200).json(saveTab)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/", async (res, req) => {
    try {
        const tabs = await Tab.find()
        res.status(200).json(tabs)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete("/:id", async (res, req) => {
    const tab = await Tab.findById(req.params.id)
    try {
        await tab.delete()
        res.status(200).json("tab has been delected..")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;