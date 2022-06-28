import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {Theme} from '../../Styles/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Fonts} from '../../Styles/Font';
//serach box for line item page
//Author Charles
const SearchBox = ({customStyle, onChangeText, onpressSearchIcon}) => {
  return (
    <View style={{...styles.container, ...customStyle}}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.icon} onPress={onpressSearchIcon}>
          <IonIcon name="search" size={18} color={Theme.PRIMARY_GREY} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputBox}
          placeholder={'Search'}
          onChangeText={value => onChangeText(value)}
          onEndEditing={onpressSearchIcon}
          placeholderTextColor={Theme.PRIMARY_GREY}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.BG_GREY,
    borderBottomColor: Theme.LIGHT_GREY,
    borderBottomWidth: 1,
  },
  inputBox: {
    fontSize: 16,
    fontFamily: Fonts.Regular,
    flex: 1,
    color: Theme.BLACK,
    padding: 0,
    paddingLeft: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    borderColor: Theme.LIGHT_GREY,
    borderWidth: 1,
    height: 40,
    backgroundColor: Theme.White,
    borderRadius: 20,
    color: Theme.PRIMARY_GREY,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 5,
  },
});

export default SearchBox;
