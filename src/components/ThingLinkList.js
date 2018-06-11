import React from 'react';
import { Link } from 'react-router-dom'

const ThingLinkList = ({ things }) => things.map(({ _id, name }) => (
  <li key={_id}>
    <Link to={`/thing/${_id}`}>{name}</Link>
  </li>
));

export default ThingLinkList;
