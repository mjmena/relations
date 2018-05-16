const {gql} = require("apollo-server");
  
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
module.exports = gql`
    type Thing {
      name: String
    }

    type Query {
      seed: Thing,
      things: [Thing]
    }
  `;
