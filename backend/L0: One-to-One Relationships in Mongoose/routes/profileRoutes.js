
const express = require('express');
const { addProfile, getProfiles } = require('../controllers/profileController');
const router = express.Router();

router.post('/add-profile', addProfile);
router.get('/profiles', getProfiles);

module.exports = router;
