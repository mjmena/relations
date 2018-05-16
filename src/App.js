import React from 'react';
import './App.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";

class App extends React.Component {
  render() {
    return (
      <Query query={gql`
      {
        things{
          name
        }
      }
    `}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.things.map(({id, name}) => (
        <div key={name}>
          <p>{name}</p>
        </div>
      ));
    }}
      </Query>
    );
  }
}

export default App;
