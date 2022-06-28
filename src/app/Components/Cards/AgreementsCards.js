import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import DividerThick from '../../Components/Divider/DividerThick';
import Divider from '../../Components/Divider/Divider';
import IconChip from '../../Components/Chip/IconChip';
import AddButton from '../../Components/Buttons/AddButton';
import OverlayIconChip from '../../Components/Chip/OverlayIconChip';
import TitleFileName from '../../Components/Title/TitleFileName';
//Agreement Cards
//Author Charles
const AgreementsCards = ({data}) => {
  return (
    <View>
      <TitleFileName name={data.name} />
      <View style={styles.row}>
        <IconChip
          type={data.signed === 1 ? true : false}
          value={'Agreement Signed'}
          customStyle={{marginLeft: 5}}
        />
        <AddButton
          name={'Send to Client'}
          textStyle={styles.buttonText}
          customStyle={styles.buttonCustom}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 142,
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
  },
  plainButton: {
    marginTop: 10,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  buttonText: {
    marginHorizontal: 10,
    marginVertical: 7,
  },
  buttonCustom: {
    marginTop: 10,
  },
  sendReqButton: {
    marginTop: 5,
    marginBottom: 25,
  },
});

export default AgreementsCards;
