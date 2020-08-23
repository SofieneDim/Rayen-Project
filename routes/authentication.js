const express = require("express");
router = express.Router();
path = require('path');


router.get("/signin", (req, res) => res.render("signin"));

router.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username == "admin") {
        if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD)
            return res.redirect("/admin-dashboard");
        else
            return res.redirect("/");
    } else {
        const user = await User.findOne({ firstName: username });
        if (username == user.firstName && password == user.password)
            return res.send("Client connected successfully");
        else
            return res.redirect("/");
    };
});

router.get("/signup", (req, res) => res.render("signup"));

router.post("/signup", async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    });
    try {
        await newUser.save();
        res.send("New user successfully registered!");
    } catch (error) {
        res.json({ message: error });
    };
});

module.exports = router;