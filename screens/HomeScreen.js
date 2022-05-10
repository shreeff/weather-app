import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Clock from "./Clock";

import { RFValue } from "react-native-responsive-fontsize";
const bgImage = require("../assets/images/Background Image.webp");
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      time: "",
      // img: require("../assets/images/moon at 8.jpg"),
      img: "img1",
      accuWeather: [],
      lat: "",
      long: "",
      place: "",
      weatherJson: {},
    };
  }
  getLocation = () => {
    if (navigator.geolocation) {
      console.log("this: " + navigator.geolocation.getCurrentPosition());
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  showPosition = (position) => {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
    this.getWeather();
  };
  getWeather = async () => {
    //change latitude and longitude
    const { lat, long } = this.state;
    var url =
      "https://fcc-weather-api.glitch.me/api/current?lat=21.17&lon=72.83";
    //   "https://fcc-weather-api.glitch.me/api/current?lat=" +
    //   lat +
    //   "&lon=" +
    //   long;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson: " + responseJson.name);
        let json = {
          city: responseJson.name,
          country: responseJson.sys.country,
          temp: responseJson.main.temp_min + "/" + responseJson.main.temp_max,
          humidity: responseJson.main.humidity,
          description: responseJson.weather[0].description,
        };
        this.setState({
          weather: responseJson,
          weatherJson: json,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
//   requestLocationPermission = async () => {
//     if (Platform.OS === "ios") {
//       // getOneTimeLocation();
//       // subscribeLocationLocation();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: "Location Access Required",
//             message: "This App needs to Access your location",
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           //To Check, If Permission is granted
//           // getOneTimeLocation();
//           // subscribeLocationLocation();
//           // this.getOneTimeLocation();
//           // this.subscribeLocationLocation();
//           console.log("granted");
//           // this.getLocation();
//         } else {
//           // setLocationStatus("Permission Denied");
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };

  componentDidMount() {
    // this.requestLocationPermission();
    // this.getLocation();
    this.getWeather();
  }

  render() {
    const { weather } = this.state;
    console.log("weather: " + weather);
    if (weather === "") {
      return (
        <View style={styles.container}>
          <ImageBackground source={bgImage} style={styles.bgImage}>
            <View style={{ flex: 0.5, margin: 50, justifyContent: "center" }}>
              <Text style={styles.textStyles}>
                Loading...
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground source={bgImage} style={styles.bgImage}>
            <View style={{ flex: 0.5, margin: RFValue(10) }}>
              <Text style={styles.textStyles}>
                {weather.name}
              </Text>
              <View style={{ flex: 0.5, margin: RFValue(10) }}>
                <Text style={styles.textStyles}>
                  {weather.main.temp_min + "/" + weather.main.temp_max}
                  &deg;C
                </Text>
                <Text
                style={[styles.textStyles,{ marginTop: RFValue(10)}]}
                >
                  humidity : {weather.main.humidity}
                </Text>
                <Text
                style={[styles.textStyles,{ marginTop: RFValue(10)}]}
                 
                >
                  {weather.weather[0].description}
                </Text>
              </View>
            </View>
            <View style={{ flex: 0.5 }}>
              <Clock />

              <View style={{ flex: 0.5, flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.toStyles}
                  onPress={() => {
                    console.log("weatherJson " + this.state.weatherJson.name);
                    this.props.navigation.navigate("DailyForecast", {
                      details: this.state.weatherJson,
                    });
                  }}
                >
             
                  <Text style={styles.textStyles}>
                    Daily Forecast
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toStyles}
                  onPress={() => {
                    this.props.navigation.navigate("PlaceForecast", {
                      details: this.state.weatherJson,
                    });
                  }}
                >
                  <Text style={styles.textStyles}>
                    Place Forecast
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  subContainer: {
    flex: 1,
    // borderWidth: 1,
    alignItems: "center",
  },
  title: {
    marginTop: RFValue(10),
    fontSize: RFValue(20),
    color: "#ffffff",
  },
  cloudImage: {
    width: RFValue(60),
    height: RFValue(60),
    marginTop: RFValue(20),
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    // marginTop: -150,
  },
  toStyles: {
    width: RFValue(150),
    height: RFValue(50),
    borderRadius: RFValue(20),
    backgroundColor: "white",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  textStyles:{
      color:"black",
      fontSize:RFValue(20),
  }
});
