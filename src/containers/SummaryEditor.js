import React from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';
import MentionDropDown from './MentionDropDownContainer'
import MentionPlugin from './../plugins/MentionPlugin'

class SummaryEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: Value.fromJSON(JSON.parse(props.summary), {
        plugins: [{
          data: {
            id: this.props.id
          }
        }]
      }),
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

  handleChange = (change) => {
    this.updateValue(change.value)
  }

  updateValue = (value) => {
    this.setState({ value })
  }

  render() {
    return (
      <React.Fragment>
        <Editor
          value={this.state.value}
          onChange={this.handleChange}
          plugins={MentionPlugin.plugins}
          autoFocus={true}
        />
        <MentionPlugin.portal value={this.state.value}>
            {(props) => <MentionDropDown {...props} updateValue={this.updateValue} filter={this.props.filter} id={this.props.id}/>}
        </MentionPlugin.portal>

      </React.Fragment>
    )
  }
}

export default SummaryEditor
