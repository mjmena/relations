import React from 'react';
import { Query } from "react-apollo";
import ThingLinkList from './components/ThingLinkList'
import { GET_THINGS } from './queries'

class Dashboard extends React.Component {
  render() {
    return (
      <Query query={GET_THINGS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return(
          <React.Fragment>
            <h1>Dashboard</h1>
            <ThingLinkList things={data.things}/>
          </React.Fragment>
        )
      }}
        </Query>
    );
  }
}

export default Dashboard;
