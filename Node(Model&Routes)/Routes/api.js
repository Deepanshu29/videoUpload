const express = require("express");
const router = express.Router();
const upload = require("express-fileupload");
const videoDataDB = require("../Model/video_model");
const videoDB = require('../Model/videos');

router.use(upload());

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
      return res.status(401).send('unauthorized Request');
  } else {
      let token = req.headers.authorization.split(' ')[1];
      console.log(token);
      if (token === '') {
          return res.status(401).send("unauthorized Request");
      } else {
          try {
              let payload = jwt.verify(token, "secretKey");
              req.userId = payload.subject;
              next();
          } catch (err) {
              return res.status(401).send('unauthorized');
          }
      }
  }
}

router.get("/videos", (req, res) => {
  videoDB
    .find({})
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({
          count: data.length,
          videoInfo: data,
        });
      } else {
        res.status(200).json({ message: "No video Found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "No video found", Error: err });
    });
});

router.post("/videos", (req, res) => {
  if(req.files){
    const file = req.files.video;
    const filename = file.name;

    file.mv(`./src/assets/${filename}`, (err,response)=>{
      if(err){
        console.log(err);
      }
    })

    const videoData = new videoDB({
      video : filename,
      videoTitle: req.body.videoTitle,
      videoDesc: req.body.videoDesc,
      videoOwnerName: req.body.videoOwnerName
    });
    videoData.save()
  }
})


module.exports = router;