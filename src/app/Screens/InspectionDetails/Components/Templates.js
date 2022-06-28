import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Divider from '../../../Components/Divider/Divider';
import TitleAndPrice from '../../../Components/Title/TitleAndPrice';
import Title from '../../../Components/Title/Title';
import deviceInfoModule from 'react-native-device-info';
//Template UI
//Author Charles
const Templates = ({data}) => {
  return (
    <View style={styles.mainContainer}>
      <Title name={'Templates'} customStyle={styles.title} />
      <TitleAndPrice value={data} />
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
  title: {
    marginTop: 15,
    marginBottom: 10,
  },

  editIcon: {
    marginVertical: 15,
  },
});

export default Templates;
