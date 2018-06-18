const Mongoose = require('mongoose');

module.exports.Thing = Mongoose.model('Thing', {
  name: String,
  summary: String,
  relations: [{
    to: Mongoose.Schema.Types.ObjectId,
    description: String
  }]
});
