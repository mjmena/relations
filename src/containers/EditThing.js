import React from "react";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";
import ThingLinkList from "./../components/ThingLinkList";
import EditableThingSummary from "./EditableThingSummary";
import { Redirect } from "react-router-dom";

import { GET_THING_BY_NAME, REMOVE_THING } from "../queries";

const Title = styled.div`
  font-size: 2em;
`;

const Left = styled.div`
  flex-display: column;
  flex-grow: 3;
  align-items: stretch;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Right = styled.div`
  flex-grow: 1;
  text-align: right;
`;

const EditThing = props => {
  const { thing } = props;
  return (
    <Container>
      <Left>
        <Title>{thing.name}</Title>

        <EditableThingSummary id={thing.id} summary={thing.summary} />
      </Left>
      <Right>
        <Title>Referenced by</Title>
        <ThingLinkList
          things={thing.relationsFrom.map(relation => relation.from)}
        />
      </Right>
    </Container>
  );
};

const EditThingContainer = props => {
  return (
    <Query
      query={GET_THING_BY_NAME}
      variables={{ name: props.match.params.name }}
    >
      {query => {
        if (query.loading) return <p>Loading...</p>;
        if (query.error) return <p>Error :(</p>;
        return (
          <Mutation mutation={REMOVE_THING}>
            {(deleteThing, { data }) => {
              if (data) {
                return <Redirect to={`/`} />;
              }
              return <EditThing thing={query.data.thingByName} />;
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default EditThingContainer;
