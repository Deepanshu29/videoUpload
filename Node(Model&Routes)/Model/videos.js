const mongoose = require('mongoose');
const url = 'mongodb+srv://Deepanshu:X35RiRFRLREH1O70@cluster0-7m7a4.mongodb.net/video?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false});
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('connected');
})

const videoSchema = new mongoose.Schema({
    video: String,
    videoTitle: String,
    videoDesc: String,
    videoOwnerName: String
});

const videoModel = mongoose.model('video', videoSchema);

module.exports = videoModel;