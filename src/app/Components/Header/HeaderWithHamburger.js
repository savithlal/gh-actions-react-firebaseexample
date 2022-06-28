import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Theme} from '../../Styles/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../Styles/Font';

Icon.loadFont();

/**
 * HeaderWithHamburger(): Returns header with hamburger icon
 * @param {*} title
 * @param {*} style
 * @param {*} textColor
 * @param {*} iconColor
 * @returns
 * @author Vivek PS
 */
const HeaderWithHamburger = ({title, style, textColor, iconColor}) => {
  const navigation = useNavigation();
  const imageUrl = require('../../Assets/Images/logoWhite.png');

  return (
    <View style={[styles.headerContainer, style]}>
      <TouchableOpacity
        style={styles.hamburgerButton}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Icon name="menu" size={30} color={iconColor || 'white'} />
      </TouchableOpacity>

      {title ? (
        <View style={styles.textContainer}>
          <Text style={[styles.headerText, {color: textColor || 'white'}]}>
            {title}
          </Text>
        </View>
      ) : (
        <Image source={imageUrl} style={styles.image} resizeMode="contain" />
      )}

      <TouchableOpacity
        style={styles.chatIcon}
        Î
        onPress={() => {
          navigation.navigate('chat');
        }}>
        <Icon name="chat" size={28} color={iconColor || 'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: Platform.OS === 'ios' ? 44 : 56,
    backgroundColor: Theme.White,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: Theme.LIGHT_GREY,
  },
  headerText: {
    color: Theme.White,
    fontSize: 18,
    fontFamily: Fonts.Bold,
  },
  hamburgerButton: {
    position: 'absolute',
    left: 15,
    top: 5,
  },
  chatIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  image: {
    width: 150,
    alignSelf: 'center',
  },
});

export default HeaderWithHamburger;
