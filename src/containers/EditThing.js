import React from "react";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";
import ThingLinkList from "./../components/ThingLinkList";
import EditableThingName from "./EditableThingName";
import EditableThingSummary from "./EditableThingSummary";
import { Redirect } from "react-router-dom";

import { GET_THING_BY_NAME, REMOVE_THING } from "../queries";

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
        <EditableThingName id={thing.id} name={thing.name} />
        <EditableThingSummary id={thing.id} summary={thing.summary} />
      </Left>
      <Right>
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
              return (
                <EditThing
                  key={query.data.thingByName.id}
                  thing={query.data.thingByName}
                  deleteThing={deleteThing}
                />
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default EditThingContainer;
