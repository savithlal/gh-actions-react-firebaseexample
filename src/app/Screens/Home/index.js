import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
} from 'react-native';
import {checkCameraPermissions} from '../../Utilities/Permissions';
import Dialog from 'react-native-dialog';
import {connect, useSelector, useDispatch} from 'react-redux';
import {IconButton} from 'react-native-paper';
import {clearDB} from '../../Utilities/AsyncUtils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getLineItem} from '../../Redux/Actions/LineItem';
import OrderData from '../../Assets/OrdersData.json';
import OrderDataNew from '../../Assets/OrdersData1.json';
import database from '@react-native-firebase/database';
import idx from 'idx';
import {Theme} from '../../Styles/Theme';
import {
  PESDK,
  PhotoEditorModal,
  Configuration,
  TintMode,
  AdjustmentTool,
} from 'react-native-photoeditorsdk';
import {VESDK, VideoEditorModal} from 'react-native-videoeditorsdk';
import InspectionCard from '../../Components/Inspection/InspectionCard';
import {
  changeStatusBarColor,
  changeStatusBarStyle,
} from '../../Redux/Actions/SharedReducerActions';
import HeaderWithHamburger from '../../Components/Header/HeaderWithHamburger';
import {logoutUser} from '../../Redux/Actions/Auth';
import moment from 'moment';

