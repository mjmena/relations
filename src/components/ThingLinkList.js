import React from "react";
import { Link } from "react-router-dom";

const ThingLinkList = ({ things }) =>
  things.map(({ id, name }) => (
    <li key={id}>
      <Link to={`/thing/${name}`}>{name}</Link>
    </li>
  ));

export default ThingLinkList;
