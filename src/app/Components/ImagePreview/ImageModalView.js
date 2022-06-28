import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import Row from '../Row';
import {Theme} from '../../Styles/Theme';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const ImageModalView = ({
  isVisible = false,
  onClosePress,
  source,
  title = 'No Title',
}) => {
  const [currentPg, setCurrentPg] = useState(0);
  const [nop, setNop] = useState(0);
  return (
    <Modal
      onBackButtonPress={onClosePress}
      onBackdropPress={onClosePress}
      animationIn="zoomIn"
      animationOut="zoomOut"
      isVisible={isVisible}
      style={{justifyContent: 'flex-end', margin: 0, flex: 1}}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <Row
            rowStyle={{
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 8,
            }}>
            <Text
              style={{...styles.modalText, marginHorizontal: 8}}
              numberOfLines={4}>
              {title}
            </Text>
            <Pressable onPress={onClosePress} style={{padding: 8}}>
              <Icon name="close" size={26} color={Theme.grey_2} />
            </Pressable>
          </Row>
          <View style={{alignItems: 'center', flex: 1}}>
            <Image
              source={{uri: source}}
              style={{width: width / 1.05, height: height / 1.5}}
              resizeMode="contain"
            />
            {/* <ZoomableImage
          source={{uri: source}}
          //   style={{width: width / 1.05, height: height / 1.5}}
          imageWidth={width / 1.05}
          imageHeight={height / 1.5}
          top={10}
          left={10}
        /> */}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageModalView;
const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0,0.4)',
  },

  label_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 30,
  },
  modalText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Montserrat-Regular',
    color: Theme.White,
    fontSize: 16,
    maxWidth: width - 80,
  },
  textStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Montserrat-Regular',
    color: Theme.White,
    fontSize: 12,
  },
  textContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignItems: 'center',
    marginStart: 8,
  },
  pdf: {
    flex: 1,
    width: width / 1.05,
    borderRadius: 4,
  },
});
