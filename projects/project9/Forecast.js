import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

class Forecast extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>{this.props.city}, {this.props.country}</Text>
        <Image source={{ uri: `https://openweathermap.org/img/w/${this.props.icon}.png` }} style={styles.weatherIcon} />
        <Text style={styles.bigText}>{this.props.main}</Text>
        <Text style={styles.mainText}>Current Conditions: {this.props.description}</Text>
        <Text style={styles.bigText}>{this.props.temp}°F</Text>
        <Text style={styles.mainText}>Feels Like: {this.props.feels_like}°F</Text>
        <Text style={styles.mainText}>Min: {this.props.temp_min}°F | Max: {this.props.temp_max}°F</Text>
        <Text style={styles.mainText}>Humidity: {this.props.humidity}%</Text>
        <Text style={styles.mainText}>Wind: {this.props.wind_speed} mph, {this.props.wind_deg}°</Text>
        <Text style={styles.mainText}>Pressure: {this.props.pressure} hPa</Text>
        <Text style={styles.mainText}>Visibility: {this.props.visibility} meters</Text>
        <Text style={styles.mainText}>Sunrise: {this.props.sunrise}</Text>
        <Text style={styles.mainText}>Sunset: {this.props.sunset}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { height: 300, alignItems: "flex-start", paddingLeft: 20 },
  bigText: { fontSize: 20, textAlign: "left", color: "#FFFFFF" },
  mainText: { fontSize: 16, textAlign: "left", color: "#FFFFFF" },
  weatherIcon: { width: 50, height: 50 }
});

export default Forecast;
