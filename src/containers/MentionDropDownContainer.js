import React from 'react';
import { Mutation } from 'react-apollo'
import { ADD_THING, GET_THINGS } from './../queries';
import MentionDropdown from './../components/MentionDropdown'

class MentionDropdownContainer extends React.Component {
  render() {
    const { isFocusingActiveMention, value } = this.props;
    if (!isFocusingActiveMention(value)) return null;
    return <Mutation mutation={ADD_THING} refetchQueries={[{query:GET_THINGS}]}>
      {addThing => <MentionDropdown {...this.props} addThing={addThing} /> }
    </Mutation>
  }
}

export default MentionDropdownContainer;
