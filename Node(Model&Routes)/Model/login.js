const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/video";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("connected", () => {
    console.log("connected");
});

const loginSchema = new mongoose.Schema({
    loginTime: Date,
    email: { type: String, required: true },
    password: { type: String, minlength: 7 }
});

const loginModel = mongoose.model("login", loginSchema);
module.exports = loginModel;
