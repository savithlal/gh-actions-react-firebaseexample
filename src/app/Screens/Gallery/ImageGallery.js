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
import {postImageVideoLineItemClear} from '../../Redux/Actions/LineItem';
import ImageModalView from '../../Components/ImagePreview/ImageModalView';
const ImageGallery = ({route}) => {
  const [getData, setGetData] = useState([
    {
      url: 'https://pt-nextgen.s3.amazonaws.com/images/VabXxIXlanufhrBM1riJOkRdla73dLe5CC5inKTN.jpg',
      id: 5,
    },
  ]);
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
    const userRef = database().ref('/storeData/images');
    const OnLoadingListener = userRef.on('value', snapshot => {
      setGetData(snapshot.val());
    });

    return () => {
      userRef.off('value', OnLoadingListener);
    };
  }, []);

  const addImageToDb = url => {
    var id = 0;
    if (getData !== null) {
      id = getData.length;
    }
    // let id = 4;
    // console.log('length' + getData);
    // console.log('getData' + JSON.stringify(getData));
    // console.log('url' + JSON.stringify(url));
    database()
      .ref('/storeData/images/' + id)
      .set({
        id: id,
        url: url.image_url[0],
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
    if (lineReducer.postImageVideoRes) {
      let url = idx(lineReducer, _ => _.postImageVideoRes.data);
      addImageToDb(url);
      dispatch(postImageVideoLineItemClear());
    }
  }, [lineReducer.postImageVideoRes]);

  const RenderLineItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.flatLIstItemContainer}
        onPress={() => callImage(item)}>
        <Image
          style={styles.imageUpload}
          source={{
            uri: item.url,
          }}
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
      <Headers title={'Image Gallery'} canGoBack={true} />
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
      <ImageModalView
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
  },
});

export default ImageGallery;
