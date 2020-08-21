const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/video';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false});
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('connected');
})

const videoSchema = new mongoose.Schema({
    videoTitle: String,
    videoDesc: String,
    videoOwnerName: String
});

const videoModel = mongoose.model('videoData', videoSchema);

module.exports = videoModel;