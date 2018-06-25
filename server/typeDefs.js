const { gql } = require("apollo-server");

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
module.exports = gql`
  type Thing {
    id: ID
    name: String
    summary: String
    relationsTo: [Relation]
    relationsFrom: [Relation]
  }

  type Relation {
    from: Thing
    to: Thing
    description: String
  }

  type Query {
    thing(id: ID!): Thing!
    thingByName(name: String!): Thing!
    things: [Thing]
  }

  type Mutation {
    addThing(name: String!, summary: String!): Thing
    updateThing(id: ID!, name: String, summary: String): Thing
    removeThing(id: ID!): Thing
    addRelation(from: ID!, to: ID!): Relation
    removeRelation(from: ID!, to: ID!): Relation
  }
`;
