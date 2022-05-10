import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import DailyForecast from "./screens/DailyForecast";
import PlaceForecast from "./screens/PlaceForecast";
import HomeScreen from "./screens/HomeScreen";
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
const switchNavigator = createSwitchNavigator({
  HomeScreen: { screen: HomeScreen },
  DailyForecast: { screen: DailyForecast },
  PlaceForecast: { screen: PlaceForecast },
});

const AppContainer = createAppContainer(switchNavigator);
