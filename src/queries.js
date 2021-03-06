import gql from "graphql-tag";

export const GET_THINGS = gql`
  query getThings {
    things {
      id
      name
    }
  }
`;

export const GET_RELATIONS_FROM_BY_ID = gql`
  query getThingRelationsFromByID($id: ID!) {
    thing(id: $id) {
      id
      relationsFrom {
        from {
          id
          name
        }
      }
    }
  }
`;

export const GET_RELATIONS_TO_BY_ID = gql`
  query getThingRelationsToByID($id: ID!) {
    thing(id: $id) {
      id
      relationsTo {
        to {
          id
          name
        }
      }
    }
  }
`;

export const GET_THING_BY_ID = gql`
  query getThingByID($id: ID!) {
    thing(id: $id) {
      id
      name
      summary
      relationsFrom {
        from {
          id
          name
        }
      }
    }
  }
`;

export const GET_THING_BY_NAME = gql`
  query getThingByName($name: String!) {
    thingByName(name: $name) {
      id
      name
      summary
      relationsFrom {
        from {
          id
          name
        }
      }
    }
  }
`;

export const ADD_THING = gql`
  mutation addThing($name: String!, $summary: String!) {
    addThing(name: $name, summary: $summary) {
      id
      name
    }
  }
`;

export const ADD_RELATION = gql`
  mutation addRelation($to: ID!, $from: ID!) {
    addRelation(to: $to, from: $from) {
      to {
        id
      }
      from {
        id
      }
    }
  }
`;

export const REMOVE_RELATION = gql`
  mutation removeRelation($to: ID!, $from: ID!) {
    removeRelation(to: $to, from: $from) {
      to {
        id
      }
      from {
        id
      }
    }
  }
`;

export const UPDATE_THING = gql`
  mutation updateThing($id: ID!, $name: String, $summary: String) {
    updateThing(id: $id, name: $name, summary: $summary) {
      id
      name
      summary
    }
  }
`;

export const REMOVE_THING = gql`
  mutation removeThing($id: ID!) {
    removeThing(id: $id) {
      id
    }
  }
`;
