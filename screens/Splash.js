import React, { Component } from "react";
import { Image, View } from "react-native";

export default class Splash extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#20292b",
        }}
      >
        <Image
          source={require("../Images/logo.png")}
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }
}
