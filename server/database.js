const Sequelize = require("sequelize");
const { ThingSchema, RelationSchema } = require("./schemas");

const sequelize = new Sequelize("relations", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Thing = sequelize.define("thing", ThingSchema);
const Relation = sequelize.define("relation", RelationSchema);

Thing.belongsToMany(Thing, {
  through: Relation,
  as: "to_thing_id",
  onDelete: "CASCADE"
});
Thing.belongsToMany(Thing, {
  through: Relation,
  as: "from_thing_id",
  onDelete: "CASCADE"
});

module.exports.database = sequelize;
module.exports.models = {
  Thing,
  Relation
};
