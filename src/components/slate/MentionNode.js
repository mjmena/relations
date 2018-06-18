import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import MentionNodeTooltip from './MentionNodeTooltip'
import { GET_THING_BY_ID } from '../../queries';

const BrokenLink = styled.span `
  color:red;
  font-style:italic;
`
// eslint-disable-next-line
const ThemedLink = styled(Link)
`
  text-decoration: none
`
class MentionNode extends React.Component {

  state = {
    hovering: false
  }

  componentWillUnmount() {
    const document = this.props.editor.value.document;

    //does the current node exist in the document anymore?
    if (!document.hasDescendant(this.props.node.key)) {
      const mentions = document.filterDescendants(descendant => descendant.type === 'mention')
        .map(mentionNode => mentionNode.data.get("id"))
      //does the current node share an id with another mention currently in the document
      if (!mentions.includes(this.props.node.data.get('id'))) {
        console.log('should delete relationship')
      }
    }
  }

  render() {
    return (<Query query={GET_THING_BY_ID} variables={{id:this.props.node.data.get('id')}}>
      {({loading, error, data})=>{
        if (loading) return <Link to={'/thing/'+this.props.node.data.get('id')} {...this.props.attributes}>{this.props.node.data.get('name')}</Link>
        if (error) return <BrokenLink>{this.props.node.data.get('name')}</BrokenLink>;
        return <ThemedLink
          to={'/thing/'+data.thing.id}
          {...this.props.attributes}
          onMouseEnter={event=>this.setState({hovering:true})}
          onMouseLeave={event=>this.setState({hovering:false})}
        >
          {data.thing.name}
          {this.state.hovering ? <MentionNodeTooltip node={this.props.node} summary={data.thing.summary} /> : null}
        </ThemedLink>
      }}
    </Query>)
  }
}

export default MentionNode;