import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Fonts} from '../../Styles/Font';
import {Theme} from '../../Styles/Theme';

const StatusChip = ({type, value, customStyle}) => {
  return (
    <View
      style={{
        ...styles.badge,
        ...customStyle,
        backgroundColor:
          type === 'Scheduled'
            ? Theme.SCHEDULED
            : type === 'Draft'
            ? Theme.DRAFT
            : type === 'Complete'
            ? Theme.PUBLISHED
            : type === 'Cancelled'
            ? Theme.CANCELED
            : null,
      }}>
      <Text
        style={{
          ...styles.text,
          color:
            type === 'Scheduled'
              ? Theme.SCHEDULED_TEXT
              : type === 'Draft'
              ? Theme.DRAFT_TEXT
              : type === 'Complete'
              ? Theme.PUBLISHED_TEXT
              : type === 'Cancelled'
              ? Theme.CANCELED_TEXT
              : null,
        }}>
        {value}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  badge: {
    height: 27,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 15,
  },
  text: {
    fontFamily: Fonts.Bold,
    textTransform: 'uppercase',
    fontSize: 11,
  },
});
export default StatusChip;
