const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/video";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("connected", () => {
    console.log("connected");
});

const registerSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 3 },
    middleName: { type: String },
    lastName: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true },
    password: { type: String, minlength: 7 }/*,
    pfp: {type: String}*/
});

const registerModel = mongoose.model("register", registerSchema);
module.exports = registerModel;
