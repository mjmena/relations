const Mongoose = require('mongoose');

module.exports.Thing = Mongoose.model('Thing', { name: String, summary: String, seed: Boolean });
module.exports.Relation = Mongoose.model('Relation', { participants: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Thing' }] })
