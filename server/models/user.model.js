const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  ecoScore: {
    type: Number,
    default: 0
  },
  achievements: [{
    type: String  // Simple array of strings for achievements
  }],
  carbonFootprint: {
    monthly: [{
      month: {
        type: Date,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    }],
    total: {
      type: Number,
      default: 0
    },
    averageMonthly: {
      type: Number,
      default: 0
    }
  
  },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastActive: Date
  },
  refreshToken: String
}, {
  timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Update streak middleware
userSchema.pre('save', function(next) {
  if (this.isModified('lastActive')) {
    const today = new Date();
    const lastActive = this.streak.lastActive;
    
    if (lastActive) {
      const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        this.streak.current += 1;
        this.streak.longest = Math.max(this.streak.current, this.streak.longest);
      } else if (diffDays > 1) {
        this.streak.current = 0;
      }
    }
    
    this.streak.lastActive = today;
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.updateEcoScore = function() {
  // Calculate eco score based on various factors
  let score = 0;
  
  // Base score from carbon footprint
  const averageFootprint = 1000; // Example average monthly footprint
  if (this.carbonFootprint.monthly.length) {
    const avgMonthlyFootprint = this.carbonFootprint.monthly.reduce((a, b) => a + b, 0) / this.carbonFootprint.monthly.length;
    score += 50 * (1 - (avgMonthlyFootprint / averageFootprint));
  }
  
  // Points from achievements
  score += this.achievements.length * 2;
  
  // Streak bonus
  score += Math.min(this.streak.current * 0.5, 10);
  
  this.ecoScore = Math.max(0, Math.round(score));
  return this.ecoScore;
};

userSchema.methods.addAchievement = async function(achievement) {
  this.achievements.push(achievement);
  await this.save();
};

module.exports = mongoose.model('User', userSchema);
