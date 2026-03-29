const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Get Wishlist
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add to Wishlist
router.post('/', auth, async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.userId);

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove from Wishlist
router.delete('/:productId', auth, async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.userId);

        user.wishlist = user.wishlist.filter(id => id !== parseInt(productId));
        await user.save();

        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
