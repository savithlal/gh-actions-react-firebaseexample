import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {
  getWeather,
  dailyForecast,
  showWeather,
  getLocation,
} from 'react-native-weather-api';
import {WEATHER_API_KEY} from '../../../Api/ApiConfig';
import Row from '../../../Components/Row';
import dateFormat, {masks} from 'dateformat';
import {Fonts} from '../../../Styles/Font';
import {Theme} from '../../../Styles/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import deviceInfoModule from 'react-native-device-info';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(10);

  useEffect(() => {
    getWeatherInfo();
  }, []);

  const getWeatherInfo = () => {
    getLocation()
      .then(location => {
        getWeather({
          key: WEATHER_API_KEY,
          lat: location.coords.latitude,
          lon: location.coords.longitude,
          // lat: '10.8505',
          // lon: '76.2711',
          unit: 'metric',
        })
          .then(res => {
            var data = new showWeather();

            setWeatherData(data);
          })
          .catch(error => {
            console.log('----------- getWeather error ', error);
          });
      })
      .catch(error => {
        setWeatherData(error);
      });
  };

  const getFormatedDate = () => {
    let formatedDate = dateFormat(new Date(), 'dddd, mmmm dS');
    return formatedDate;
  };

  return (
    <Row rowStyle={styles.rowStyle}>
      {weatherData.message ? (
        <Row rowStyle={styles.errorMessageContainer}>
          <MaterialIcon
            name="location-disabled"
            size={26}
            style={styles.locationIcon}
            color={Theme.PRIMARY_GREY}
          />
          <Text style={styles.errorText}>
            Location information not available
          </Text>
        </Row>
      ) : (
        <Row>
          <Row>
            <Text style={styles.temperature}>
              {Math.round(weatherData?.temp)}
            </Text>
            <Icon name="circle-o" size={14} style={styles.degreeSuperscript} />
          </Row>
          <View style={styles.dateColumn}>
            <Text style={styles.date}>{getFormatedDate()}</Text>
            <Text style={[styles.date, styles.description]}>
              {weatherData.description}
            </Text>
          </View>
        </Row>
      )}
      {/* <Image style={styles.image} source={{ uri: weatherData?.icon }} /> */}
    </Row>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 50,
    height: 70,
    backgroundColor: Theme.White,
    borderColor: Theme.GREY_LIGHT,
    borderWidth: 1,
    elevation: 2,
    borderRadius: 4,
    // margin: 14,
    shadowColor: Theme.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    ...(deviceInfoModule.isTablet()
      ? {
          width: '90%',
          alignSelf: 'center',
        }
      : {}),
  },
  temperature: {
    fontFamily: Fonts.SemiBold,
    fontSize: 45,
    color: Theme.DARKEST_GREY,
  },
  degreeSuperscript: {
    position: 'absolute',
    top: 10,
    right: -15,
  },
  date: {
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    color: Theme.DARKEST_GREY,
    lineHeight: 23,
  },
  description: {
    fontFamily: Fonts.Regular,
  },
  dateColumn: {
    marginLeft: 30,
  },
  image: {
    width: 62,
    height: 62,
    resizeMode: 'contain',
    backgroundColor: 'yellow',
  },
  errorMessageContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    color: Theme.PRIMARY_GREY,
    textAlign: 'center',
  },
  locationIcon: {
    marginRight: 10,
  },
});

export default WeatherWidget;
