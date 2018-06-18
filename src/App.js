import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Resize from './containers/Resize'
import Header from './Header';
import Dashboard from './Dashboard';
import CreateThing from './containers/CreateThing';
import EditThing from './containers/EditThing';

const Background = styled.div `
  height: ${props => props.height}px
  width: ${props => props.width}px
  background: ${props => props.theme.primary}
  color: ${props => props.theme.secondary}
  font-family: 'Josefin Sans', 'sans-serif'
`
const Body = styled.div `
  clear: both;
`
class App extends React.Component {
  render() {
    return (
      <Resize>
        {({height, width}) => <Background height={height} width={width}>
            <Header />
            <Body>
              <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route exact path='/thing' component = { CreateThing } />
                <Route path = '/thing/:id' component = { EditThing } />
              </Switch>
            </Body>
          </Background>
        }
      </Resize>
    )
  }
}

export default App;
