import React from "react";
import SearchContainer from "./containers/SearchContainer";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: row;
  padding-bottom: 20px;
`;

const HomeButton = styled(NavLink)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    background: ${props => props.theme.secondary};
  }

  border: 2px solid ${props => props.theme.secondary};
  background: ${props => props.theme.tertiary};
  color: ${props => props.theme.primary};
`;

export default () => {
  return (
    <Header>
      <HomeButton to="/">Dashboard</HomeButton>
      <SearchContainer />
    </Header>
  );
};