const HomeScreen = props => {
  // PESDK.unlockWithLicense(require('./pesdk_license'));
  // VESDK.unlockWithLicense(require('./vesdk_license'));
  const [state, setState] = useState({
    lineItems: useSelector(state => state.LineItemReducer.lineItems),
    alertVisibility: false,
    image: null,
  });
  const authReducer = useSelector(state => state.AuthReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lineReducer = useSelector(state => state.LineItemReducer);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(changeStatusBarColor(Theme.PRIMARY_GREEN));
      dispatch(changeStatusBarStyle('light-content'));

      return () => {
        dispatch(changeStatusBarColor('white'));
        dispatch(changeStatusBarStyle('dark-content'));
      };
    }, []),
  );

  /**
   * openCameraScreen(): Navigates to the camera screen
   * @param {*} lineItemName
   */
  const openCameraScreen = lineItemName => {
    checkCameraPermissions()
      .then(result => {
        setState({
          ...state,
          alertVisibility: false,
        });
        props.navigation.navigate('camera', {
          lineItemName: lineItemName,
        });
      })
      .catch(error => {
        console.log('------------------=========== error ', error);
        setState({
          ...state,
          alertVisibility: true,
        });
      });
  };

  const callLogOut = () => {
    dispatch(logoutUser());
    let check = clearDB();
    console.log(check);
    // navigation.navigate('loginStack');
  };
  const createLineItem = () => {
    dispatch(getLineItem(OrderData));
  };
  const saveFirebase = () => {
    submitUser()
      .then(result => {
        // setUserName('');
        // setPassword('');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const submitUser = () => {
    return new Promise(function (resolve, reject) {
      let key;

      key = 123;
      console.log(JSON.stringify(idx(lineReducer, _ => _.getLineItemRes)));
      //  let dataToSave = idx(lineReducer, _ => _.getLineItemRes);
      let dataToSave = OrderDataNew;
      database()
        .ref('storeData/')
        .update(dataToSave)
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const offline = async () => {
    await database().goOffline();
  };
  const online = async () => {
    await database().goOnline();
  };

  const persi = () => {
    let token = idx(authReducer, _ => _.loginRes.data.data.token);
    alert(token);
  };

  const testDate = () => {
    let tokenDate = new Date();
    let today = new Date();
    today = moment(today).add(0, 'day').format('YYYY-MM-DD');
    tokenDate = moment(tokenDate).add(10, 'day').format('YYYY-MM-DD');

    if (tokenDate <= today) {
      alert(tokenDate + today);
    }
  };
  /**
   * CameraPermissionAlert(): Displays a warning alert when camera permissions are not granted
   * @returns
   */
  const CameraPermissionAlert = () => {
    return (
      <View>
        <Dialog.Container useNativeDriver visible={state.alertVisibility}>
          <Dialog.Title>Camera permission denied</Dialog.Title>
          <Dialog.Description>
            Please allow camera permission to use the camera feature.
          </Dialog.Description>
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

  /**
   * RenderLineItem(): Renders the UI for flatlist item
   * @param {*} item
   * @param {*} index
   * @returns
   */
  const RenderLineItem = ({item, index}) => {
    return (
      <View style={styles.flatLIstItemContainer}>
        <Text style={styles.flatListItemName}>{item[0]}</Text>

        <View style={styles.flatListButtonRow}>
          <View>
            <IconButton
              icon={'image'}
              size={36}
              color="lightgrey"
              style={styles.GalleryButton}
              onPress={() => {
                props.navigation.navigate('gallery', {
                  lineItemName: item[0],
                });
              }}
            />
            <Text style={styles.imageCountBadge}>
              {state.lineItems[item[0]].capturedImages.length}
            </Text>
          </View>

          <IconButton
            icon="camera"
            color="lightgrey"
            size={36}
            style={styles.cameraButton}
            onPress={() => {
              openCameraScreen(item[0]);
            }}
          />
        </View>
      </View>
    );
  };

  const configuration: Configuration = {
    sticker: {
      personalStickers: true,
      categories: [
        {
          identifier: 'shapes_outline_stickers',
          name: 'Shapes2',
          thumbnailURI: require('../../Assets/Images/circle.png'),
          items: [
            {
              identifier: 'shapes_arrow_outline',
              name: 'Arrow',
              stickerURI: require('../../Assets/Images/arrow.png'),
              tintMode: TintMode.SOLID,
            },
            {
              identifier: 'shapes_circle_outline',
              name: 'Circle',
              stickerURI: require('../../Assets/Images/circle.png'),
              tintMode: TintMode.SOLID,
            },
            {
              identifier: 'shapes_ellipse_outline',
              name: 'Ellipse',
              stickerURI: require('../../Assets/Images/ellipse.png'),
              tintMode: TintMode.SOLID,
            },
            {
              identifier: 'shapes_rectangle_outline',
              name: 'Rectangle',
              stickerURI: require('../../Assets/Images/rectangle.png'),
              tintMode: TintMode.SOLID,
            },
            {
              identifier: 'shapes_square_outline',
              name: 'Square',
              stickerURI: require('../../Assets/Images/square.png'),
              tintMode: TintMode.SOLID,
            },
            {
              identifier: 'shapes_triangle_outline',
              name: 'Triangle',
              stickerURI: require('../../Assets/Images/triangle.png'),
              tintMode: TintMode.SOLID,
            },
          ],
        },
        // // Use existing sticker category
        // {
        //     identifier: 'imgly_sticker_category_emoticons',
        //     thumbnailURI:null,
        //     items: [ ],
        // },
        // // Modify existing sticker category
        // {
        //     identifier: 'imgly_sticker_category_shapes',
        //     thumbnailURI:null,
        //     items: [ ],
        // },
      ],
    },

    // adjustment:{
    //     items:[AdjustmentTool.BRIGHTNESS,AdjustmentTool.CONTRAST,AdjustmentTool.EXPOSURE]
    // }
  };

  // Returns the main UI
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderWithHamburger style={styles.header} />
      <View style={styles.mainView}>
        <Text style={styles.pageHeading}>Home</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={async () => {
              let remoteURL =
                'https://images.unsplash.com/photo-1634915728822-5ad85582837a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80';
              let localURL = require('../../Assets/Images/sample.png');
              PESDK.openEditor(localURL, configuration)
                .then(result => {
                  console.log('----------- result ', result);
                })
                .catch(error => {
                  console.log('------------- error ', error);
                });
              //     setState({
              //     ...state,
              //     isImageViewerVisible: false
              // })
            }}>
            <Text>Image edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              let path = require('../../Assets/Sample_video/sample.mp4');
              VESDK.openEditor(path, configuration)
                .then(result => {
                  console.log('----------- result ', result);
                })
                .catch(error => {
                  console.log('------------- error ', error);
                });
              //     setState({
              //     ...state,
              //     isImageViewerVisible: false
              // })
            }}>
            <Text>Video edit</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={Object.entries(state.lineItems)}
          renderItem={RenderLineItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
        {state.image ? (
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: 'contain',
            }}
            source={{uri: state.image}}
          />
        ) : null}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('realTimeDb')}>
        <Text>RealTime Test</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('lineItem')}>
        <Text>Line Item</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => createLineItem()}>
        <Text>Create Line Item</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => saveFirebase()}>
        <Text>Create firebase</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => offline()}>
        <Text>offline</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => online()}>
        <Text>online</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => persi()}>
        <Text>check persis</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => testDate()}>
        <Text>check date</Text>
      </TouchableOpacity>

      <CameraPermissionAlert />
      <TouchableOpacity style={{padding: 10}} onPress={() => callLogOut()}>
        <Text style={{fontSize: 20}}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    flex: 1,

    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: Theme.PRIMARY_GREEN,
  },
  pageHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cameraButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  GalleryButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatLIstItemContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  flatListItemName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  flatListButtonRow: {
    flexDirection: 'row',
  },
  imageCountBadge: {
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    right: 5,
    top: 5,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'green',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
