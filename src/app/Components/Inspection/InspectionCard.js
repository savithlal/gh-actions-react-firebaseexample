import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Theme } from '../../Styles/Theme';
import Divider from '../Divider/Divider';
import { Fonts } from '../../Styles/Font';
import StatusChip from '../Chip/StatusChip';
import IconChip from '../Chip/IconChip';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import deviceInfoModule from 'react-native-device-info';
const InspectionCard = ({ data, onPressAction }) => {
  return (
    <View style={styles.mainContainer}>
      {data.month ? <Text style={styles.month}>{data.monthValue}</Text> : null}
      <TouchableOpacity style={styles.card} onPress={onPressAction}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.date}>
            {data.date} {data.time}
          </Text>
          <Text style={styles.orderIdText}>Order #{data.orderId}</Text>
        </View>
        <Divider customStyle={styles.divider} />
        <View style={styles.detailsContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>{data.heading}</Text>
            <Text style={styles.name}>{data.name}</Text>
            <StatusChip
              type={data.scheduleStatus}
              value={data.scheduleStatus}
            />
          </View>
          <View style={styles.ImageContainer}>
            <Image style={styles.Image} source={{ uri: data.image }} />
          </View>
        </View>

        <View style={styles.row}>
          <IconChip
            type={data.paymentStatus === 1 ? true : false}
            value={data.paymentStatus === 1 ? 'Paid' : 'Unpaid'}
          />
          <IconChip
            type={data.agreementStatus === 1 ? true : false}
            value={'Agreement Signed'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...deviceInfoModule.isTablet() ?
      {
        width: '80%',
        alignSelf: 'center'
      } : {

      }
  },
  card: {
    backgroundColor: Theme.White,
    borderColor: Theme.GREY_LIGHT,
    borderWidth: 1,
    elevation: 2,
    borderRadius: 4,
    margin: 14,
    shadowColor: Theme.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  orderIdContainer: {
    //  borderBottomColor: '#D5D5D5',
    // borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'space-between',
    marginLeft: 15,
    marginTop: 8,
    marginRight: 8,
  },
  orderIdText: {
    color: Theme.BLACK,
    fontSize: 12,
    fontFamily: Fonts.Regular,
  },
  date: {
    color: '#252525',
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 14,
    marginRight: 9,
  },
  headingContainer: {
    flex: 1,
  },
  heading: {
    flexWrap: 'wrap',
    textAlign: 'left',
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    lineHeight: 23,
    color: Theme.DARKEST_GREY,
  },
  name: {
    marginTop: 5,
    color: Theme.DARKEST_GREY,
    fontSize: 14,
    fontFamily: Fonts.Regular,
  },
  scheduledBadge: {
    backgroundColor: '#C7DBF6',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: 15,
  },
  scheduledText: {
    color: '#1F2F9C',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 11,
  },
  publishedBadge: {
    backgroundColor: '#C7F6E0',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: 15,
  },
  publishedText: {
    color: '#1F9C7B',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 11,
  },
  ImageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  Image: {
    width: 144,
    height: 108,
    resizeMode: 'cover',
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  paymentStatusIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 10,
  },
  paymentStatusText: {
    fontSize: 14,
    textTransform: 'capitalize',
    marginRight: 20,
  },
  divider: {
    marginVertical: 5,
  },
  month: {
    marginLeft: 18,
    marginBottom: -5,
    marginTop: 10,
    fontFamily: Fonts.Bold,
    textTransform: 'uppercase',
    color: Theme.GREY,
    fontSize: 12,
  },
});
export default InspectionCard;
