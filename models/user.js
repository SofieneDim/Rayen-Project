var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("User", UserSchema);
