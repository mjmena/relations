import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Dashboard from './Dashboard';
import Thing from './Thing';


class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/thing/:id' component={Thing}/>
      </Switch>
    )
  }
}

export default App;
