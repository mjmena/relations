import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_THING_BY_ID = gql `
  query thing($id: String!) {
    thing(id: $id) {
      name
      summary
      relations{
        _id
        name
      }
    }
  }`

const Thing = (props) => (
  <Query query={GET_THING_BY_ID} variables={{id:props.match.params.id}}>
    {({ loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return(
        <div>
          <h1>{data.thing.name}</h1>
          <div>{data.thing.summary}</div>
          <h2> Relations </h2>
          {data.thing.relations.map(({_id, name}) => (
           <li key={_id}>
             <Link to={`/thing/${_id}`}>{name}</Link>
           </li>
         ))}
        </div>
      );
    }}
  </Query>
)

export default Thing;
