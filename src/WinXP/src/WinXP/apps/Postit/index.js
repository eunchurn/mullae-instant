import React from "react";
import Postit from '../../../components/Postit/index';

// add child div to capture mouse event when not focused

function Post({ onClose, isFocus }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Postit />
      {!isFocus && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
      )}
    </div>
  );
}

export default Post;
