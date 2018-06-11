import React from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import EditableInput from "./EditableInput";

const UPDATE_THING_NAME = gql `
  mutation updatedThing($id: String!, $name: String) {
    updateThing(id: $id, name: $name) {
      _id
      name
    }
  }`

class EditableThingName extends React.Component {
  render() {
    return (
      <Mutation mutation={UPDATE_THING_NAME} >
      {(updateThing, { data }) => (
        <EditableInput initialValue={this.props.name} handleSubmit={(value)=>{
          updateThing({ variables: {id: this.props.id, name: value },
          optimisticResponse: {
           updateThing: {
            name: value,
            _id: this.props.id,
            __typename: 'Thing',
            },
          }});
        }} />)
      }
      </Mutation>)
  }
}

export default EditableThingName;
