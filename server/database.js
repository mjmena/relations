const Sequelize = require('sequelize');
const { ThingSchema, RelationSchema } = require("./schemas")

const sequelize = new Sequelize('relations', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Thing = sequelize.define('thing', ThingSchema);
const Relation = sequelize.define('relation', RelationSchema)

module.exports.database = sequelize
module.exports.models = {
    Thing,
    Relation
}
