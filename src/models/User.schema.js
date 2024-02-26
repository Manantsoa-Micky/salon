const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Review = require('./review.schema');
const Cart = require('./cart.schema');

const userSchema = new mongoose.Schema({
  matricule: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  salary: {
    type: Number,
    required: false,
    default: 0,
  },
  password: {
    type: String,
    required: [true, 'Please enter an email'],
    minlength: [6, 'Minimum passord length is 6 characters'],
  },
  role: {
    type: String,
    required: false,
    default: 'user',
  },
  username: {
    type: String,
    required: false,
    default: 'Utilisateur',
  },
  createdAt: {
    type: Date,
    required: false,
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
  reviews: {
    type: [mongoose.Types.ObjectId],
    required: false,
    default: [],
    ref: 'Review',
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
  adress: {
    type: String,
    required: false,
    default: 'Empty',
  },
});
function generateMatricule() {
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Get current date in YYYYMMDD format
  const randomNumber = Math.floor(Math.random() * 10000); // Generate a random 4-digit number
  return `MT-${currentDate}-${randomNumber}`;
}

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  if (!this.matricule) {
    this.matricule = generateMatricule();
  }
  next();
});

userSchema.pre('findOneAndDelete', async function (next) {
  const userToDelete = await this.model.findOne(this.getQuery());
  await Review.deleteMany({ _id: { $in: userToDelete.reviews } });
  await Cart.deleteMany({ _id: { $in: userToDelete.cart } });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
