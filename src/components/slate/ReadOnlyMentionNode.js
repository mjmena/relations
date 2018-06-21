import React from "react";
import { Query } from "react-apollo";
import styled from "styled-components";

import { GET_THING_BY_ID } from "../../queries";

const Mention = styled.span`
  background: ${props => props.theme.tertiary};
  color: ${props => props.theme.primary};
`;

const BrokenLink = styled.span`
  color: red;
  font-style: italic;
`;

class MentionNode extends React.Component {
  render() {
    return (
      <Query
        query={GET_THING_BY_ID}
        variables={{ id: this.props.node.data.get("id") }}
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error)
            return <BrokenLink>{this.props.node.data.get("name")}</BrokenLink>;
          return <Mention>{data.thing.name}</Mention>;
        }}
      </Query>
    );
  }
}

export default MentionNode;
