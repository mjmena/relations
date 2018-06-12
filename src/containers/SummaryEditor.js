import React, { Fragment } from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';
import StickyInlines from 'slate-sticky-inlines'
import { withRouter } from 'react-router'
import MentionPlugin from './../plugins/MentionPlugin';

const plugins = [
  StickyInlines({
    allowedTypes: ['active_mention'],
    bannedTypes: ['mention'],
    canBeEmpty: false,
    hasStickyBoundaries: false,
    stickOnDelete: false,
  })
]

class SummaryEditor extends React.Component {
  state = {}

  static getDerivedStateFromProps(props) {
    const mention = MentionPlugin({ filterSuggestions: props.filterSuggestions });
    return {
      value: Value.fromJSON(JSON.parse(props.summary)),
      mention,
      plugins: plugins.concat([mention.plugin])
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      this.handleSave(prevProps, prevState);
    }
  }

  handleSave = (props, state) => {
    props.updateThing({
      variables: {
        id: props.id,
        summary: JSON.stringify(state.value.toJSON())
      }
    })
  }

  handleChange = ({ value }) => {
    this.setState({ value })
  }

  componentWillUnmount() {
    this.handleSave(this.props, this.state);
  }

  render() {
    const Portal = this.state.mention.portal;
    return (<Fragment>
      <Editor
        value={this.state.value}
        onChange={this.handleChange}
        plugins={this.state.plugins}
        autoFocus={true}
      />
      <Portal>
        {(props)=>{
        console.log(props)
          if(!props.suggestions) return null;
          return props.suggestions.map((suggestion, index) =>{
            return <div
              key={suggestion._id}
              style={{
                backgroundColor: index===props.selectedSuggestionIndex ? 'red' : 'transparent'
              }}
              onClick={(event)=>{
                event.preventDefault()
                this.setState({
                  value:this.state.value.change().call(this.state.mention.changes.submitMention, suggestion).value
                })
              }}
          >{suggestion.name}</div>})
        }}
      </Portal>

    </Fragment>)
  }
}

export default withRouter(SummaryEditor)
