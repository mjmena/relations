import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import "./styles.css";
import App from "./App";

const client = new ApolloClient();

const theme = {
  primary: "white",
  secondary: "black",
  tertiary: "grey",
  font: "Josefin Sans"
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
