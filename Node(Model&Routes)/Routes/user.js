const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const registerDB = require("../Model/register");
const loginDB = require("../Model/login");

router.post("/register", (req, res) => {
  if (req.files) {
    let data = req.files.file;
    let fileName = data.name;
    data.mv("./public/" + fileName, err => {
      console.log(err);
    })
  }
  registerDB.findOne({ email: req.body.email }).exec()
    .then(async data => {
      if (data == null) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const User = new registerDB({
          firstName: req.body.fname,
          middleName: req.body.mname,
          lastName: req.body.lname,
          email: req.body.email,
          /* pfp: req.files.file.name, */
          password: hashedPassword,
          confirmPassword: hashedPassword
        });
        User.save()
          .then(registeredUser => {
            if (registeredUser) {
              const payload = { subject: registeredUser._id }
              const token = jwt.sign(payload, 'secretKey');
              res.status(201).json({ user: registeredUser, webToken: token });
            } else {
              res.status(500).json({message: 'Information not Found'})
            }
          })
          .catch(err => {
            res.status(500).json({ message: 'Error while getting User', Error: err });
          })
      } else {
        res.status(500).json({ message: 'Email already used' });
      }
  })
});

router.get('/register', (req, res) => {
  registerDB.find({}).exec()
    .then(registeredUsers => {
      if (registeredUsers.length > 0) {
        res.status(200).json({
          count: registeredUsers.length,
          user: registeredUsers
        })
      } else {
        res.status(500).json({ message: 'No User Found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Occured', error: err });
    })
});

router.get('/register/:id', (req, res) => {
  registerDB.findById(req.params.id).exec()
    .then(registeredUsers => {
      if (registeredUsers) {
        res.status(200).json({ user: registeredUsers });
      } else {
        res.status(500).json({ message: 'No User Found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Occured', error: err });
    });
});

router.delete('/register/:id', (req, res) => {
  registerDB.findByIdAndDelete(req.params.id).exec()
    .then(response => {
      res.status(200).json({ message: 'Deleted Successfully' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Cannot Delete this data' });
    })
});

router.post('/login', (req, res) => {
  const User = new loginDB({
    loginTime: Date.now(),
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });
  User.save();
  registerDB.findOne({ email: User.email }).exec()
    .then(async data => {
      if (data) {
        const match = await bcrypt.compare(User.password, data.password);
        if (match) {
          const payload = { subject: data._id };
          const token = jwt.sign(payload, 'secretKey');
          res.status(200).json({ user: data, webToken: token });
        } else {
          res.status(500).json({ message: 'password doesn\'t Match' });
        }
      } else {
        res.status(404).json({ message: 'Try to register first !!' });
      }
  })
});
module.exports = router;
