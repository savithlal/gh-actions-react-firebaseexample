import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import Title from '../../../Components/Title/Title';
import TitleAndDiscription from '../../../Components/Title/TitleAndDiscription';
import AddButton from '../../../Components/Buttons/AddButton';
import PlainColorButton from '../../../Components/Buttons/PlainColorButton';
import {useNavigation} from '@react-navigation/native';
//OVERVIEW OF INSPECTION LIST VIEW
//Author Charles
const Overview = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Title name={'Overview'} customStyle={styles.title} />
      <TitleAndDiscription
        name={'ADDRESS'}
        discription={'4334 Twin Lakes Drive North Seattle, WA 32934'}
      />
      <TitleAndDiscription
        name={'INSPECTION DATE'}
        discription={'03/29/2021, 8:00 AM'}
      />
      <TitleAndDiscription
        name={'PUBLISHED'}
        discription={'03/29/2021, 10:31 PM'}
      />
      <PlainColorButton
        name={'OPEN INSPECTION'}
        onItemClick={() => navigation.navigate('CategoryList')}
      />
      <AddButton name={'VIEW REPORT'} customStyle={styles.plainButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    marginBottom: 10,
  },
  plainButton: {
    marginTop: 10,
    marginBottom: 25,
  },
});

export default Overview;
