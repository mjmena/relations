import React from "react";
import { Query, Mutation } from "react-apollo";
import {
  ADD_THING,
  ADD_RELATION,
  GET_THINGS,
  GET_RELATIONS_TO_BY_ID
} from "./../queries";
import MentionDropdown from "./../components/MentionDropdown";

class MentionDropdownContainer extends React.Component {
  render() {
    const { isFocusingActiveMention, value } = this.props;
    if (!isFocusingActiveMention(value)) return null;
    return (
      <Mutation mutation={ADD_THING} refetchQueries={[{ query: GET_THINGS }]}>
        {addThing => (
          <Mutation mutation={ADD_RELATION}>
            {addRelation => (
              <Query
                query={GET_RELATIONS_TO_BY_ID}
                variables={{ id: this.props.id }}
              >
                {query => {
                  if (query.loading || query.error) return null;
                  console.log(query);
                  return (
                    <MentionDropdown
                      {...this.props}
                      relationsTo={query.data.thing.relationsTo}
                      addThing={addThing}
                      addRelation={addRelation}
                    />
                  );
                }}
              </Query>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default MentionDropdownContainer;
