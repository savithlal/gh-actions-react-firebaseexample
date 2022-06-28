import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import { Theme } from '../../Styles/Theme';
import {
  heightPercentageToDP,
  listenOrientationChange,
  removeOrientationListener
} from '../../Utilities/Responsiveness';

const { width } = Dimensions.get('window');
//this page show image header
//Author Charles
const ImageHeader = ({ route }) => {
  useEffect(() => {
    listenOrientationChange(this);

    return () => {
      removeOrientationListener();
    }
  }, [])

  return (
    <Image
      style={styles.image}
      source={{ uri: 'https://picsum.photos/seed/picsum/500/200' }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: deviceInfoModule.isTablet() ? heightPercentageToDP('20%') : heightPercentageToDP('17%'),
  },
});

export default ImageHeader;
