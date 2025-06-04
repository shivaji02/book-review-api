const user = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (await user.findOne({ email })) {
            console.log("User already exists👤>>>>>>",req.body);
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await user.create({ name, email, password });
        if (newUser) {
            console.log("New User created👤>>>>>>",newUser);
            return res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: generateToken(newUser._id)
            });
        }
        res.status(400).json({ message: "Invalid user data" });
    } catch (error) {
        console.log("Error registering User🚫>>>>>>",error);
        res.status(400).json({ message: 'Error registering User' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //console.log("Email 2Login📧>>>>>>>>>>>",email,"Password used >>>>>>", password);
        const userExists = await user.findOne({ email });
        if(!userExists){
            //console.log("UserExists>>>>>>>non existent //console👤",userExists)
            return res.status(400).json({ message: "User does not exist" });
        }
        //console.log("UserExists👤",userExists)  ;

        const isMatch = await userExists.matchPassword(password);
        //console.log("isMatch🔐>>>>>>>>>",isMatch)  ;

        if (isMatch) {
            return res.json({
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                token: generateToken(userExists._id)
            });
        }else {
            //console.log("Invalid email or password🚫");
        res.status(400).json({ message: "Invalid email or password" });
    } } catch (error) {
       // console.log("Error logging in🚫>>>>>>>>>",error);
        res.status(500).json({ message: "Error logging in, reach dev team for help" });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userProfile = await user.findById(req.user.id).select('-password');

        if (!userProfile) {
            return res.status(404).json({ error: "No record found" });
        }

        res.json(userProfile);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user profile" });
    }
};



module.exports = { registerUser, loginUser, getUserProfile };

