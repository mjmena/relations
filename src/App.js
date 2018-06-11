import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'

import Header from './Header';
import Dashboard from './Dashboard';
import CreateThing from './containers/CreateThing';
import EditThing from './containers/EditThing';

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/thing' component = { CreateThing } />
          <Route path = '/thing/:id' component = { EditThing } />
        </Switch>
      </Fragment>
    )
  }
}

export default App;
