import React from 'react';
import { Query } from "react-apollo";
import Fuse from 'fuse.js'
import Searchbar from './../components/Searchbar'
import { GET_THINGS } from './../queries'

class SearchContainer extends React.Component {
  render() {
    return (
      <Query query={GET_THINGS}>
      {({ loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        var options = {
          shouldSort: true,
          threshold: 0.2,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 0,
          keys: [
            "name"
          ]
        };

        var fuse = new Fuse(data.things, options);
        return <Searchbar search={fuse.search.bind(fuse)} />
      }}
    </Query>
    )
  }
}

export default SearchContainer;
