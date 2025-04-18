// components/YouTubePlayer.js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview'; // WebView for mobile platforms

const YouTubePlayer = ({ videoId }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe
          width="100%"
          height="315"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </View>
    );
  }

  return (
    <WebView
      style={styles.webview}
      javaScriptEnabled
      domStorageEnabled
      source={{ uri: embedUrl }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 800,
    height: 315,
    alignSelf: 'center',
    marginVertical: 20,
  },
  webview: {
    width: '100%',
    height: 315,
    marginVertical: 20,
  },
});

export { YouTubePlayer };