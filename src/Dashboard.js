import React, { Fragment } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ThingLinkList from './components/ThingLinkList'

class Dashboard extends React.Component {
  render() {
    return (
      <Query query={gql`
        {
          things{
            _id
            name
          }
        }
      `}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return(
          <Fragment>
            <h1>Dashboard</h1>
            <ThingLinkList things={data.things}/>
          </Fragment>
        )
      }}
        </Query>
    );
  }
}

export default Dashboard;
