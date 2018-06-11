import React, { Fragment } from 'react';
import { Mutation } from "react-apollo";
import { Redirect } from 'react-router-dom'
import gql from "graphql-tag";

const ADD_THING = gql `
  mutation addThing($name: String!) {
    addThing(name: $name) {
      _id
      name
    }
  }`

class AddThing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <Mutation mutation={ADD_THING} >
        {(addThing, { data }) => {
          if(data){
            return <Redirect to={`/thing/${data.addThing._id}`} />
          }
        return (
          <Fragment>
          <h1>Add Thing</h1>
          <form onSubmit={e => {
            e.preventDefault();
            addThing({ variables: { name: this.state.name } });
          }}>
            <input type="text" value={this.state.name} onChange={this.handleChange} />
            <button type="submit">Add Thing</button>
          </form>
        </Fragment>);
        }}
      </Mutation>)
  }
}

export default AddThing;
