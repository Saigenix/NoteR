import React, { useState, useEffect, useRef } from 'react';
import {Dimensions,BackHandler, Platform,View} from 'react-native';
import { WebView } from 'react-native-webview';

const TaskChecker = () => {
  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);
  
      return () => {
         BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
      }
    }
  }, []);
  const HandleBackPressed = () => {
    if (webView.current.canGoBack) {
        webView.current.goBack();
        return true; // PREVENT DEFAULT BEHAVIOUR (EXITING THE APP)
    }
    return false;
}
    return (
      <View style={{flex:1,marginBottom:40}}>
      <WebView 
      ref={webView}
      startInLoadingState={true} 
      ignoreSslError={true} 
      containerStyle = {{ width: Dimensions.get('window').width, height: Dimensions.get('window').height}} 
      source={{ uri: 'https://saigenix.github.io/work-checker/'}}
      onNavigationStateChange={navState => {webView.current.canGoBack = navState.canGoBack}} />
    </View>
    );
}

export default TaskChecker;