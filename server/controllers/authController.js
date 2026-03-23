const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Helper to generate access token
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key_change_me_in_prod', {
        expiresIn: '15m', // Short-lived
    });
};

// Helper to generate refresh token
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key_change_me', {
        expiresIn: '7d', // Longer-lived
    });
};

// Helper to set secure cookies
const setTokenCookies = (res, accessToken, refreshToken) => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Access Token Cookie
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'Lax',
        maxAge: 15 * 60 * 1000, // 15 mins
    });

    // Refresh Token Cookie
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || (!email && !phoneNumber) || !password) {
        res.status(400);
        throw new Error('Please provide name, password, and either email or phone number');
    }

    const query = email ? { email } : { phoneNumber };
    const userExists = await User.findOne(query);

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({ name, email, phoneNumber, password });

    if (user) {
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Store refresh token in DB
        await RefreshToken.create({
            user: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            ip: req.ip,
            userAgent: req.get('user-agent'),
        });

        setTokenCookies(res, accessToken, refreshToken);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate user & get tokens
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { identifier, email, password } = req.body;
    const loginId = identifier || email;

    if (!loginId || !password) {
        res.status(400);
        throw new Error('Please provide email/phone and password');
    }

    const user = await User.findOne({
        $or: [{ email: loginId }, { phoneNumber: loginId }]
    }).select('+password');

    if (user && (await user.matchPassword(password))) {
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Invalidate any existing refresh tokens for this user (optional: logout from all devices)
        // For shared devices, we might want to allow only one session at a time
        // await RefreshToken.deleteMany({ user: user._id }); 

        await RefreshToken.create({
            user: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            ip: req.ip,
            userAgent: req.get('user-agent'),
        });

        setTokenCookies(res, accessToken, refreshToken);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        res.status(401);
        throw new Error('No refresh token provided');
    }

    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
    if (!tokenDoc) {
        res.status(401);
        throw new Error('Invalid refresh token');
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key_change_me');
        
        // Rotate: Generate new pair
        const newAccessToken = generateAccessToken(decoded.id);
        const newRefreshToken = generateRefreshToken(decoded.id);

        // Replace old token with new one in DB
        await RefreshToken.deleteOne({ _id: tokenDoc._id });
        await RefreshToken.create({
            user: decoded.id,
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            ip: req.ip,
            userAgent: req.get('user-agent'),
        });

        setTokenCookies(res, newAccessToken, newRefreshToken);
        res.json({ message: 'Tokens refreshed' });
    } catch (error) {
        res.status(401);
        throw new Error('Refresh token expired or invalid');
    }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    
    if (refreshToken) {
        await RefreshToken.deleteOne({ token: refreshToken });
    }

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json({ message: 'Logged out successfully' });
});

// @desc    Get user profile data
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    getUserProfile,
};
