import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  Linking,
} from 'react-native';
import {ActivityIndicator, IconButton, TextInput} from 'react-native-paper';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {connect, useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import CameraRoll, {save} from '@react-native-community/cameraroll';
import {checkAndroidStoragePermission} from '../../Utilities/Permissions';
import Dialog from 'react-native-dialog';
import {addImagesToLineItem} from '../../Redux/Actions/LineItemReducerActions';
import {Theme} from '../../Styles/Theme';

const CameraScreen = props => {
  const camera = useRef(Camera);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [saveImage, setSaveImage] = useState([]);
  const [state, setState] = useState({
    flashToggle: false,
    alertVisibility: false,
    lineItem: props?.route?.params?.lineItemName || null,
    imageCaptureAnimation: false,
    lineItems: useSelector(state => state.LineItemReducer.lineItems),
  });

  /**
   * captureImage(): Captures image using the camera and save to redux state
   */
  const captureImage = async () => {
    setState({
      ...state,
      imageCaptureAnimation: true,
    });
    const photo = await camera.current.takePhoto({
      flash: state.flashToggle ? 'on' : 'off',
    });
    photo['uri'] = 'file://' + photo.path;
    dispatch(addImagesToLineItem({lineItem: state.lineItem, photo: photo}));
    savePicture(photo.path);
    setSaveImage([...saveImage, photo.uri]);
    setTimeout(() => {
      setState({
        ...state,
        imageCaptureAnimation: false,
      });
    }, 1000);
  };

  /**
   * avePicture(): Saves captured image to device gallery
   * @param {*} tag
   * @param {*} album
   */
  const savePicture = async (tag, album) => {
    if (Platform.OS === 'android') {
      checkAndroidStoragePermission()
        .then(result => {
          setState({
            ...state,
            alertVisibility: false,
          });
          try {
            CameraRoll.save(tag, {album});
          } catch (error) {
            console.log(
              '------------------ saving image to android gallery error ',
              error,
            );
          }
        })
        .catch(error => {
          setState({
            ...state,
            alertVisibility: true,
          });
          return;
        });
    } else {
      try {
        setState({
          ...state,
          alertVisibility: false,
        });
        CameraRoll.save(tag, {album});
      } catch (error) {
        console.log(
          '------------------ aving image to iOS gallery error ',
          error,
        );
      }
    }
  };

  /**
   * toggleFlash(): Toggles camera flash ON/OFF
   */
  const toggleFlash = async () => {
    setState({
      ...state,
      flashToggle: !state.flashToggle,
    });
  };

  /**
   * MediaPermissionAlert(): Alert shown when media permission is not grantes
   * @returns
   */
  const MediaPermissionAlert = () => {
    const alertDescription =
      Platform.OS === 'ios'
        ? 'Please allow media permission to save captured images to camera roll.'
        : 'Please allow media permission to save captured images to photos.';
    return (
      <View>
        <Dialog.Container useNativeDriver visible={state.alertVisibility}>
          <Dialog.Title>Media permission denied</Dialog.Title>
          <Dialog.Description>{alertDescription}</Dialog.Description>
          <Dialog.Button
            label="Grant permission"
            onPress={() => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            }}
          />
          <Dialog.Button
            label="OK"
            onPress={() => {
              setState({
                ...state,
                alertVisibility: false,
              });
            }}
          />
        </Dialog.Container>
      </View>
    );
  };

  // Returns main UI
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.mainView}>
        {device && isFocused ? (
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
        ) : null}
        <IconButton
          icon={'close'}
          size={36}
          color="white"
          style={styles.closeButton}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <View style={styles.buttonRow}>
          <IconButton
            icon="flash"
            size={36}
            color={state.flashToggle ? 'yellow' : 'white'}
            style={styles.flashButton}
            onPress={() => {
              toggleFlash();
            }}
          />
          <View>
            <IconButton
              disabled={state.imageCaptureAnimation}
              icon="camera"
              color="white"
              size={36}
              style={[
                styles.cameraButton,
                state.imageCaptureAnimation
                  ? {backgroundColor: 'silver'}
                  : null,
              ]}
              onPress={() => {
                captureImage();
              }}
            />
          </View>
          <View>
            <IconButton
              icon={
                state.lineItems[state.lineItem].capturedImages.length > 0
                  ? 'image'
                  : 'brightness-1'
              }
              disabled={
                state.lineItems[state.lineItem].capturedImages.length > 0
                  ? false
                  : true
              }
              size={36}
              color="white"
              style={styles.flashButton}
              onPress={() => {
                props.navigation.navigate('gallery', {
                  lineItemName: state.lineItem,
                });
              }}
            />
            {state.lineItems[state.lineItem].capturedImages.length > 0 ? (
              <Text style={styles.imageCountBadge}>
                {state.lineItems[state.lineItem].capturedImages.length}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <MediaPermissionAlert />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    flexDirection: 'row',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignContent: 'space-around',
    justifyContent: 'space-around',
  },
  cameraButton: {
    backgroundColor: Theme.PRIMARY_COLOR,
    height: 75,
    width: 75,
    borderRadius: 50,
  },
  flashButton: {
    height: 75,
    width: 75,
    borderRadius: 50,
  },
  closeButton: {
    height: 75,
    width: 75,
    borderRadius: 50,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  imageCountBadge: {
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    left: 60,
    top: 10,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'grey',
  },
});

export default CameraScreen;
