const typeDefs = require("./typeDefs");
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { Thing, Relation } = require('./models');

mongoose.connect('mongodb://localhost/relations');

(async() => {
  try {
    const resolvers = {
      Query: {
        seed: async() => Thing.findOne({ seed: true }),
        thing: async(root, { id }) => Thing.findById(id),
        things: async() => Thing.find(),
      },
      Mutation: {
        addThing: async(root, args) => {
          const newThing = new Thing({ name: args.name, summary: args.summary });
          await newThing.save();
          return newThing;
        },
        updateThing: async(root, args) => {
          const updateThing = await Thing.findById(args.id)
          if (args.name) {
            updateThing.name = args.name;
          }
          if (args.summary) {
            updateThing.summary = args.summary;
          }

          await updateThing.save();
          return updateThing;
        },
        removeThing: async(root, args) => {
          const deletedThing = await Thing.findByIdAndRemove(args.id)
          return deletedThing;

        }
      },
      Thing: {
        relations: async(thing) => {
          let relations = await Relation.find({ participants: thing._id })

          const reducer = (relationships, { participants }) => {
            if (thing._id.equals(participants[0])) {
              return relationships.concat(participants[1])
            }
            else return relationships.concat(participants[0])
          }

          const others = relations.reduce(reducer, [])
          return Thing.find({ _id: others })
        }
      }
    };

    // In the most basic sense, the ApolloServer can be started
    // by passing type definitions (typeDefs) and the resolvers
    // responsible for fetching the data for those types.
    const server = new ApolloServer({ typeDefs, resolvers });

    // This `listen` method launches a web-server.  Existing apps
    // can utilize middleware options, which we'll discuss later.
    server.listen({
      http: {
        port: 8081
      }
    }).
    then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    })
  }
  catch (err) {
    console.log(err)
  }

})();
