import React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";
import MentionNodeTooltip from "./MentionNodeTooltip";
import Delay from "./../Delay";
import {
  GET_THING_BY_ID,
  REMOVE_RELATION,
  GET_RELATIONS_TO_BY_ID,
  GET_RELATIONS_FROM_BY_ID
} from "../../queries";

const BrokenLink = styled.span`
  color: red;
  font-style: italic;
`;

const Option = styled.span`
  background: ${props => props.theme.tertiary};

  &:hover {
    background: ${props => props.theme.secondary};
  }

  > a {
    text-decoration,
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
    color: ${props => props.theme.primary};
  }
`;

class MentionNode extends React.Component {
  state = {
    hovering: false
  };

  constructor(props) {
    super(props);
    this.relative = React.createRef();
  }

  componentWillUnmount() {
    const document = this.props.editor.value.document;

    //does the current node exist in the document anymore?
    if (!document.hasDescendant(this.props.node.key)) {
      const mentions = document
        .filterDescendants(descendant => descendant.type === "mention")
        .map(mentionNode => mentionNode.data.get("id"));
      //does the current node share an id with another mention currently in the document
      if (!mentions.includes(this.props.node.data.get("id"))) {
        const to = this.props.node.data.get("id");
        const from = this.props.editor.value.data.get("id");

        this.props.removeRelation({
          variables: {
            from,
            to
          },
          refetchQueries: [
            {
              query: GET_RELATIONS_TO_BY_ID,
              variables: {
                id: from
              }
            },
            {
              query: GET_RELATIONS_FROM_BY_ID,
              variables: {
                id: to
              }
            }
          ]
        });
      }
    }
  }

  render() {
    return (
      <Query
        query={GET_THING_BY_ID}
        variables={{ id: this.props.node.data.get("id") }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Link
                to={"/thing/" + this.props.node.data.get("id")}
                {...this.props.attributes}
              >
                {this.props.node.data.get("name")}
              </Link>
            );
          if (error)
            return <BrokenLink>{this.props.node.data.get("name")}</BrokenLink>;
          return (
            <Option innerRef={this.relative}>
              <Link
                to={"/thing/" + data.thing.id}
                {...this.props.attributes}
                onMouseEnter={event => this.setState({ hovering: true })}
                onMouseLeave={event => this.setState({ hovering: false })}
                contentEditable={false}
              >
                {data.thing.name}
                <Delay start={this.state.hovering}>
                  {delay =>
                    delay ? (
                      <span />
                    ) : (
                      <MentionNodeTooltip
                        relative={this.relative}
                        summary={data.thing.summary}
                      />
                    )
                  }
                </Delay>
              </Link>
            </Option>
          );
        }}
      </Query>
    );
  }
}

export default props => {
  return (
    <Mutation mutation={REMOVE_RELATION}>
      {removeRelation => (
        <MentionNode {...props} removeRelation={removeRelation} />
      )}
    </Mutation>
  );
};
