import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
} from 'react-native';
import {Theme} from '../../Styles/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Headers from '../../Components/Header/Headers';
import {checkCameraPermissions} from '../../Utilities/Permissions';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import idx from 'idx';
import {postVideoLineItemClear} from '../../Redux/Actions/LineItem';
import ImageModalView from '../../Components/ImagePreview/ImageModalView';
import VideoPreview from '../../Components/VideoPreview/VideoPreview';
const VideoGallery = ({route}) => {
  const [getData, setGetData] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [imgPreview, setImgPreview] = useState(false);
  const navigation = useNavigation();
  const lineReducer = useSelector(state => state.lineItemReducer);
  const dispatch = useDispatch();
  const callImage = item => {
    setImageUrl(item.url);
    setImgPreview(true);
  };
  useEffect(() => {
    const userRef = database().ref('/storeData/videos');
    const OnLoadingListener = userRef.on('value', snapshot => {
      setGetData(snapshot.val());
      console.log('get value11' + JSON.stringify(getData));
    });

    return () => {
      userRef.off('value', OnLoadingListener);
    };
  }, []);

  const addImageToDb = url => {
    var id = 0;
    if (getData !== null) {
      console.log('getData.length' + getData.length);
      id = getData.length;
    }

    // let id = 4;
    // console.log('length' + getData);
    // console.log('getData' + JSON.stringify(getData));
    // console.log('url' + JSON.stringify(url));
    database()
      .ref('/storeData/videos/' + id)
      .set({
        id: id,
        url: url.video_url[0],
        thumbnails: url.thumbnail_url[0],
      })
      .then(() => console.log('Data set.'));

    // const newReference = database().ref('/storeData/images/').push();
    // newReference
    //   .set({
    //     id: newReference.key,
    //     url: url.image_url[0],
    //   })
    //   .then(() => console.log('Data updated.'));
  };

  useEffect(() => {
    if (lineReducer.postVideoRes) {
      let url = idx(lineReducer, _ => _.postVideoRes.data);
      addImageToDb(url);
      dispatch(postVideoLineItemClear());
    }
  }, [lineReducer.postVideoRes]);

  const RenderLineItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.flatLIstItemContainer}
        onPress={() => callImage(item)}>
        {/* <View style={styles.imageUpload}>
          <IonIcon
            name="play"
            size={29}
            color={Theme.grey_2}
            style={styles.iconStyle}
          />
        </View> */}

        <Image
          style={styles.imageUpload}
          source={{
            uri: item.thumbnails,
          }}
        />
        <IonIcon
          name="play"
          size={29}
          color={Theme.grey_2}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    );
  };
  const openCameraScreen = lineItemName => {
    checkCameraPermissions()
      .then(result => {
        navigation.navigate('camera', {
          lineItemName: lineItemName,
        });
      })
      .catch(error => {});
  };
  const openVideoScreen = lineItemName => {
    checkCameraPermissions()
      .then(result => {
        navigation.navigate('VideoRecorder');
      })
      .catch(error => {});
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Headers title={'Video Gallery'} canGoBack={true} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 10,
        }}>
        <TouchableOpacity onPress={() => openCameraScreen()}>
          <Text>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openVideoScreen()}>
          <Text>Take Video</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getData}
        renderItem={(item, index) => RenderLineItem(item, index)}
        showsVerticalScrollIndicator={true}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />

      <VideoPreview
        isVisible={imgPreview}
        onClosePress={() => setImgPreview(false)}
        source={imageUrl}
        title={'Preview'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Theme.White,
  },

  flatLIstItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUpload: {
    width: 80,
    height: 80,
    margin: 10,
    borderColor: Theme.GREY,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    position: 'absolute',
  },
});

export default VideoGallery;
