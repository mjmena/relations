import gql from "graphql-tag";

export const GET_THINGS = gql `
  query getThings{
    things {
      id
      name
    }
  }
`
export const GET_THING_BY_ID = gql `
  query getThingByID($id: String!) {
    thing(id: $id) {
      id
      name
      summary
    }
  }
`

export const GET_RELATIONS_BY_ID = gql `
  query getRelationByID($id: String!) {
    thing(id: $id) {
      id
      relations{
        to{
          id
          name
        }
      }
    }
  }
`

export const ADD_THING = gql `
  mutation addThing($name:String!, $summary: String!) {
    addThing(name:$name, summary: $summary) {
      id
      name
    }
  }`

export const ADD_RELATION = gql `
  mutation addRelation($to:String!, $from: String!) {
    addRelation(to:$to, from: $from) {
      id
      name
    }
  }
`

export const REMOVE_RELATION = gql `
  mutation removeRelation($to:String!, $from: String!) {
    removeRelation(to:$to, from: $from) {
      id
    }
  }
`

export const UPDATE_THING = gql `
  mutation updateThing($id: String!, $name:String, $summary: String) {
    updateThing(id: $id, name:$name, summary: $summary) {
      id
      name
      summary
    }
  }`

export const REMOVE_THING = gql `
  mutation removeThing($id: String!) {
    removeThing(id: $id){
      id
    }
  }
`
