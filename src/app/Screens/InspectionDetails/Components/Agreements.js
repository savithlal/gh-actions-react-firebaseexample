import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
const {width} = Dimensions.get('window');
import AddButton from '../../../Components/Buttons/AddButton';
import AgreementsCards from '../../../Components/Cards/AgreementsCards';
import Title from '../../../Components/Title/Title';
//Client OF INSPECTION LIST VIEW
//Author Charles
const Agreements = ({data}) => {
  return (
    <View style={styles.mainContainer}>
      <Title name={'Agreements'} customStyle={styles.title} />
      <View>
        {data.map(itm => (
          <AgreementsCards data={itm} />
        ))}

        <AddButton
          name={'View Agrements(s)'}
          customStyle={styles.sendReqButton}
        />
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
  },
  sendReqButton: {
    marginTop: 5,
    marginBottom: 25,
  },
});

export default Agreements;
