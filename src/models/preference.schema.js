const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  service: {
    type: [String],
    required: false,
    default: [],
  },
  employeePref: {
    type: [String],
    required: false,
    default: [],
  },
  jourPref: {
    type: [String],
    required: false,
    default: [],
  },
});

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;
