const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  salary: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter an email'],
    minlength: [6, 'Minimum passord length is 6 characters'],
  },
  role: {
    type: String,
    required: [true, 'Please enter a role'],
  },
  username: {
    type: String,
    required: false,
    default: 'Utilisateur',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  hours: {
    type: {
      begin: String,
      end: String,
    },
    required: false,
    default: {
      begin: '8h',
      end: '17h',
    },
  },
  isEmailVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  review: {
    type: [
      {
        author: {
          type: String,
          required: false,
          default: 'Anonymous',
        },
        content: {
          type: String,
          required: false,
          default: '',
        },
      },
    ],
    required: false,
    default: [],
  },
  rating: {
    type: [Number],
    required: false,
    default: [],
  },
  services: {
    type: [mongoose.Types.ObjectId],
    required: false,
    ref: 'Product',
    default: [],
  },
  cart: {
    type: [mongoose.Types.ObjectId],
    required: false,
    default: [],
    ref: 'Cart',
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
