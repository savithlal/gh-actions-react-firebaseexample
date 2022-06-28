import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import TitleAndDisButton from '../../../Components/Title/TitleAndDisButton';
import {ContactModal} from '../../../Components/ContactModal/ContactModal';
import Title from '../../../Components/Title/Title';
import deviceInfoModule from 'react-native-device-info';
//Client OF INSPECTION LIST VIEW
//Author Charles
const Client = ({data}) => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [detailModalData, setDetailModdalData] = useState('');
  const ModalOpen = itm => {
    setDetailModdalData(itm);
    setContactModalVisible(true);
  };
  return (
    <View style={styles.mainContainer}>
      <Title name={'Client'} customStyle={styles.title} />
      <View>
        {data.map((itm, index) => (
          <TitleAndDisButton
            name={'CLIENT ' + parseInt(index + 1)}
            dis1={itm.client.first_name + ' ' + itm.client.last_name}
            dis2={itm.client.email}
            buttonName="CONTACT"
            itemClick={() => ModalOpen(itm)}
          />
        ))}
      </View>

      <ContactModal
        visibility={contactModalVisible}
        close={() => setContactModalVisible(false)}
        onPress={item => {
          setContactModalVisible(false);
        }}
        data={detailModalData.client}
      />
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
    marginTop: 10,
    marginBottom: 10,
  },
  edit: {
    marginVertical: 20,
  },
});

export default Client;
