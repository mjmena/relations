import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Resize from "./containers/Resize";
import Header from "./Header";
import Dashboard from "./Dashboard";
import EditThing from "./containers/EditThing";

const Background = styled.div`
  height: ${props => props.height - 20}px
  width: ${props => props.width - 20}px
  color: ${props => props.theme.secondary}
  display: flex;
  padding: 10px
  font-family: Josefin Sans
  flex-direction: column;
`;

class App extends React.Component {
  render() {
    return (
      <Resize>
        {({ height, width }) => (
          <Background height={height} width={width}>
            <Header />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/thing/:name" component={EditThing} />
            </Switch>
          </Background>
        )}
      </Resize>
    );
  }
}

export default App;
