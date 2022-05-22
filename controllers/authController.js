const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


// Load User model
const User = require('../models/Users');
const { hash } = require('bcrypt');

const app = express();



const register = function (req, res) {
  console.log(req.body.email)

  User.findOne({ email: req.body.email }).then(user => {
    if (user && user.validate === true) {
      return res.status(201).json({ message: "Email already exists", code: 201 });
    } else {
      const newUser = new User({
        name: req.body.name,
        mobileNumber: req.body.mobile_number,
        secondaryMobileNumber: req.body.secondaryMobileNumber,
        email: req.body.email,
        password: req.body.password,
        otp: "5454"
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({ message: `successfully registered and sent otp on ${user.email}`, code: 200 }))
            .catch(err => res.send({ message: "Internal error", code: 201 }));
        });
      });
    }
  });
};


const otpVerify = async (req, res, next) => {
  var email = req.body.email;
  var code = req.body.otp;

  const verify = await User.findOne({ email: email });
  // const verify = await User.find({email: email, otp:"5454"});
  console.log(verify, "verify user..");

  if (!verify) {
    return res.send({ message: "user not found", code: 201 })
  }
  if (verify?.otp === code) {
    const x = await User.updateOne({ email: email }, {
      $set: { validate: true, deviceId: req.body.deviceId }
    })
    console.log(x, "x")
    const token = jwt.sign({ sub: verify.id }, "secret", { expiresIn: '7d' });
    res.send({ "token": token, message: "successfully verified", code: 200 });

  } else {
    res.send({ message: "otp not valid", code: 201 })
  }

}



const login = async (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body, "email and paswrd of the req...")
  // Find user by email

  const user = await User.findOne({ email: email });

  if (user === null || user?.validate === false) {
    return res.send({ message: "Email doesn't exists. Please register.", code: 201 });
  }
  console.log(user, "user.....")
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = jwt.sign({ sub: user.id }, "secret", { expiresIn: '7d' });
    await User.updateOne({ email: req.body.email }, {
      $set: { deviceId: req.body.deviceId }
    })
    res.send(
      { "token": token, message: "successfully login", code: 200 }
      )

    return {
      ...user.toJSON(),
      token

    };

  } else {
    res.send({ message: "Email and password are not matching", code: 201 })
  }
}

const accountDetails = async (req, res, next) => {


  // Find user by email

  const user = await User.findOne({ _id: req.user });
  // const decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTIzNzAxOTMsImV4cCI6MTY1Mjk3NDk5M30.6xKZY4qv-bk42snpaRjlyPQOogBjyCd5_j6SjbWjzoc", SECRET);
  // console.log(decoded ,"user.....")


  if (user.validate === false) {
    return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
  }
  if (user) {

    res.send(
      { "user": user, message: "successfully got the details", code: 200 })


  } else {
    res.send({ message: "User not found", code: 201 })
  }
}

const logout = async function (req, res) {

  try {
    // var details =  await Kid.find({user_id:req.user});
    token = " ";
    if (token === " ") {
      res.json({ message: "Logged out successfully", code: 200 });
    } else {
      res.json({ message: "Can't Logout!!", code: 201 });
    }
  } catch (err) {
    res.send({ message: "Internal error", code: 201 });
  }
}

const forgetPassword = async (req, res, next) => {
  try {


    const user = await User.findOne({ email: req.body.email });


    if (user === null || user.validate === false) {
      return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    } else {
      // await sendEmail(user.email, "Password reset");

      res.send({ message: "password reset link sent to your email account", code: 200 });

    }


  } catch (error) {
    res.send({ message: "Internal error", code: 201 });
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email, otp: req.body.code, validate: true });


    if (!user)
      return res.send({ message: "user with given email doesn't exist ", code: 201 });

    if (user) {
      var password = req.body.password;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          const x = await User.updateOne({ email: req.body.email }, {
            $set: { password: hash }
          })
          console.log(x, "x")
        })
      })

      return res.send({ message: "password reset successfully ", code: 200 });
    } else {
      return res.send({ message: "not valid", code: 201 });
    }

  } catch (error) {
    res.send({ message: "Internal error", code: 201 });
    console.log(error);

  }
}

const changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user, validate: true });
    if (!user)
      return res.send({ message: "user with given email doesn't exist ", code: 201 });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;
        const x = await User.updateOne({ email: user.email }, {
          $set: { password: hash }
        })
        console.log(x, "x")
        if (x) {
          return res.send({ message: "your password changed successfully ", code: 200 });
        } else {
          return res.send({ message: "Internal error", code: 201 });
        }
      })
    })


  } catch (error) {
    res.send({ message: "Internal error", code: 201 });
    console.log(error);

  }
}



module.exports = { register, login, otpVerify, forgetPassword, resetPassword, changePassword, logout, accountDetails };





