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

// Get Cart
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add to Cart / Update Quantity
router.post('/', auth, async (req, res) => {
    try {
        const { productId, quantity, size, color } = req.body;
        const user = await User.findById(req.userId);

        const itemIndex = user.cart.findIndex(item =>
            item.productId === productId && item.size === size && item.color === color
        );

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity, size, color });
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Clear Cart
router.delete('/clear', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        user.cart = [];
        await user.save();
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove from Cart
router.delete('/:productId/:size/:color', auth, async (req, res) => {
    try {
        const { productId, size, color } = req.params;
        const user = await User.findById(req.userId);

        user.cart = user.cart.filter(item =>
            !(item.productId === parseInt(productId) && item.size === size && item.color === color)
        );

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Quantity
router.put('/', auth, async (req, res) => {
    try {
        const { productId, quantity, size, color } = req.body;
        const user = await User.findById(req.userId);

        const itemIndex = user.cart.findIndex(item =>
            item.productId === productId && item.size === size && item.color === color
        );

        if (itemIndex > -1) {
            if (quantity > 0) {
                user.cart[itemIndex].quantity = quantity;
            } else {
                user.cart.splice(itemIndex, 1);
            }
            await user.save();
            res.json(user.cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
