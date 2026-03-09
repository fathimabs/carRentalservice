const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key_change_me_in_prod', {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, password } = req.body;

        // Validation: Name and (Email or Phone) and Password are required for standard registration
        if (!name || (!email && !phoneNumber) || !password) {
            return res.status(400).json({ message: 'Please provide name, password, and either email or phone number' });
        }

        // Check if user already exists
        const query = email ? { email } : { phoneNumber };
        const userExists = await User.findOne(query);

        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this ' + (email ? 'email' : 'phone number') });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            phoneNumber,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { identifier, email, password } = req.body; // identifier or email can be used

        const loginId = identifier || email;

        // Validation
        if (!loginId || !password) {
            return res.status(400).json({ message: 'Please provide email/phone and password' });
        }

        // Check for user by email or phone
        const user = await User.findOne({
            $or: [{ email: loginId }, { phoneNumber: loginId }]
        }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get user profile data
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};
