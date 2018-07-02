import React from "react";
import { Mutation } from "react-apollo";
import EditableInput from "./EditableInput";
import { UPDATE_THING } from "./../queries";

class EditableThingName extends React.Component {
  render() {
    return (
      <Mutation mutation={UPDATE_THING}>
        {(updateThing, { data }) => (
          <EditableInput
            initialValue={this.props.name}
            handleSubmit={value => {
              updateThing({
                variables: { id: this.props.id, name: value },
                optimisticResponse: {
                  updateThing: {
                    name: value,
                    id: this.props.id,
                    __typename: "Thing"
                  }
                }
              });
            }}
          />
        )}
      </Mutation>
    );
  }
}

export default EditableThingName;
