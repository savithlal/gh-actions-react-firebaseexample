import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../Styles/Theme';
import VideoPlayer from 'react-native-video-player';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
//show the video preview
//@author: Charles
const VideoPreview = ({isVisible = false, onClosePress, source}) => {
  return (
    <Modal
      onBackButtonPress={onClosePress}
      onBackdropPress={onClosePress}
      animationIn="zoomIn"
      animationOut="zoomOut"
      isVisible={isVisible}
      style={{margin: 0}}>
      <SafeAreaView style={styles.centeredView}>
        <VideoPlayer
          video={{
            uri: source,
            cache: true,
          }}
          // resizeMode="contain"
          videoWidth={width}
          videoHeight={height}
          autoplay={true}
          thumbnail={{uri: 'https://picsum.photos/200/300'}}
          showDuration={true}
        />
        <TouchableOpacity onPress={onClosePress} style={styles.centerView}>
          <Icon
            style={{opacity: 1}}
            name="close-outline"
            size={25}
            color={Theme.White}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default VideoPreview;
const styles = StyleSheet.create({
  centeredView: {},
  centerView: {
    backgroundColor: Theme.grey_1,
    width: 30,
    height: 30,
    borderRadius: 30,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Theme.White,
    position: 'absolute',
    right: 20,
    top: 50,
  },
});
