
const Profile = require('../models/Profile');
const User = require('../models/User');

exports.addProfile = async (req, res) => {
  try {
    const { user } = req.body;
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists for this user' });
    }

    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'name email');
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
