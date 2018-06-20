import React from "react";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";
import ThingLinkList from "./../components/ThingLinkList";
import EditableThingSummary from "./EditableThingSummary";
import { Redirect } from "react-router-dom";

import { GET_THING_BY_ID, GET_THINGS, REMOVE_THING } from "../queries";

const Title = styled.div`
  font-size: 2em;
`;

const Left = styled.div`
  width: 49%
  overflow:scroll
  height: 100%
  float:left
  // padding: 20px
`;

const Right = styled.div`
  width: 49%
  float: left
  // padding: 20px
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
                <Title>Summary</Title>
                <Left>
                  <EditableThingSummary
                    id={query.data.thing.id}
                    summary={query.data.thing.summary}
                  />
                </Left>
                <Right>
                  <ThingLinkList
                    things={query.data.thing.relationsFrom.map(
                      relation => relation.from
                    )}
                  />
                </Right>
                <button
                  onClick={event =>
                    deleteThing({
                      variables: {
                        id: query.data.thing.id
                      },
                      refetchQueries: [{ query: GET_THINGS }]
                    })
                  }
                >
                  Delete {query.data.thing.name}
                </button>
              </React.Fragment>
            );
          }}
        </Mutation>
      );
    }}
  </Query>
);

export default Thing;
