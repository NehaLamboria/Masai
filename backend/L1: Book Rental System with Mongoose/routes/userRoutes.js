
const express = require('express');
const { addUser, getUserRentals } = require('../controllers/userController');
const router = express.Router();

router.post('/add-user', addUser);
router.get('/user-rentals/:userId', getUserRentals);

module.exports = router;
