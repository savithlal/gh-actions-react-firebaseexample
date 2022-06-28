import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  Linking,
  TouchableOpacity,
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
import {postVideoLineItem} from '../../Redux/Actions/LineItem';
import idx from 'idx';
import API from '../../Redux/Config/URL';
import axios from 'axios';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Blink from '../../Components/Blink/Index';
import useStopwatch from '../../Components/Timer/useStopwatch';
import VideoPreview from '../../Components/VideoPreview/VideoPreview';
import {createThumbnail} from 'react-native-create-thumbnail';
import ImageVideoPreview from '../../Components/ImagePreview/ImageVideoPreview';
const VideoRecorder = props => {
  const camera = useRef(Camera);
  const devices = useCameraDevices();

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [saveImage, setSaveImage] = useState([]);
  const LineItemReducer = useSelector(state => state.lineItemReducer);
  const [state, setState] = useState({
    flashToggle: false,
    alertVisibility: false,
  });
  const [startRecording, setStartRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [VideoPreviewShow, setVideoPreviewShow] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imgPreview, setImgPreview] = useState(false);
  const [flashMode, setFlashMode] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(false);
  const postVideoLineItemApi = params => dispatch(postVideoLineItem(params));
  const {seconds, minutes, hours, days, isRunning, start, pause, reset} =
    useStopwatch({autoStart: false});
  /**
   * captureImage(): Captures image using the camera and save to redux state
   */

  const device = cameraPosition ? devices.front : devices.back;

  const fnStartRecording = async () => {
    start();
    setStartRecording(true);

    camera.current.startRecording({
      flash: flashMode ? 'on' : 'off',
      onRecordingFinished: video => setVideoUrl(video.path),
      onRecordingError: error => console.error(error),
    });
  };

  useEffect(() => {
    if (videoUrl) {
      createThumbnail({
        url: videoUrl,
        timeStamp: 10000,
      })
        .then(response => {
          setImageUrl(response.path);
          setImgPreview(true);
        })
        .catch(err => console.log({err}));
    }
  }, [videoUrl]);

  const stopRecording = async () => {
    reset();
    setStartRecording(false);
    await camera.current.stopRecording();
    // clearInterval(timer);
  };

  useEffect(() => {
    console.log(saveImage);
  }, [saveImage]);

  useEffect(() => {
    if (LineItemReducer.postVideoRes) {
      let data = idx(LineItemReducer, _ => _.postVideoRes);

      console.log('data' + JSON.stringify(data));
      if (data) {
      } else {
      }
    }
  }, [LineItemReducer.postVideoRes]);
  /**
   * avePicture(): Saves captured image to device gallery
   * @param {*} tag
   * @param {*} album
   */

  /**
   * toggleFlash(): Toggles camera flash ON/OFF
   */

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
              console.log('--------- cancel');
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
              console.log('--------- OK');
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

  const triggerPlayButton = () => {
    setVideoPreviewShow(true);
  };
  const closeButton = async () => {
    props.navigation.goBack();
  };

  const onSavePress = async () => {
    console.log('haaaiiii');
    //
    // const data = new FormData();
    // data.append('image[0]', {
    //   uri: saveImage,
    //   name: 'latesss',
    //   type: 'image/jpeg',
    // });

    // console.log('formData' + JSON.stringify(data));
    // // let params = {image: saveImage};
    // //  postImageVideoLineItemApi(data);

    // //Check if any file is selected or not

    // //If file selected then create FormData

    console.log(imageUrl);
    const data = new FormData();
    data.append('video[0]', {
      uri: videoUrl,
      name: 'video111',
      type: 'video/mp4',
    });
    data.append('video_thumbnail[0]', {
      uri: imageUrl,
      name: 'video_thumbnail',
      type: 'image/jpeg',
    });
    let res = await fetch(API.BASE_URL + API.IMAGE_VIDEO, {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    });
    console.log('res' + res);
    let responseJson = await res.json();

    postVideoLineItemApi(responseJson);

    props.navigation.goBack();
  };

  const createThumbnails = () => {
    createThumbnail({
      url: videoUrl,
      timeStamp: 10000,
    })
      .then(response => setImageUrl(response.path))
      .catch(err => console.log({err}));
  };

  const checkCAmera = () => {
    setCameraPosition(!cameraPosition);
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
            photo={false}
            video={true}
            audio={true}
            preset="medium"
          />
        ) : null}
        <View style={styles.blinkView}>
          {startRecording ? (
            <View style={{flexDirection: 'row', top: 20, left: 50}}>
              <Blink duration={500}>
                <View style={styles.blink} />
              </Blink>
              <Text
                style={{
                  color: Theme.White,
                  marginTop: 8,
                }}>
                {minutes}:{seconds}
              </Text>
            </View>
          ) : null}
          <IconButton
            icon={'close'}
            size={36}
            color="white"
            style={styles.closeButton}
            onPress={() => closeButton()}
          />
        </View>

        <View style={styles.buttonRow}>
          {/* <IconButton
            icon="flash"
            size={36}
            color={state.flashToggle ? 'yellow' : 'white'}
            style={styles.flashButton}
            onPress={() => {
              toggleFlash();
            }}
          /> */}
          {startRecording ? (
            <View style={{marginTop: 22}}>
              <IonIcon
                name="flash-outline"
                size={29}
                color={Theme.grey_2}
                style={styles.iconStyle}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={{marginTop: 22}}
              onPress={() => setFlashMode(!flashMode)}>
              <IonIcon
                name="ios-flash"
                size={29}
                color={flashMode ? Theme.yellow : Theme.GREY_LIGHT}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          )}
          {startRecording ? (
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                borderRadius: 60,
                // backgroundColor: Theme.PRIMARY_COLOR,
                borderColor: Theme.White,
                borderWidth: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => stopRecording()}>
              <IonIcon
                name="stop"
                size={28}
                color={Theme.PRIMARY_COLOR}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => fnStartRecording()}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 60,
                  backgroundColor: Theme.PRIMARY_COLOR,
                  borderColor: Theme.White,
                  borderWidth: 5,
                }}></View>

              {/* <IconButton
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
          /> */}
            </TouchableOpacity>
          )}

          {startRecording ? (
            <View style={{marginTop: 25}}>
              <IonIcon
                name="camera-reverse-outline"
                size={29}
                color={Theme.grey_2}
                style={styles.iconStyle}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={{marginTop: 25}}
              onPress={() => checkCAmera()}>
              <IonIcon
                name="camera-reverse-sharp"
                size={29}
                color={Theme.White}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <MediaPermissionAlert />
      <VideoPreview
        isVisible={VideoPreviewShow}
        onClosePress={() => setVideoPreviewShow(false)}
        source={videoUrl}
        title={'Preview'}
      />
      <ImageVideoPreview
        isVisible={imgPreview}
        onClosePress={() => setImgPreview(false)}
        source={imageUrl}
        onPlayPress={() => triggerPlayButton()}
        onSavePress={() => onSavePress()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    //flexDirection: 'column',
  },
  buttonRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    //  alignContent: 'space-around',
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
  blink: {
    width: 15,
    height: 15,
    borderRadius: 10,
    // position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Theme.failure,
  },
  blinkView: {
    flexDirection: 'row',
    top: 0,
    position: 'absolute',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default VideoRecorder;
