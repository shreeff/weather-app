import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      img: "img1",
      time: "",
    };
  }

  getHour = () => {
    var h = new Date().getHours();
    var m = new Date().getMinutes();
    this.setState({ time: h + " : " + m });
    switch (h) {
      case 0:
        this.setState({ img: "img6" });
        break;
      case 1:
        this.setState({ img: "img6" });
        break;
      case 2:
        this.setState({ img: "img6" });
        break;
      case 3:
        this.setState({ img: "img6" });
        break;
      case 4:
        this.setState({ img: "img6" });
        break;
      case 5:
        this.setState({ img: "img1" });
        break;
      case 6:
        this.setState({ img: "img1" });
        break;
      case 7:
        this.setState({ img: "img2" });
        break;
      case 8:
        this.setState({ img: "img2" });
        break;
      case 9:
        this.setState({ img: "img2" });
        break;
      case 10:
        this.setState({ img: "img3" });
        break;
      case 11:
        this.setState({ img: "img3" });
        break;
      case 12:
        this.setState({ img: "img3" });
        break;
      case 13:
        this.setState({ img: "img3" });
        break;
      case 14:
        this.setState({ img: "img3" });
        break;
      case 15:
        this.setState({ img: "img3" });
        break;
      case 16:
        this.setState({ img: "img4" });
        break;
      case 17:
        this.setState({ img: "img4" });
        break;
      case 18:
        this.setState({ img: "img4" });
        break;
      case 19:
        this.setState({ img: "img5" });
        break;
      case 20:
        this.setState({ img: "img5" });
        break;
      case 21:
        this.setState({ img: "img5" });
        break;
      case 22:
        this.setState({ img: "img6" });
        break;
      case 23:
        this.setState({ img: "img6" });
        break;
      default:
        this.setState({ img: "img1" });
        break;
    }
  };

  componentDidMount() {
    // this.timerID = setInterval(() => this.tick(), 1000);
    this.timerID = setInterval(() => this.getHour(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
    this.getHour();
  }

  render() {
    const timeImage = {
      img1: require("../assets/images/Morning Moon.jpg"),
      img2: require("../assets/images/Morning sun.jpg"),
      img3: require("../assets/images/Afternoon sun.jpg"),
      img4: require("../assets/images/evening sun.jfif"),
      img5: require("../assets/images/Night Moon.jpg"),
      img6: require("../assets/images/Mid-Night Moon.jpg"),
      img7: require("../assets/images/Morning sun.jpg"),
    };
    return (
      <View style={styles.timeImageContainer}>
        <View style={{ width: "50%", alignItems: "center" }}>
          <Text style={{ color: "black", fontSize: RFValue(30) }}>
            {this.state.time}
          </Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <Image source={timeImage[this.state.img]} style={styles.appIcon} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  timeImageContainer: { flex: 1, flexDirection: "row" },
  appIcon: {
    flex: 1,
    width: RFValue(100),
    height: RFValue(60),
    borderRadius: RFValue(30),
    // borderWidth: 2,
    resizeMode: "cover",
    // marginTop: 80,
    // marginLeft: 200,
    alignItems: "flex-end",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
});
