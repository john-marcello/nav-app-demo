import React from "react";
import YouTube from "react-youtube";

// renders the video embed
function VideoEmbed() {
    const opts = {
        playerVars: {
            autoplay: 0,
        },
    };

    const onReady = (event) => {
        event.target.pauseVideo();
    };

    return <YouTube videoId='2Q_ZzBGPdqE' opts={opts} onReady={onReady} />;
}

export default VideoEmbed;
