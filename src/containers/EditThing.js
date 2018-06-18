import React from 'react';
import { Query, Mutation } from "react-apollo";
import styled from 'styled-components';
import EditableThingName from './EditableThingName'
import EditableThingSummary from './EditableThingSummary'
import { Redirect } from 'react-router-dom'

import { GET_THING_BY_ID, GET_THINGS, REMOVE_THING } from '../queries';

const Title = styled.div `
  font-size: 2em;
`

const Thing = (props) => (
  <Query query={GET_THING_BY_ID} variables={{id:props.match.params.id}}>
    {(query) => {
      if (query.loading) return <p>Loading...</p>;
      if (query.error) return <p>Error :(</p>;
      return <Mutation mutation={REMOVE_THING}>
      {(deleteThing, { data }) => {
          if(data){
            return <Redirect to={`/`} />
          }
          return (
          <div>
            <Title>{query.data.thing.id}</Title>
            <EditableThingName key={query.data.thing.id} id={query.data.thing.id} name={query.data.thing.name} />
            <Title>Summary</Title>
            <EditableThingSummary id={query.data.thing.id} summary={query.data.thing.summary} />
            <button onClick={(event)=>deleteThing({
              variables: {
                id:query.data.thing.id
              },
              refetchQueries: [
                {query: GET_THINGS}
              ]
            })}>Delete {query.data.thing.name}</button>
          </div>
        )
      }}
      </Mutation>

    }}
  </Query>
)

export default Thing;
