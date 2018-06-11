import React from 'react';
import { Link } from 'react-router-dom';

const HANDLE_REGEX = /@[\w]+/g;

function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const HandleLink = (props) => {
  return <Link to={`/thing/${props.decoratedText.slice(1)}`}>{props.children}</Link>
}


const decorators = [{
  strategy: handleStrategy,
  component: HandleLink
}]

export default decorators;
