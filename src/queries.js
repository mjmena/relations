import gql from "graphql-tag";

export const GET_THINGS = gql `
  {
    things {
      _id
      name
    }
  }
`
export const ADD_THING = gql `
  mutation addThing($name:String!, $summary: String!) {
    addThing(name:$name, summary: $summary) {
      _id
      name
      summary
    }
  }`

export const UPDATE_THING = gql `
  mutation updateThing($id: String!, $name:String, $summary: String) {
    updateThing(id: $id, name:$name, summary: $summary) {
      _id
      name
      summary
    }
  }`
