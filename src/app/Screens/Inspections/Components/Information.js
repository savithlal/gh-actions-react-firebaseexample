import React from 'react';
import {StyleSheet, View} from 'react-native';
import Title from '../../../Components/Title/Title';
import AddButton from '../../../Components/Buttons/AddButton';

//Information
//Author Charles
const Information = () => {
  return (
    <View style={styles.Container}>
      <Title name={'Information'} customStyle={styles.title} />
      <AddButton name={'+ INFORMATION'} />
      <AddButton name={'+ NAME PLATE'} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 0,
    marginBottom: 10,
  },
  Container: {},
});

export default Information;
