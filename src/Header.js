import React from 'react';
import SearchContainer from './SearchContainer';
import { NavLink } from 'react-router-dom';

const { Fragment } = React;

export default () => {
  return <Fragment>
    <SearchContainer />
    <ul>
      <li><NavLink to="/">Dashboard</NavLink></li>
      <li><NavLink to="/thing">Create Thing</NavLink></li>
    </ul>
  </Fragment>
}
