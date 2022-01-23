import React, { Component } from 'react';
import { Platform, View, Image, BackHandler } from 'react-native'
import { WebView } from 'react-native-webview'
import PushController from './PushController'

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
    }

    webView = {
        canGoBack: false,
        ref: null,
    }

    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
            this.webView.ref.goBack();
            return true;
        }
        return false;
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    source={{ uri: 'https://www.fallahi.shop' }}
                    style={{ marginTop: 20 }}
                    javaScriptEnabled={true}
                    scalesPageToFit={(Platform.OS === 'ios') ? false : true}
                    ref={(webView) => { this.webView.ref = webView; }}
                    onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                />
                <PushController />
            </View>
        );
    }
}