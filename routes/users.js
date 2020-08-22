const express = require("express");
router = express.Router();
User = require('../models/user');


router.post("/delete/:firstName", async (req, res) => {
    try {
        await User.findOneAndDelete({ firstName: req.params.firstName });
        res.redirect("/admin-dashboard");
    } catch (error) {
        console.log('error:', error)
        res.status(400).json({ error: error.message });
    };
});

router.post("/block/:firstName", async (req, res) => {
    try {
        const user = await User.findOne({ firstName: req.params.firstName });
        user.isBlocked = true;
        await User.updateOne({ firstName: req.params.firstName }, user);
        res.redirect("/admin-dashboard");
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
});

router.post("/unblock/:firstName", async (req, res) => {
    try {
        const user = await User.findOne({ firstName: req.params.firstName });
        user.isBlocked = false;
        await User.updateOne({ firstName: req.params.firstName }, user);
        res.redirect("/admin-dashboard");
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
});


module.exports = router;