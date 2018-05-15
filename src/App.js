import React from 'react';
import './App.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";

class App extends React.Component {
  render() {
    return (
      <Query query={gql`
      {
        books{
          title
          author
        }
      }
    `}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.books.map(({title, author}) => (
        <div key={title}>
          <p>{`${title} by ${author}`}</p>
        </div>
      ));
    }}
      </Query>
    );
  }
}

export default App;
