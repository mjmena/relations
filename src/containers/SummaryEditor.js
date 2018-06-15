import React from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';
import memoize from 'memoize-one';

import MentionDropDown from './../components/MentionDropDown'
import MentionPlugin from './../plugins/ConvertMentionPlugin'

class SummaryEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: Value.fromJSON(JSON.parse(props.summary)),
    }
  }

  componentWillUnmount() {
    this.props.updateThing({
      variables: {
        id: this.props.id,
        summary: JSON.stringify(this.state.value.toJSON())
      }
    })
  }

  getMentionPlugin = memoize(
    id => MentionPlugin({ filter: this.props.filter })
  );

  handleChange = ({ value }) => {
    this.setState({ value })
  }

  render() {

    const MemoizedMentionPlugin = this.getMentionPlugin(this.props.id)

    return (
      <React.Fragment>
        <Editor
          value={this.state.value}
          onChange={this.handleChange}
          plugins={MemoizedMentionPlugin.plugins}
          autoFocus={true}
        />
        <MemoizedMentionPlugin.portal>
          {(props) => <MentionDropDown {...props} />}
        </MemoizedMentionPlugin.portal>
      </React.Fragment>
    )
  }
}

export default SummaryEditor
