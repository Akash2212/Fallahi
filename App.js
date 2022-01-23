import React, { Component } from 'react';
import Splash from './screens/Splash'
import MainScreen from './screens/MainScreen'
import EnterEmail from './screens/EnterEmail'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'

const Stack = createNativeStackNavigator();


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            component: <Splash />,
        };
        console.disableYellowBox = true
    }


    componentDidMount() {
        this.timeoutHandle = setTimeout(() => {

            var user = auth().currentUser

            if (user == null) {
                auth()
                    .signInAnonymously()
                    .then(() => {
                        console.log('User signed in anonymously');
                        var current = auth().currentUser
                        database().ref('Users/' + current.uid)
                            .once('value')
                            .then(snapshot => {
                                if (snapshot.exists()) {
                                    console.log('Exists')
                                    this.setState({ component: <MainScreen /> })
                                }
                                else {
                                    console.log("Does not exists")
                                    this.setState({
                                        component:
                                            <NavigationContainer>
                                                <Stack.Navigator screenOptions={{ headerShown: false }}  >
                                                    <Stack.Screen name="EnterEmail" component={EnterEmail} />
                                                    <Stack.Screen name="MainScreen" component={MainScreen} /></Stack.Navigator>
                                            </NavigationContainer>
                                    })
                                }
                            })

                    })
                    .catch(error => {
                        if (error.code === 'auth/operation-not-allowed') {
                            console.log('Enable anonymous in your firebase console.');
                        }

                        console.error(error);
                    });
            }
            else {
                database().ref('Users/' + user.uid)
                    .once('value')
                    .then(snapshot => {
                        if (snapshot.exists()) {
                            console.log('Exists')
                            this.setState({ component: <MainScreen /> })
                        }
                        else {
                            console.log("Does not exists")
                            this.setState({
                                component:
                                    <NavigationContainer>
                                        <Stack.Navigator screenOptions={{ headerShown: false }}  >
                                            <Stack.Screen name="EnterEmail" component={EnterEmail} />
                                            <Stack.Screen name="MainScreen" component={MainScreen} /></Stack.Navigator>
                                    </NavigationContainer>
                            })
                        }
                    })
            }


        }, 1000);


    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }



    render() {
        return (this.state.component)

    }
}
