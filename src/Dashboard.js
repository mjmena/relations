import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from 'react-router-dom'

class App extends React.Component {
  render() {
      return (
        <Query query={gql`
        {
          things{
            _id
            name
          }
        }
      `}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.things.map(({_id, name}) => (
          <li key={_id}>
            <Link to={`/thing/${_id}`}>{name}</Link>
          </li>
        ));
      }}
        </Query>
      );
  }
}

export default App;
