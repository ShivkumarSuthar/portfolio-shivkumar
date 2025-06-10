const mongoose = require('mongoose');

const linkItemSchema = new mongoose.Schema({
  name: String,
  url: String,
});

const profileOverviewSchema = new mongoose.Schema({
  fullName: String,
  title: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  profileImage: String, // just URL
  logo: {
    isImage: Boolean,
    value: String,
  },
  links: {
    type: Map,
    of: [linkItemSchema],
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model('ProfileOverview', profileOverviewSchema);
