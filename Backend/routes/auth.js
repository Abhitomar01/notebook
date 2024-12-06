const express = require('express');
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "Abhi is a good $boy"

// ROUTE:1 create a user using: POST "/api/auth/createuser".No log in required
router.post('/createuser', [
  body('name', 'enter a valid name').isLength({ min: 3 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password must be atleast five charecter').isLength({ min: 5 })
], async (req, res) => {
  let success = false
  //if there is error you will get this statement
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() })

  }
  //check Whether the user with this email exists already

  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {

      return res.status(400).json({ success, error: "sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)

    //create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,

    })
    //getting jwt token 
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
success=true;
    res.json({ success,authtoken })
    //res.json(user)
  } catch (error) {
    console.error(error);
    res.status(500).send('some error occured')
  }
  // console.log("Request body:",req.body);
})

// ROUTE:2 Authenticating  a user using: POST "/api/auth/login".No log in required
router.post('/login', [
  body('email', 'enter a valid email').isEmail(),
  body('password', ' password can not be blank').exists()
], async (req, res) => {
  let success= false
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      success=false
      return res.status(400).json({ error: "please try to log in with correct credentials" })

    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      success=false
      return res.status(400).json({success, error: "please try to log in with correct credentials" })

    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success=true
    res.json({success, authtoken })

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server Error occured')
  }


})

// ROUTE:3 Get loggedn  user details: POST "/api/auth/getuser".log in required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server Error occured')
  }
})

module.exports = router;
