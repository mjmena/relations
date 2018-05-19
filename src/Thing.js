import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_THING_BY_ID = gql`
  query thing($id: String!) {
    thing(id: $id) {
      name
      summary
    }
  }`

const Thing = (props) =>(
  <Query query={GET_THING_BY_ID} variables={{id:props.match.params.id}}>
    {({ loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return(
        <div>
          <h1>{data.thing.name}</h1>
          <div>{data.thing.summary}</div>
        </div>
      );
    }}
  </Query>
)

export default Thing;
