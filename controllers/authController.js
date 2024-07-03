const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let tokenStore = [];
const signup = async (req, res) => {
    const { email, password,confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.send({ message: "Email id is already registered", alert: false });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const hashConfirmPass = await bcrypt.hash(confirmPassword, 10);
            const newUser = new User({ ...req.body, password: hashedPassword, confirmPassword: hashConfirmPass });
            await newUser.save();
            res.send({ message: "Successfully signed up", alert: true });
        }
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).send({ message: "Server error", alert: false });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { _id: user._id, email: user.email },
                process.env.JWT_SECRET, // Replace with your secret key
                { expiresIn: '1h' }
            );
            res.send({
                message: "Login is successful",
                alert: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                },
                token,
            });
        } else {
            res.send({ message: "User not found, sign up first", alert: false });
        }
    } catch (err) {
        res.status(500).send({ message: "Server error", alert: false });
    }
};

module.exports = { signup, login };
