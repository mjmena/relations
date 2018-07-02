import React from "react";
import SummaryEditor from "./SummaryEditor";
import { Query, Mutation } from "react-apollo";
import Fuse from "fuse.js";
import { GET_THINGS, UPDATE_THING } from "../queries";

class EditableThingSummary extends React.Component {
  render() {
    return (
      <Mutation mutation={UPDATE_THING}>
        {updateThing => {
          return (
            <Query query={GET_THINGS}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                var options = {
                  shouldSort: true,
                  threshold: 0.2,
                  location: 0,
                  distance: 100,
                  maxPatternLength: 32,
                  minMatchCharLength: 0,
                  keys: ["name"]
                };
                //Filter self from mention
                const suggestions = data.things.filter(
                  thing => thing.id !== this.props.id
                );

                var fuse = new Fuse(suggestions, options);
                fuse.search.bind(fuse);
                return (
                  <SummaryEditor
                    key={this.props.id}
                    id={this.props.id}
                    summary={this.props.summary}
                    updateThing={updateThing}
                    filter={filter => {
                      const filteredSuggestions = fuse.search(filter);
                      return filteredSuggestions.length === 0 &&
                        filter.length === 0
                        ? suggestions
                        : filteredSuggestions;
                    }}
                  />
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}

export default EditableThingSummary;
