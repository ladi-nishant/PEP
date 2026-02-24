const express = require('express');
const router = express.Router();
const {
    getConfessions,
    createConfession,
    updateConfession,
    deleteConfession,
    reactToConfession
} = require('../controllers/confessionController');

// Using express-async-handler in controller is better, but since I didn't install it, I'll rely on global error handler catching sync errors.
// For async errors in Express 4, we need to wrap them or use a library. 
// For async errors in Express 4, we need to wrap them or use a library.
// Adding a simple wrapper here for safety if not using express-async-handler package.

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(asyncHandler(getConfessions))
    .post(protect, asyncHandler(createConfession));

router.route('/:id')
    .put(asyncHandler(updateConfession)) // Note: update might not need protection if we rely solely on secret code. But adding auth adds layer if user owns it.
    // However, req explicitly says "User can edit confession only by entering correct secret code".
    // It doesn't say "User must be logged in".
    // But logically, if we store userId, maybe only owner can edit?
    // Let's stick to secret code verification per requirement. Auth is only for posting.
    // Wait, if I protect PUT/DELETE, anonymous users can't edit/delete even with code? The req is "User must enter secret code while submitting... to edit or delete".
    // This implies anonymity is key. Anyone with the code should be able to edit/delete regardless of login status?
    // "User must login... before posting".
    // It doesn't explicitly say user must login to edit/delete.
    // But usually, anonymous confessions are fire-and-forget.
    // I will only protect POST for creation. Editing/Deleting relies on Secret Code.
    .delete(asyncHandler(deleteConfession));

router.post('/:id/react', asyncHandler(reactToConfession));

module.exports = router;
