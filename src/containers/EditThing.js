import React from "react";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";
import ThingLinkList from "./../components/ThingLinkList";
import EditableThingSummary from "./EditableThingSummary";
import { Redirect } from "react-router-dom";

import { GET_THING_BY_ID, REMOVE_THING } from "../queries";

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

const Thing = props => (
  <Query query={GET_THING_BY_ID} variables={{ id: props.match.params.id }}>
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
              <React.Fragment>
                <Title>{query.data.thing.name}</Title>
                <Left>
                  <EditableThingSummary
                    id={query.data.thing.id}
                    summary={query.data.thing.summary}
                  />
                </Left>
                <Right>
                  <Title>Referenced by</Title>
                  <ThingLinkList
                    things={query.data.thing.relationsFrom.map(
                      relation => relation.from
                    )}
                  />
                </Right>
              </React.Fragment>
            );
          }}
        </Mutation>
      );
    }}
  </Query>
);

export default Thing;
