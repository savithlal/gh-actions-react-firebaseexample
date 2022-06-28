import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Theme } from '../../Styles/Theme';
import { Fonts } from '../../Styles/Font';
import PlainColorButton from '../Buttons/PlainColorButton';
import HyperLinkButton from '../Buttons/HyperLinkButton';
import { CustomModal } from '../Modals/CustomModal';
import deviceInfoModule from 'react-native-device-info';
//AUthor Charles
//This modal is used for popup inspector details

export const TitleDisButtonModal = ({
  visibility,
  close,
  title,
  dis,
  mainButtonTitle,
  subButtonText,
  onItemClickMain,
  onItemClickSub,
}) => {
  return (
    <CustomModal
      isVisible={visibility}
      onClose={close}
      isBottomSheet={deviceInfoModule.isTablet() ? false : true}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.headTitle}>{title}</Text>
        <Text style={styles.headDis}>{dis}</Text>

        <PlainColorButton
          name={mainButtonTitle}
          customStyle={{ ...styles.button, marginTop: 30 }}
          onItemClick={onItemClickMain}
        />
        <HyperLinkButton
          value={subButtonText}
          onItemClick={onItemClickSub}
          customStyle={styles.dismissForEver}
        />
      </View>
    </CustomModal>
  );
};
const styles = StyleSheet.create({
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
    textAlign: 'center',
    color: Theme.BLACK,
  },
  button: {
    marginHorizontal: 17,
    marginVertical: 5,
  },
  contentContainer: {
    marginHorizontal: 25,
  },
  dismissForEver: {
    marginBottom: 0,
  },
});
