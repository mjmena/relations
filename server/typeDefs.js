const { gql } = require("apollo-server");

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
module.exports = gql `
    type Thing {
      id: String,
      name: String,
      summary: String,
      relations: [Relation]
    }

    type Relation {
      to: Thing,
      description: String
    }

    type Query {
      thing(id: String!): Thing!,
      things: [Thing]
    }

    type Mutation {
      addThing(name: String!, summary: String!): Thing
      updateThing(id: String!, name: String, summary: String): Thing
      removeThing(id: String!) : Thing
      addRelation(from: String!, to: String!) : Thing
      removeRelation(from: String!, to: String!) : Thing

    }
  `;
