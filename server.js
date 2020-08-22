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

const usersRoute = require('./routes/users');
app.use("/users", usersRoute);

const authRoute = require('./routes/authentication');
app.use("/auth", authRoute);

// Routes
app.get("/", (req, res) => res.redirect("/auth/signin"));

app.get("/admin-dashboard", async (req, res) => {
    const users = await User.find();
    res.render("adminDashboard", { users: users });
});

app.listen(port, () => console.log(`Server started on port ${port}`));

