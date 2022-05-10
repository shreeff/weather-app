import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import { WiDaySunny, WiAlien } from "weather-icons-react";
import { RFValue } from "react-native-responsive-fontsize";
const apiKey = "LRoZJjwVyP5H0eTcGdtyNB2ElFXKeTGE";
const rootURL = "http://dataservice.accuweather.com";
const axios = require("axios");
const bgImage = require("../assets/images/Background Image.webp");

export default class PlaceForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      key: "",
      city: "",
      typedCity: "",
      // city: this.props.navigation.getParam("details")["city"],
      country: "IN",
      // country: this.props.navigation.getParam("details")["country"],
      // temp: this.props.navigation.getParam("details")["temp"],
      temp: "",
      dailyForecastData: "",
      hourlyForcastData: "",
    };
  }
  getWeather = () => {
    var url =
      rootURL +
      "/locations/v1/cities/search?apikey=" +
      apiKey +
      "&q=" +
      this.state.city;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        // const key = this.getKey(responseJson);
        let key = "";
        responseJson.map((item) => {
          if (item.Country.ID == this.state.country) {
            key = item.Key;
          }
        });
        console.log(key);
        this.getDailyForcast(key);
        this.getHourlyForcast(key);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getCityWeather = () => {
    var url =
      // "http://dataservice.accuweather.com/currentconditions/v1/7579_PC?apikey=LRoZJjwVyP5H0eTcGdtyNB2ElFXKeTGE";
      rootURL +
      "/locations/v1/cities/search?apikey=" +
      apiKey +
      "&q=" +
      this.state.city;
    console.log(this.state.city);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var countryJsonArray = this.getCountriesOfCity(responseJson);
        if (countryJsonArray.length != 0) {
          var key = countryJsonArray[0].cityKey;
          console.log(key);
          this.getDailyForcast(key);
          this.getHourlyForcast(key);
        }
        // let key = responseJson[0].Key;
        // console.log(key);
        // this.getDailyForcast(key);
        // this.getHourlyForcast(key);
        // }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getCityKey = (json) => {
    let key = json[0].Key;
  };
  getCountriesOfCity = (json) => {
    let countryJsonArray = [];
    let countryIdArray = [];
    json.map((item) => {
      let element = {};
      let cId = item.Country.ID;
      let cName = item.Country.EnglishName;
      let key = item.Key;
      element["countryName"] = item.Country.EnglishName;
      element["countryId"] = item.Country.ID;
      element["cityKey"] = item.Key;
      element["stateName"] = item.AdministrativeArea.EnglishName;

      console.log(element);
      console.log("else" + countryIdArray.length, item.Country.ID);
      console.log(countryIdArray.indexOf(item.Country.ID));
      if (countryJsonArray.length == 0) {
        countryJsonArray.push(element);
        countryIdArray.push(item.Country.ID);
      } else {
        console.log("else" + countryIdArray);
        // if (!countryIdArray.includes(item.Country.ID)) {
        if (countryIdArray.indexOf(item.Country.ID) === -1) {
          countryJsonArray.push(element);
          countryIdArray.push(item.Country.ID);
        } else {
          console.log("no");
        }
      }
    });
    console.log(countryJsonArray);
    return countryJsonArray;
  };
  getDailyForcast = (key) => {
    var url = rootURL + "/forecasts/v1/daily/5day/" + key + "?apikey=" + apiKey;
    console.log("url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.getFiveDayTempJson(responseJson.DailyForecasts);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getHourlyForcast = (key) => {
    var url =
      rootURL + "/forecasts/v1/hourly/12hour/" + key + "?apikey=" + apiKey;
    console.log("url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        // this.getFiveDayTempJson(responseJson.DailyForecasts);
        // console.log("hourly" + responseJson[0].DateTime);
        this.processHourlyJson(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  processHourlyJson = (json) => {
    let hArray = [];
    let i = 0;
    json.map((item) => {
      if (i < 6) {
        let hJson = {
          time: item.DateTime.slice(11, 16),
          temp: this.convertToCel(item.Temperature.Value),
        };
        hArray.push(hJson);
        i++;
        console.log(i);
      }
    });
    console.log(hArray);
    this.setState({ hourlyForcastData: hArray });
  };
  getFiveDayTempJson = (DailyForecasts) => {
    console.log(DailyForecasts);
    let wArray = [];
    DailyForecasts.map((item) => {
      let d = new Date(item.Date).getDay();
      let day = "Sunday";
      switch (d) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
        default:
          break;
      }
      let j = {
        Date: item.Date,
        day: day,
        temp:
          this.convertToCel(item.Temperature.Minimum.Value) +
          "/" +
          this.convertToCel(item.Temperature.Maximum.Value),
      };
      wArray.push(j);
    });
    console.log(wArray);
    this.setState({ dailyForecastData: wArray });
  };
  convertToCel = (Ftemp) => {
    return Math.round(((Ftemp - 32) * 5) / 9);
  };
  componentDidMount() {
    // this.getWeather();
    // this.getCityWeather();
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          {/* <WiDaySunny size={24} color="#000" />
          <WiAlien size={24} color="#000" /> */}
          <View style={styles.toContainer}>
            <TouchableOpacity
              style={styles.toStyles}
              onPress={() => {
                this.props.navigation.navigate("HomeScreen");
              }}
            >
              <Text style={styles.textStyles}>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerContainer}>
            <View style={styles.headingText}>
              <Text style={styles.textStyles}>City Forecast</Text>
            </View>
          </View>
          <View style={{ flex: 0.2, flexDirection: "row" }}>
            <TextInput
              style={styles.inputFont}
              onChangeText={(city) => this.setState({ city: city })}
              placeholder={"Type a City name"}
              placeholderTextColor="white"
            />
            <TouchableOpacity
              onPress={() => {
                this.getCityWeather();
              }}
            >
              <Text style={styles.textStyles}>Go</Text>
            </TouchableOpacity>
          </View>
          {this.state.city !== "" ? (
            // return(
            <View>
              <View style={styles.headingText}>
                <Text style={styles.textStyles}>
                  {this.state.city.toUpperCase()}
                </Text>
                <Text style={styles.textStyles}>{this.state.temp}</Text>
              </View>
              <View style={styles.hourlyContainer}>
                {this.state.hourlyForcastData !== "" ? (
                  this.state.hourlyForcastData.map((item) => (
                    <View style={styles.display}>
                      <Text style={styles.textStyles}>{item.time}</Text>
                      <Text style={styles.textStyles}>{item.temp}&deg;C</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.textStyles}>Loading..</Text>
                )}
              </View>
              <View style={styles.hourlyContainer}>
                {this.state.dailyForecastData !== "" ? (
                  this.state.dailyForecastData.map((item) => (
                    <View style={styles.display}>
                      <Text style={styles.textStyles}>{item.day}</Text>
                      <Text style={styles.textStyles}>{item.temp}&deg;C</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.textStyles}>Loading..</Text>
                )}
              </View>
            </View>
          ) : (
            <Text style={styles.textStyles}>Enter a city Name</Text>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flex: 0.1,
    flexDirection: "row",
    // borderWidth: 2,
    justifyContent: "center",
    alignContent: "center",
  },
  hourlyContainer: {
    width: RFValue("100%"),
    flex: 0.3,
    flexDirection: "row",
    // borderWidth: 2,
    margin: RFValue(10),
    padding: RFValue(10),
    justifyContent: "center",
    alignContent: "center",
  },
  display: {
    margin: RFValue(10),
    padding: RFValue(10),
  },
  toContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    // borderWidth: 2,
  },
  headingText: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  bgImage: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },

  toStyles: {
    borderRadius: RFValue(30),
    alignContent: "center",
  },
  inputFont: {
    height: RFValue(20),
    // borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },
  textStyles: { color: "black", fontSize: RFValue(15) },
});
