import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Theme} from '../../Styles/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../Styles/Font';
import {TouchableRipple} from 'react-native-paper';
Icon.loadFont();
const STYLES = ['default', 'dark-content', 'light-content'];

const Headers = ({title, style, canGoBack = false, titleLeft = false}) => {
  const heading = title;
  const navigation = useNavigation();
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);

  return (
    <View style={[styles.headerContainer, style]}>
      {/* <StatusBar
        animated={true}
        backgroundColor={Theme.White}
        barStyle={statusBarStyle}
      /> */}
      {canGoBack ? (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="arrow-back"
              size={20}
              color={Theme.PRIMARY_GREY}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          {titleLeft ? (
            <Text style={{...styles.headerText, marginLeft: 20}}>{title}</Text>
          ) : null}
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon
            name="menu"
            size={20}
            color="white"
            //   onPress={onPress}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      )}
      {titleLeft ? null : <Text style={styles.headerText}>{title}</Text>}
      <View style={styles.rightsideItems}>
        <TouchableOpacity
          style={styles.micButton}
          onPress={() => {
            // navigation.goBack();
          }}>
          <Ionicons
            name="ios-mic-sharp"
            size={20}
            color={Theme.PRIMARY_GREY}
            style={[styles.iconStyle]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dotsStyle}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name="md-ellipsis-horizontal-sharp"
            size={20}
            color={Theme.PRIMARY_GREY}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // width: '100%',
    height: 56,
    backgroundColor: Theme.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: Theme.LIGHT_GREY,
  },
  headerText: {
    color: Theme.PRIMARY_GREY,
    fontSize: 18,

    fontFamily: Fonts.SemiBold,
  },
  rightsideItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotsStyle: {
    marginLeft: 15,
    marginRight: 5,
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
  },
});

export default Headers;
