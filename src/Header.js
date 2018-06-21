import React from "react";
import SearchContainer from "./containers/SearchContainer";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  width: 20%
  height: 5%
  margin:auto
  clear:both
`;

const Navbar = styled.div`
  clear: both;
`;

const StyledNavLink = styled(NavLink)`
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
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
`;

export default () => {
  return (
    <Header>
      <SearchContainer />
      <Navbar>
        <StyledNavLink to="/">Dashboard</StyledNavLink>
        <StyledNavLink to="/thing">Create Thing</StyledNavLink>
      </Navbar>
    </Header>
  );
};
