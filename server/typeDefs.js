const { gql } = require("apollo-server");

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
module.exports = gql `
    type Thing {
      _id: String,
      name: String,
      summary: String,
      relations: [Thing],
    }

    type Query {
      seed: Thing,
      thing(id: String!): Thing,
      things: [Thing],
    }

    type Mutation {
      addThing(name: String!): Thing
      updateThing(id: String!, name: String, summary: String): Thing
    }
  `;
