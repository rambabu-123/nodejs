const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Mandal',
  new mongoose.Schema({
    code: String,
    name: String,
    districtCode: String
  })
);
