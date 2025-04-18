import React from 'react';
import { Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';

const YouTubePlayer = ({ videoId }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  if (Platform.OS === 'web') {
    return (
      <View style={{ width: '100%', height: 315 }}>
        <iframe
          width="100%"
          height="315"
          src={embedUrl}
          frameborder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </View>
    );
  }

  return (
    <WebView
      style={{ width: '100%', height: 315 }}
      javaScriptEnabled
      domStorageEnabled
      source={{ uri: embedUrl }}
    />
  );
};

export default YouTubePlayer;
