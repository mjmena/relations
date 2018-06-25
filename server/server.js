const typeDefs = require("./typeDefs");
const { ApolloServer } = require("apollo-server");
const { database, models } = require("./database");
const Thing = models.Thing;
const Relation = models.Relation;
const OP = database.OP;
(async () => {
  try {
    const resolvers = {
      Query: {
        thing: async (root, { id }) => Thing.findById(id),
        thingByName: async (root, { name }) =>
          Thing.findOne({
            where: {
              name
            }
          }),
        things: async () => Thing.findAll()
      },
      Mutation: {
        addThing: async (root, args) =>
          await Thing.create({ name: args.name, summary: args.summary }),
        updateThing: async (root, args) => {
          const thing = await Thing.findById(args.id);
          await thing.update({
            name: args.name ? args.name : thing.name,
            summary: args.summary ? args.summary : thing.summary
          });
          return thing;
        },
        removeThing: async (root, args) => {
          const thing = await Thing.findById(args.id);
          await thing.destroy();
          return thing;
        },
        addRelation: async (root, args) =>
          await Relation.create({
            from_thing_id: args.from,
            to_thing_id: args.to
          }),
        removeRelation: async (root, args) => {
          const relation = await Relation.findOne({
            where: { from_thing_id: args.from, to_thing_id: args.to }
          });
          await relation.destroy();
          return relation;
        }
      },
      Thing: {
        relationsTo: async root => {
          return Relation.findAll({
            where: {
              from_thing_id: root.id
            }
          });
        },
        relationsFrom: root =>
          Relation.findAll({
            where: {
              to_thing_id: root.id
            }
          })
      },
      Relation: {
        from: async (root, args) => await Thing.findById(root.from_thing_id),
        to: async (root, args) => await Thing.findById(root.to_thing_id)
      }
    };

    // In the most basic sense, the ApolloServer can be started
    // by passing type definitions (typeDefs) and the resolvers
    // responsible for fetching the data for those types.
    const server = new ApolloServer({ typeDefs, resolvers });

    // This `listen` method launches a web-server.  Existing apps
    // can utilize middleware options, which we'll discuss later.
    server
      .listen({
        http: {
          port: 8081
        }
      })
      .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
      });
  } catch (err) {
    console.log(err);
  }
})();
