const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../Middleware/fetchuser');

// JWT secretsign
const secret = "IamRehanHi";

// Route1: Creatign a user using POST "/api/auth/createuser". Don't require login.
router.post('/createuser', [
    // validations on data of user
    body('email', "Enter valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 }),
    body('name', "Enter valid name").isLength({ min: 5 })
], async (req, res) => {

    let success=false;
    // if there are errors in validation then return bad request or errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    // wraping in try catch to avoid any server error
    try {
        let userExist = await User.findOne({ email: req.body.email });
        // in case of email already exist 
        if (userExist) {
            return res.status(400).json({success, errors: "User already exist" });
        }

        // bcrypt hash generation
        const salt = await bcrypt.genSaltSync(10);
        const secretPassword = await bcrypt.hashSync(req.body.password, salt);

        // Create a user
        let user = await User.create({
            name: req.body.name,
            password: secretPassword,
            email: req.body.email,
            date: req.body.date
        });

        // Create object that will be passed to jwt.sign 
        const data = {
            id: user.id
        }

        success = true;
        // create JWTtoken
        const authToken = jwt.sign(data, secret);
        res.json({success, authToken });

    } catch (err) {
        console.error(err);
        res.status(500).send({success, "message": err.message });
    }
});


// Route2: Login using POST "/api/auth/login". Don't require login.
router.post('/login', [
    // validations on data of user
    body('email', "Enter valid email").isEmail(),
    body('password', "Password can't be empty").exists()
], async (req, res) => {

    let success = false;
    // if there are errors in validation then return bad request or errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // destrucering req
    const { email, password } = req.body;

    // wraping in try catch to avoid any server error
    try {
        // check user with specified email exists or not 
        let userExist = await User.findOne({ email });
        // in case of user not exits (No Signup found) 
        if (!userExist) {
            return res.status(400).json({success, errors: "Please enter correct credentials." });
        }

        // Compare password sent by user with password in database.
        const passwordCompare = await bcrypt.compare(password, userExist.password);
        if (!passwordCompare) {
            return res.status(400).json({success, errors: "Please enter correct pass." });
        }

        // Create object that will be passed to jwt.sign 
        const data = {
            id: userExist.id
        }
        
        success = true;
        // create JWTtoken
        const authToken = jwt.sign(data, secret);
        res.json({success, authToken });

    } catch (err) {
        console.error(err);
        res.status(500).send({success, "message": err.message });
    }
});

// Route3: Get Loggedin user details using POST "/api/auth/getuser". Require login.
router.post('/getuser', fetchUser, async (req, res) => {

    // wraping in try catch to avoid any server error
    try {
        // req.id is fetched in fetchUser middleware.
        let userId = req.id;

        // checks userid from Database and return user data except password.
        let user = await User.findById(userId).select("-password");

        // In case of userId not exists in database
        if (!user) {
            return res.status(400).json({ errors: "Please enter correct credentials." });
        }

        // send user credentials as response.
        res.json({ user });

    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": err.message });
    }
});


module.exports = router; 