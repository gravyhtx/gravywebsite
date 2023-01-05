import React, { FC } from 'react';
import { findDOMNode } from 'react-dom';

interface ReactCommentProps {
  text: string;
  trim?: boolean;
}

const ReactComment: FC<ReactCommentProps> = ({ text, trim = true }) => {
  const createComment = () => {
    let commentText = text;
    if (trim) {
      commentText = commentText.trim();
    }
    return `<!-- ${commentText} -->`;
  };

  const el = findDOMNode(this);
  findDOMNode(el);
  el.outerHTML = createComment();

  return (
    <React.Fragment>
      {createComment()}
    </React.Fragment>
  );
};

export default ReactComment;