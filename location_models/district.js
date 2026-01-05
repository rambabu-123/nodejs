const mongoose = require('mongoose');

module.exports = mongoose.model(
  'District',
  new mongoose.Schema({
    code: String,
    name: String,
    stateCode: String
  })
);
