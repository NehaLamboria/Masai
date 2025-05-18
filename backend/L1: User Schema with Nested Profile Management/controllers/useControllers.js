const User = require('../models/User');

// POST /add-user
exports.addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password, profiles: [] });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    next(err);
  }
};

// POST /add-profile/:userId
exports.addProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { profileName, url } = req.body;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if profileName already exists (optional)
    if(user.profiles.some(p => p.profileName === profileName)) {
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    user.profiles.push({ profileName, url });
    await user.save();
    res.json({ message: 'Profile added', profiles: user.profiles });
  } catch (err) {
    next(err);
  }
};

// GET /get-users?profile=github
exports.getUsers = async (req, res, next) => {
  try {
    const profileFilter = req.query.profile;

    let users;
    if (profileFilter) {
      users = await User.find({ 'profiles.profileName': profileFilter });
    } else {
      users = await User.find();
    }
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// GET /search?name=Alice&profile=fb
exports.search = async (req, res, next) => {
  try {
    const { name, profile } = req.query;
    if (!name) return res.status(400).json({ message: 'Name query param required' });

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (profile) {
      const foundProfile = user.profiles.find(p => p.profileName === profile);
      if (foundProfile) {
        return res.json(foundProfile);
      } else {
        return res.json({ message: 'User found, but profile not found', user });
      }
    } else {
      return res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

// PUT /update-profile/:userId/:profileName
exports.updateProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const profile = user.profiles.find(p => p.profileName === profileName);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    if (url) profile.url = url;

    await user.save();
    res.json({ message: 'Profile updated', profile });
  } catch (err) {
    next(err);
  }
};

// DELETE /delete-profile/:userId/:profileName
exports.deleteProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const beforeCount = user.profiles.length;
    user.profiles = user.profiles.filter(p => p.profileName !== profileName);
    if (user.profiles.length === beforeCount) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    await user.save();
    res.json({ message: 'Profile deleted', profiles: user.profiles });
  } catch (err) {
    next(err);
  }
};
