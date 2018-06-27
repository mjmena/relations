import React from "react";
import { Mutation } from "react-apollo";
import { GET_THINGS, ADD_THING } from "../queries";
import { Value } from "slate";

class CreateThing extends React.Component {
  state = {
    name: this.props.name
  };

  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  componentDidMount() {
    this.node.current.focus();
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const summary = Value.create({
      document: {
        nodes: [
          {
            object: "block",
            type: "paragraph",
            nodes: [{ object: "text", leaves: [{ text: "" }] }]
          }
        ]
      }
    });

    this.props
      .handleAdd({
        variables: {
          name: this.state.name,
          summary: JSON.stringify(summary.toJSON())
        },
        refetchQueries: [{ query: GET_THINGS }]
      })
      .then(({ data }) => {
        this.props.onConfirm(data.addThing.name);
      });
  };

  handleExit = event => {
    if (event.key === "Escape") {
      this.props.onCancel(event);
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Add Thing</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            onKeyDown={this.handleExit}
            ref={this.node}
          />
        </form>
      </React.Fragment>
    );
  }
}

const CreateThingMutation = props => (
  <Mutation mutation={ADD_THING}>
    {addThing => {
      return <CreateThing handleAdd={addThing} {...props} />;
    }}
  </Mutation>
);

export default CreateThingMutation;
