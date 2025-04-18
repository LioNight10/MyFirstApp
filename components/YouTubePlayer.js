import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";

const YouTubePlayer = ({ videoId, height = 200, play = false, onChangeState }) => {
  if (!videoId) {
    console.error("YouTubePlayer: Missing videoId");
    return null;
  }

  return (
    <YoutubePlayer
      height={height}
      play={play}
      videoId={videoId}
      onChangeState={onChangeState}
    />
  );
};

export default YouTubePlayer;