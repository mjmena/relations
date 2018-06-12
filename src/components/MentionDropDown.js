import React from 'react';

export default (props) => {
  console.log(props)
  if (!props.suggestions) return null;
  return props.suggestions.map((suggestion, index) => {
    return <div
        key={suggestion._id}
        style={{
          backgroundColor: index===props.selectedSuggestionIndex ? 'red' : 'transparent'
        }}
        onClick={(event)=>{
          console.log("click")
          event.preventDefault()
          props.updateValue(props.value.change().call(props.submitMention, suggestion).value)
        }}
    >{suggestion.name}</div>
  })
}
