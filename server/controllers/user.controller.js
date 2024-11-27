const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name
    });

    await user.save();

    // Generate tokens
    const tokens = generateTokens(user._id);

    // Update user with refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      },
      ...tokens
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const tokens = generateTokens(user._id);

    // Update refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      },
      ...tokens
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'
    );

    // Find user
    const user = await User.findOne({ 
      _id: decoded.userId,
      refreshToken: refreshToken 
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new tokens
    const tokens = generateTokens(user._id);

    // Update refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.json(tokens);
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

exports.addCarbonFootprint = async (req, res) => {
  const { emission } = req.body;
  const userId = req.userId; // From auth middleware

  try {
    // Validate emission value
    if (!emission || isNaN(emission) || emission < 0) {
      return res.status(400).json({ 
        error: "Valid emission value is required (must be a positive number)" 
      });
    }

    // Find user and update carbon footprint
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add new monthly record
    const newRecord = {
      month: new Date(),
      total: parseFloat(emission)
    };
    
    user.carbonFootprint.monthly.push(newRecord);

    // Keep only last 12 months of data
    if (user.carbonFootprint.monthly.length > 12) {
      user.carbonFootprint.monthly = user.carbonFootprint.monthly.slice(-12);
    }

    // Update total and average
    const monthlyData = user.carbonFootprint.monthly;
    user.carbonFootprint.total = monthlyData.reduce(
      (acc, record) => acc + record.total, 
      0
    );
    
    user.carbonFootprint.averageMonthly = 
      user.carbonFootprint.total / monthlyData.length;

    await user.save();

    // Return updated carbon footprint data
    res.status(200).json({
      message: "Carbon footprint updated successfully",
      data: {
        monthly: user.carbonFootprint.monthly,
        total: user.carbonFootprint.total,
        average: user.carbonFootprint.averageMonthly
      }
    });

  } catch (error) {
    console.error('Error saving carbon footprint:', error);
    res.status(500).json({ 
      error: "Failed to save carbon footprint",
      details: error.message 
    });
  }
};
exports.getCarbonFootprint = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      data: {
        monthly: user.carbonFootprint.monthly,
        total: user.carbonFootprint.total,
        average: user.carbonFootprint.averageMonthly
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch carbon footprint data",
      details: error.message 
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    // Find and update user
    await User.findOneAndUpdate(
      { refreshToken },
      { $set: { refreshToken: null } }
    );

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
};
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate current streak and update if needed
    const today = new Date();
    const lastActive = user.streak.lastActive;
    if (lastActive) {
      const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        user.streak.current += 1;
        user.streak.longest = Math.max(user.streak.current, user.streak.longest);
      } else if (diffDays > 1) {
        user.streak.current = 0;
      }
    }
    user.streak.lastActive = today;

    // Update eco score
    const ecoScore = user.updateEcoScore();
    await user.save();
    console.log(user)
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        ecoScore,
        achievements: user.achievements,
        carbonFootprint: {
          monthly: user.carbonFootprint.monthly,
          total: user.carbonFootprint.total,
          averageMonthly: user.carbonFootprint.averageMonthly
        },
        streak: user.streak
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch user data from backend",
      details: error.message 
    });
  }
};