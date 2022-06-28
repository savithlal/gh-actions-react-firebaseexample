import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import TitleAndPrice from '../../../Components/Title/TitleAndPrice';
import TitleBoldRow from '../../../Components/Title/TitleBoldRow';
import TitleSingle from '../../../Components/Title/TitleSingle';
import IconChip from '../../../Components/Chip/IconChip';
import AddButton from '../../../Components/Buttons/AddButton';
import PlainColorButton from '../../../Components/Buttons/PlainColorButton';
import Title from '../../../Components/Title/Title';
import deviceInfoModule from 'react-native-device-info';
//Client OF INSPECTION LIST VIEW
//Author Charles
const InspectionFees = ({ data }) => {
  return (
    <View style={styles.mainContainer}>
      <Title name={'Inspection Fees'} customStyle={styles.title} />

      <View>
        <IconChip type={false} value={'Unpaid'} customStyle={{ marginLeft: 5 }} />
        <TitleSingle name={'Fees'} />
        <TitleAndPrice
          value={'Terminate Inspection'}
          price={data.termite_inspection}
        />
        <TitleAndPrice
          value={'Wind Mitigation Inspection - with a Home Inspection'}
          price={data.wind_mitigation}
        />
        <TitleBoldRow value={'Total Fee(s)'} price={data.total_fee} />

        <AddButton
          name={'+ ADD FEE'}
          textStyle={styles.buttonText}
          customStyle={styles.buttonCustom}
        />
        <View style={styles.buttonRow}>
          <PlainColorButton name={'Mark as Paid'} customStyle={styles.buttonRowItem} />

          <AddButton
            name={'Send payment request'}
            customStyle={styles.sendReqButton}
          />

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...deviceInfoModule.isTablet() ?
      {
        width: '90%',
        alignSelf: 'center'
      } : {

      }
  },
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
    width: 129,
  },
  sendReqButton: {
    ...deviceInfoModule.isTablet() ?
      {
        flex: 1,
      } : {
        marginTop: 0,
        marginBottom: 25,
      }
  },
  buttonRow: {
    ...deviceInfoModule.isTablet() ?
      {
        flexDirection: 'row',
        justifyContent: 'space-around',
      } : {

      }
  },
  buttonRowItem: {
    ...deviceInfoModule.isTablet() ?
      {
        flex: 1
      } : {

      }
  }
});

export default InspectionFees;
