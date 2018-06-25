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
  width: 45%
  height: 100%
  float:left
`;

const Right = styled.div`
  width: 45%
  float: right
`;

const EditThing = props => {
  const { thing } = props;
  return (
    <React.Fragment>
      <Title>{thing.name}</Title>
      <Left>
        <EditableThingSummary id={thing.id} summary={thing.summary} />
      </Left>
      <Right>
        <Title>Referenced by</Title>
        <ThingLinkList
          things={thing.relationsFrom.map(relation => relation.from)}
        />
      </Right>
    </React.Fragment>
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
