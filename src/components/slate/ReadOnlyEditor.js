import React from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';
import MentionPlugin from './../../plugins/MentionPlugin';

class SummaryEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: Value.fromJSON(JSON.parse(props.value)),
    }
  }

  handleChange = ({ value }) => {
    this.updateValue(value)
  }

  updateValue = (value) => {
    this.setState({ value })
  }

  render() {
    return <Editor
      value={this.state.value}
      onChange={this.handleChange}
      readOnly={true}
      plugins={MentionPlugin.plugins}
    />
  }
}

export default SummaryEditor
