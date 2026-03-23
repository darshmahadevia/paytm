const express = require('express');
const router = express.Router();
const { signinSchema, updateBody, signupSchema } = require('../schema');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

module.exports = router;

router.post('/signup', async (req, res) => {
    const { success } = signupSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({ message: 'Email already taken / Incorrect inputs' });
    }

    const existing_user = await User.findOne({
        username: req.body.username,
    });

    if (existing_user) {
        return res.status(411).json({
            message: 'Email already taken / Incorrect inputs',
        });
    }

    const new_user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    });

    const userId = new_user._id;

    await Account.create({
        userId,
        balance: Math.floor(Math.random() * 100001),
    });
    new_user.save();

    const token = jwt.sign(
        {
            userId,
        },
        JWT_SECRET
    );

    res.status(200).json({
        message: 'User created successfully',
        token: token,
    });
});

router.post('/signin', async (req, res) => {
    const { success } = signinSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: 'Error while logging in',
        });
    }

    const existing_user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });

    if (!existing_user) {
        return res.status(411).json({
            message: 'Error while logging in',
        });
    }

    const userId = existing_user._id;

    const token = jwt.sign(
        {
            userId,
        },
        JWT_SECRET
    );

    res.status(200).json({
        token: token,
    });
});

router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: 'Error while updating information',
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: 'Updated successfully',
    });
});

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = (req.query.filter || '').toString().trim();

    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                    $options: 'i',
                },
            },
            {
                lastName: {
                    $regex: filter,
                    $options: 'i',
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        })),
    });
});
