import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';
import Dashboard from './Dashboard';
import CreateThing from './containers/CreateThing';
import EditThing from './containers/EditThing';

const Background = styled.div `
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: ${props => props.theme.primary};
  color: ${props => props.theme.secondary};
`

class App extends React.Component {
  render() {
    return (
      <Background>
        <Header />
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/thing' component = { CreateThing } />
          <Route path = '/thing/:id' component = { EditThing } />
        </Switch>
      </Background>
    )
  }
}

export default App;
