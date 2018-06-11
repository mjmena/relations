import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import EditableThingName from './EditableThingName'
import EditableThingSummary from './EditableThingSummary'
const GET_THING_BY_ID = gql `
  query thing($id: String!) {
    thing(id: $id) {
      _id
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
          <h1>{data.thing._id}</h1>
          <EditableThingName id={data.thing._id} name={data.thing.name} />
          <h2>Summary</h2>
          <EditableThingSummary id={data.thing._id} summary={data.thing.summary} />
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
