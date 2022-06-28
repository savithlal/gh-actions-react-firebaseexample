import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
const {width} = Dimensions.get('window');
import Title from '../../../Components/Title/Title';
import TitleAndDiscription from '../../../Components/Title/TitleAndDiscription';
import AddButton from '../../../Components/Buttons/AddButton';
import PlainColorButton from '../../../Components/Buttons/PlainColorButton';
import {useNavigation} from '@react-navigation/native';
import StatusChip from '../../../Components/Chip/StatusChip';
import IconChip from '../../../Components/Chip/IconChip';
import TitleSingle from '../../../Components/Title/TitleSingle';
import {TitleDisButtonModal} from '../../../Components/ContactModal/TitleDisButtonModal';
import {Fonts} from '../../../Styles/Font';
import moment from 'moment';
import {TextEditorModal} from '../../../Components/ContactModal/TextEditorModal';
import deviceInfoModule from 'react-native-device-info';
//OVERVIEW OF INSPECTION LIST VIEW
//Author Charles
const HeaderSection = ({data}) => {
  const formatDate = date => {
    return moment(new Date(date)).format('MM/DD/YYYY H:mm:ss A');
  };
  const navigation = useNavigation();
  const [inspectiontModalVisible, setInspectionModalVisible] = useState(false);
  const [textEditorModalVisible, setTextEditorModalVisible] = useState(false);
  const openInspection = () => {
    setInspectionModalVisible(false);
    navigation.navigate('CategoryList');
  };
  return (
    <View style={styles.mainContainer}>
      <Title
        name={
          data?.location_address +
          ', ' +
          data?.location_city +
          ' ' +
          data?.location_state +
          ' ' +
          data?.location_zip
        }
        customStyle={styles.title}
        customTextStyle={styles.titleText}
      />

      <StatusChip
        type={data?.status}
        value={data?.status}
        customStyle={styles.statusChip}
      />

      <TitleAndDiscription
        name={'Inspection date'}
        discription={formatDate(data?.start_time)}
        customStyle={styles.inspectioNDate}
      />

      <TitleSingle name={'Action Items'} customStyle={styles.ActionItems} />

      <View style={styles.rowActionType}>
        <IconChip
          type={!!data?.paid}
          value={!!data?.paid ? 'Paid' : 'Unpaid'}
        />
        <IconChip
          type={!!data?.is_agreement_signed}
          value={
            !!data?.is_agreement_signed
              ? 'Agreement signed'
              : 'Agreement not signed'
          }
        />
      </View>

      <View style={styles.row}>
        <TitleAndDiscription name={'PUBLISHED'} discription={'Unpublished'} />
        <View style={{paddingTop: 20}}>
          <AddButton
            name={'Mark Complete'}
            textStyle={styles.buttonText}
            customStyle={styles.buttonCustom}
          />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <PlainColorButton
          name={'OPEN INSPECTION'}
          onItemClick={() => setInspectionModalVisible(true)}
          // onItemClick={() => navigation.navigate('CategoryList')}
          customStyle={styles.buttonRowItem}
        />

        <TitleDisButtonModal
          visibility={inspectiontModalVisible}
          close={() => {
            setInspectionModalVisible(false);
          }}
          onPress={item => {
            setInspectionModalVisible(false);
          }}
          title={'This inspection has not been paid.'}
          dis={
            'If the client has paid you directly, you can mark this inspection as paid in the “Inspection fees” section. '
          }
          mainButtonTitle={'continue to inspection'}
          subButtonText="DISMISS FOREVER"
          onItemClickMain={() => openInspection()}
          onItemClickSub={() => setInspectionModalVisible(false)}
        />

        <TextEditorModal
          visibility={textEditorModalVisible}
          close={() => setTextEditorModalVisible(false)}
          onPress={item => {
            setTextEditorModalVisible(false);
          }}
        />
        <AddButton
          name={'VIEW REPORT'}
          customStyle={styles.plainButton}
          onItemClick={() => setTextEditorModalVisible(true)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...(deviceInfoModule.isTablet()
      ? {
          width: '90%',
          alignSelf: 'center',
        }
      : {}),
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
  },
  titleText: {
    fontFamily: Fonts.SemiBold,
  },
  plainButton: {
    ...(deviceInfoModule.isTablet()
      ? {
          flex: 1,
        }
      : {
          marginTop: 10,
          marginBottom: 25,
        }),
  },
  statusChip: {
    marginLeft: 14,
    paddingHorizontal: 15,
  },
  inspectioNDate: {
    marginTop: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
  },
  ActionItems: {
    marginBottom: -5,
    marginLeft: 18,
    marginTop: 20,
  },
  buttonText: {
    marginHorizontal: 10,
    marginVertical: 7,
  },
  buttonCustom: {
    marginTop: 10,
  },
  rowActionType: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  edit: {
    marginVertical: 15,
  },
  buttonRow: {
    ...(deviceInfoModule.isTablet()
      ? {
          flexDirection: 'row',
          justifyContent: 'space-around',
        }
      : {}),
  },
  buttonRowItem: {
    ...(deviceInfoModule.isTablet()
      ? {
          flex: 1,
        }
      : {}),
  },
});

export default HeaderSection;
