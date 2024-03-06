import React from 'react';
import YouTube from 'react-youtube';

function VideoEmbed() {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return <YouTube videoId="2Q_ZzBGPdqE" opts={opts} onReady={onReady} />;
}

export default VideoEmbed;
