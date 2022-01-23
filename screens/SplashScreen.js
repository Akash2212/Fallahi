import React, { Component } from 'react';
import Splash from './Splash'
import MainScreen from './MainScreen'

export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            component: <Splash />
        };
    }




    componentDidMount() {
        this.timeoutHandle = setTimeout(() => {
            this.setState({ component: <MainScreen /> })
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }



    render() {
        return (
            this.state.component
        );
    }

}

