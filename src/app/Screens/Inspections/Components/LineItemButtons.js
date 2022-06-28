import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {checkCameraPermissions} from '../../../Utilities/Permissions';
import {useNavigation} from '@react-navigation/native';
import AddButton from '../../../Components/Buttons/AddButton';
const {width} = Dimensions.get('window');
const buttonObject = [
  {id: '1', name: 'PHOTO', action: ''},
  {id: '2', name: 'VIDEO', action: ''},
  {id: '3', name: 'LOCATION', action: ''},
  {id: '4', name: 'PHOTO GALLERY', action: ''},
  {id: '5', name: 'VIDEO GALLERY', action: ''},
  {id: '6', name: '360 IMAGES', action: ''},
];
//this page for show flashings item
//Author Charles
const LineItemButtons = ({route}) => {
  const navigation = useNavigation();

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

  const onclickItem = item => {
    switch (item) {
      case '1':
        return openCameraScreen();
      case '2':
        return openVideoScreen();
      case '3':
        return navigation.navigate('LocationSelection');
      case '4':
        return navigation.navigate('ImageGallery');
      case '5':
        return navigation.navigate('VideoGallery');
    }
  };
  return (
    <View style={styles.addButton}>
      {buttonObject.map(item => (
        <AddButton
          name={item.name}
          customStyle={{width: width / 3 - 45}}
          onItemClick={() => onclickItem(item.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LineItemButtons;
