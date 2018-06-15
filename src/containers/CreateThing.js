import React, { Fragment } from 'react';
import { Mutation } from "react-apollo";
import { Redirect } from 'react-router-dom'
import { GET_THINGS, ADD_THING } from '../queries'

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
            addThing({
              variables: {
                name: this.state.name,
                summary:JSON.stringify({ document: { nodes: [ { object: 'block', type: 'paragraph', nodes: [ { object: 'text', leaves: [ { text: 'here', }, ], }, ], }, ], }, })
              },
              refetchQueries: [
                {query: GET_THINGS}
              ]
            });
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
