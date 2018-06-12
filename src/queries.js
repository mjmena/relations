import gql from "graphql-tag";

export const GET_THINGS = gql `
  query getThings{
    things {
      _id
      name
    }
  }
`
export const GET_THING_BY_ID = gql `
  query getThingByID($id: String!) {
    thing(id: $id) {
      _id
      name
      summary
      relations{
        _id
        name
      }
    }
  }`


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

export const REMOVE_THING = gql `
  mutation removeThing($id: String!) {
    removeThing(id: $id){
      _id
    }
  }
`
