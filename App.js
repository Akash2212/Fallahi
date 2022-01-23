import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Component } from "react";
import EnterEmail from "./screens/EnterEmail";
import MainScreen from "./screens/MainScreen";
import Splash from "./screens/Splash";

const Stack = createNativeStackNavigator();

const SPLASH_SCREEN = "splashScreen";
const MAIN_SCREEN = "mainScreen";
const NAVIGATION_SCREEN = "navigation";

const getComponentToRender = async (userId) => {
  const snapshot = await database().ref(`Users/${userId}`).once("value");

  if (snapshot.exists()) {
    console.log("Exists");
    return MAIN_SCREEN;
  }

  console.log("Does not exists");
  return NAVIGATION_SCREEN;
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentToRender: SPLASH_SCREEN,
    };
    console.disableYellowBox = true;
  }

  async componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      let user = auth().currentUser;

      if (user == null) {
        try {
          user = await auth().signInAnonymously();
        } catch (error) {
          if (error.code === "auth/operation-not-allowed") {
            console.log("Enable anonymous in your firebase console.");
          }

          console.error(error);
          return;
        }
      }

      const componentToRender = getComponentToRender(user);
      this.setState({ componentToRender });
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
