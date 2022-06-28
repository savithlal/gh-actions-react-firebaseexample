import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Theme} from '../../Styles/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {Fonts} from '../../Styles/Font';
import PlainColorButton from '../Buttons/PlainColorButton';
//AUthor Charles
//This modal is used for popup inspector details

export const ContactModal = ({visibility, close, data}) => {
  return (
    <Modal
      isVisible={visibility}
      onSwipeComplete={close}
      swipeDirection={['down']}
      style={styles.modalLayout}
      onBackdropPress={close}>
      <View style={styles.modalContainer}>
        <View style={styles.drawer} />
        <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
          <MaterialIcons name="close" color={Theme.GREY} size={30} />
        </TouchableOpacity>
        <Text style={styles.headTitle}>
          {data?.first_name} {data?.last_name}
        </Text>
        <Text style={styles.headDis}>{data?.phone}</Text>
        <Text style={styles.headDis}>{data?.email}</Text>

        <PlainColorButton
          name={'SEND TEXT'}
          customStyle={{...styles.button, marginTop: 30}}
          icon={true}
          iconName="chatbox-ellipses-sharp"
        />
        <PlainColorButton
          name={'CALL'}
          customStyle={styles.button}
          icon={true}
          iconName="call"
        />
        <PlainColorButton
          name={'SEND EMAIL'}
          customStyle={styles.button}
          icon={true}
          iconName="mail"
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalLayout: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 25,
    elevation: 15,
  },
  headTitle: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: Fonts.SemiBold,
    color: Theme.BLACK,
    marginBottom: 10,
  },
  headDis: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: Fonts.Regular,
    marginTop: 3,

    color: Theme.BLACK,
  },
  closeIcon: {alignSelf: 'flex-end', marginRight: 15, marginTop: 5},

  drawer: {
    backgroundColor: Theme.LIGHT_GREY,
    height: 4,
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 2,
  },
  button: {
    marginHorizontal: 17,
    marginVertical: 5,
  },
});
