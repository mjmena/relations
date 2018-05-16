const typeDefs = require("./database/typeDefs");
const { ApolloServer} = require('apollo-server');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/relations');

const Thing = mongoose.model('Thing', { name: String });

(async() => {
  try{
    const resolvers = {
    Query: {
      seed: async () => Thing.findOne({seed:true}),
      things: async () => Thing.find()
    },
  };

  // In the most basic sense, the ApolloServer can be started
  // by passing type definitions (typeDefs) and the resolvers
  // responsible for fetching the data for those types.
  const server = new ApolloServer({ typeDefs, resolvers });

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.
  server.listen({port: 8081}).
  then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })  
  }catch(err){
    console.log(err)
  }
  
})();