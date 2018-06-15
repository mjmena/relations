import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { GET_THING_BY_ID } from '../../queries';

const BrokenLink = styled.span `
  color:red;
  font-style:italic;
`

const MentionNode = (props) => {
  return (
    <Query query={GET_THING_BY_ID} variables={{id:props.node.data.get('_id')}}>
      {({loading, error, data})=>{
        if (loading) return <Link to={'/thing/'+props.node.data.get('_id')} {...props.attributes}>{props.node.data.get('name')}</Link>
        if (error) return <BrokenLink>{props.node.data.get('name')}</BrokenLink>;
        return <Link to={'/thing/'+data.thing._id} {...props.attributes}>{data.thing.name}</Link>
      }}
    </Query>
  )
}

export default MentionNode;
