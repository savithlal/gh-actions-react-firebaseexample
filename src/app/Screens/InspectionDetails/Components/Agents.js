import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import TitleAndDisButton from '../../../Components/Title/TitleAndDisButton';
import {ContactModal} from '../../../Components/ContactModal/ContactModal';
import Title from '../../../Components/Title/Title';
import deviceInfoModule from 'react-native-device-info';
//Client OF INSPECTION LIST VIEW
//Author Charles
const Agents = ({data}) => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [detailModalData, setDetailModdalData] = useState('');
  const ModalOpen = itm => {
    setDetailModdalData(itm);
    setContactModalVisible(true);
  };
  return (
    <View style={styles.mainContainer}>
      <Title name={'Agents'} customStyle={styles.title} />
      <View>
        {data.map((itm, index) => (
          <TitleAndDisButton
            name={'AGENT ' + parseInt(index + 1)}
            dis1={itm.agent?.first_name + ' ' + itm.agent?.last_name}
            dis2={itm.agent?.email}
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
        data={detailModalData.agent}
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
  edit: {
    marginVertical: 20,
  },
});

export default Agents;
