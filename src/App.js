import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Resize from "./containers/Resize";
import Header from "./Header";
import Dashboard from "./Dashboard";
import CreateThing from "./containers/CreateThing";
import EditThing from "./containers/EditThing";

const Background = styled.div`
  height: ${props => props.height - 20}px
  width: ${props => props.width - 20}px
  color: ${props => props.theme.secondary}
  padding: 10px
  font-family: Josefin Sans
`;

const Body = styled.div`
  height: 90%
  width: 90%
  float:left
`;
class App extends React.Component {
  render() {
    return (
      <Resize>
        {({ height, width }) => (
          <Background height={height} width={width}>
            <Header />
            <Body>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/thing" component={CreateThing} />
                <Route path="/thing/:name" component={EditThing} />
              </Switch>
            </Body>
          </Background>
        )}
      </Resize>
    );
  }
}

export default App;
