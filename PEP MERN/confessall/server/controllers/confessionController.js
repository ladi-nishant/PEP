const Confession = require('../models/Confession');
const bcrypt = require('bcryptjs');

// @desc    Get confessions
// @route   GET /api/confessions
// @access  Public
const getConfessions = async (req, res) => {
    try {
        const confessions = await Confession.find().sort({ createdAt: -1 });
        const safeConfessions = confessions.map(c => {
            const { secretCode, ...rest } = c._doc;
            return rest;
        });
        res.status(200).json(safeConfessions);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error: ' + error.message);
    }
};

// @desc    Create confession
// @route   POST /api/confessions
// @access  Private (Protected)
const createConfession = async (req, res) => {
    const { text, secretCode } = req.body;
    const userId = req.user.sub; // From authMiddleware

    if (!text || !secretCode || !userId) {
        res.status(400);
        const missing = [];
        if (!text) missing.push('text');
        if (!secretCode) missing.push('secretCode');
        if (!userId) missing.push('userId (auth)');
        throw new Error(`Please add all fields: ${missing.join(', ')}`);
    }

    if (secretCode.length < 4) {
        res.status(400);
        throw new Error('Secret code must be at least 4 chars');
    }

    // Hash secret code
    const salt = await bcrypt.genSalt(10);
    const hashedCode = await bcrypt.hash(secretCode, salt);

    const confession = await Confession.create({
        text,
        secretCode: hashedCode,
        userId
    });

    res.status(201).json(confession);
};

// @desc    Update confession
// @route   PUT /api/confessions/:id
// @access  Private (Secret Code)
const updateConfession = async (req, res) => {
    const { secretCode, text } = req.body;
    const confession = await Confession.findById(req.params.id);

    if (!confession) {
        res.status(404);
        throw new Error('Confession not found');
    }

    const isMatch = await bcrypt.compare(secretCode, confession.secretCode);
    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid secret code');
    }

    if (text) confession.text = text;
    const updatedConfession = await confession.save();

    res.status(200).json(updatedConfession);
};

// @desc    Delete confession
// @route   DELETE /api/confessions/:id
// @access  Private (Secret Code)
const deleteConfession = async (req, res) => {
    const { secretCode } = req.body;
    const confession = await Confession.findById(req.params.id);

    if (!confession) {
        res.status(404);
        throw new Error('Confession not found');
    }

    const isMatch = await bcrypt.compare(secretCode, confession.secretCode);
    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid secret code');
    }

    await Confession.findByIdAndDelete(req.params.id); // Optimized
    res.status(200).json({ id: req.params.id });
};

// @desc    React to confession
// @route   POST /api/confessions/:id/react
// @access  Public
const reactToConfession = async (req, res) => {
    const { reactionType } = req.body;

    if (!['like', 'love', 'laugh'].includes(reactionType)) {
        res.status(400);
        throw new Error('Invalid reaction type');
    }

    const confession = await Confession.findById(req.params.id);
    if (!confession) {
        res.status(404);
        throw new Error('Confession not found');
    }

    // Use atomic increment
    const updateQuery = {};
    updateQuery[`reactions.${reactionType}`] = 1;

    const updatedConfession = await Confession.findByIdAndUpdate(
        req.params.id,
        { $inc: updateQuery },
        { new: true }
    );

    res.status(200).json(updatedConfession);
};

module.exports = {
    getConfessions,
    createConfession,
    updateConfession,
    deleteConfession,
    reactToConfession
};
