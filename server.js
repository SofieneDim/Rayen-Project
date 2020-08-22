const express = require("express");
app = express();
bodyParser = require("body-parser");
db = require("./db");
User = require('./models/user');
require('dotenv').config();
port = process.env.NODE_PORT || 3000;

app.set("view engine", "ejs");

// Middelwares
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.redirect("/signin"));
app.get("/signin", (req, res) => res.render("signin"));
app.get("/signup", (req, res) => res.render("signup"));

app.get("/admin-dashboard", async (req, res) => {
    const users = await User.find();
    res.render("adminDashboard", { users: users });
});

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username == "admin") {
        if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD)
            return res.redirect("admin-dashboard");
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

app.post("/signup", async (req, res) => {
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

const usersRoute = require('./routes/users');
app.use("/users", usersRoute);

app.listen(port, () => console.log(`Server started on port ${port}`));

