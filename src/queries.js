import gql from "graphql-tag";

export const GET_THINGS = gql `
  {
    things {
      _id
      name
    }
  }
`
export const UPDATE_THING = gql `
  mutation updatedThing($id: String!, $name:String, $summary: String) {
    updateThing(id: $id, name:$name, summary: $summary) {
      _id
      name
      summary
    }
  }`
