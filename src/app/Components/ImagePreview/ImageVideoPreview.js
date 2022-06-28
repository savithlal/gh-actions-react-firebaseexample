import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../Styles/Theme';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
//show the video thumbnail preview when user stop the video section
//@author Charles
const ImageVideoPreview = ({
  isVisible = false,
  onClosePress,
  source,
  onPlayPress,
  onSavePress,
}) => {
  return (
    <Modal
      onBackButtonPress={onClosePress}
      onBackdropPress={onClosePress}
      animationIn="zoomIn"
      animationOut="zoomOut"
      isVisible={isVisible}
      style={{margin: 0}}>
      <View>
        <Image
          source={{uri: source}}
          style={{width: width, height: height}}
          resizeMode="contain"
        />
        <View style={styles.mainView}>
          <TouchableOpacity onPress={onClosePress} style={styles.sideView}>
            <Icon
              style={{opacity: 1}}
              name="close-outline"
              size={30}
              color={Theme.White}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPlayPress} style={styles.centerView}>
            <Icon
              style={{opacity: 1, paddingLeft: 2}}
              name="play"
              size={25}
              color={Theme.White}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSavePress} style={styles.sideView}>
            <Icon name="checkmark" size={30} color={Theme.White} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImageVideoPreview;
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  sideView: {
    backgroundColor: Theme.grey_2,
    width: 50,
    height: 50,
    borderRadius: 50,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerView: {
    backgroundColor: Theme.grey_1,
    width: 50,
    height: 50,
    borderRadius: 50,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Theme.White,
  },
});
