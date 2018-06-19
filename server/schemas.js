const Sequelize = require('sequelize');

module.exports.ThingSchema = {
  name: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false
  },
  summary: Sequelize.TEXT
}

module.exports.RelationSchema = {
  from_thing_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    refrences: {
      model: 'thing',
      field: 'id'
    }
  },
  to_thing_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    refrences: {
      model: 'thing',
      field: 'id'
    }
  },
  description: Sequelize.TEXT
}
