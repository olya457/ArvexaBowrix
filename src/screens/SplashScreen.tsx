import React, {useEffect, useRef, useState} from 'react';
import {Animated, ImageBackground, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {appAssets} from '../assets';

const loaderMarkup = `
<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box}
html,body{margin:0;background:transparent;overflow:hidden;height:100%}
.wrap{height:100%;display:flex;align-items:flex-end;justify-content:center;padding-bottom:58px}
.dots{display:flex;gap:7px;transform:rotate(48deg)}
i{width:7px;height:7px;border-radius:50%;background:#46adf2;display:block;animation:pulse 1s infinite ease-in-out}
i:nth-child(2){animation-delay:.15s}
i:nth-child(3){animation-delay:.3s}
i:nth-child(4){animation-delay:.45s}
i:nth-child(5){animation-delay:.6s}
@keyframes pulse{0%,100%{opacity:.2;transform:scale(.75)}50%{opacity:1;transform:scale(1.25)}}
</style>
</head>
<body><div class="wrap"><div class="dots"><i></i><i></i><i></i><i></i><i></i></div></div></body>
</html>`;

export function SplashScreen({onComplete}: {onComplete: () => void}) {
  const [showLogo, setShowLogo] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setShowLogo(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }, 2400);
    const completeTimer = setTimeout(onComplete, 4400);

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, opacity]);

  return (
    <ImageBackground
      source={appAssets.splashBackground}
      style={styles.screen}
      resizeMode="cover">
      {!showLogo ? (
        <WebView
          source={{html: loaderMarkup}}
          style={styles.webView}
          scrollEnabled={false}
          originWhitelist={['*']}
          androidLayerType="software"
        />
      ) : (
        <Animated.Image
          source={appAssets.logo}
          style={[styles.logo, {opacity}]}
          resizeMode="contain"
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  webView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  logo: {width: '72%', height: 180},
});
