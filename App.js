import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import EnterEmail from "./screens/EnterEmail";
import MainScreen from "./screens/MainScreen";
import Splash from "./screens/Splash";

const SPLASH_SCREEN = "splashScreen";
const MAIN_SCREEN = "mainScreen";
const NAVIGATION_SCREEN = "navigation";

const Stack = createNativeStackNavigator();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToRender: SPLASH_SCREEN,
        };
        console.disableYellowBox = true;
    }

    componentDidMount() {
        this.timeoutHandle = setTimeout(() => {
            var user = auth().currentUser;

            if (user == null) {
                this.setState({
                    componentToRender: NAVIGATION_SCREEN,
                });

            } else {
                database()
                    .ref("Users/" + user.uid)
                    .once("value")
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            console.log("Exists");
                            this.setState({ componentToRender: MAIN_SCREEN });
                        } else {
                            console.log("Does not exists");
                            this.setState({
                                componentToRender: NAVIGATION_SCREEN,
                            });
                        }
                    });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }

    render() {
        const { componentToRender } = this.state;

        if (componentToRender === MAIN_SCREEN) {
            return <MainScreen />;
        }

        if (componentToRender === NAVIGATION_SCREEN) {
            return (
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="EnterEmail" component={EnterEmail} />
                        <Stack.Screen name="MainScreen" component={MainScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }

        return <Splash />;
    }
}
