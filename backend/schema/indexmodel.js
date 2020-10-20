const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var photoSchema = new Schema({
  Image:  [{ type: String }],
  caption: { type: String }
  });
module.exports = mongoose.model('Photos', photoSchema);