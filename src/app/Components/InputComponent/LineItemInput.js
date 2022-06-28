import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
const {width} = Dimensions.get('window');

export const LineItemInput = ({
  title,
  style,
  height = 40,
  multiline = false,
  maxLength = 50,
  placeholder = 'Please enter value',
  containerStyle,
  titleStyle,
  secureTextEntry = false,
  error = '',
  value = '',
  onChangeText,
  keyboardType,
  contextMenuHidden = false,
  enable = true,
  onBlur,
  onPressItem,
}) => (
  <View style={[style, {}]}>
    {title ? <Text style={[styles.titleText, titleStyle]}>{title}</Text> : null}
    <View
      style={[
        styles.inputTextContainer,
        {
          height: height,
          backgroundColor: enable ? Theme.White : Theme.grey_3,
        },
        containerStyle,
      ]}>
      <TextInput
        onPressIn={onPressItem}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        textAlignVertical="top"
        multiline={multiline}
        maxLength={maxLength}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize="none"
        editable={enable}
        contextMenuHidden={contextMenuHidden}
        onBlur={onBlur}
        style={[
          styles.inputText,
          {
            flex: 1,
            padding: 0,
            paddingTop: Platform.OS === 'ios' ? (multiline ? 6 : 0) : 8,
            justifyContent: 'center',
          },
        ]}
      />
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);
const styles = StyleSheet.create({
  titleText: {
    fontFamily: Fonts.Regular,
    padding: 4,
    fontSize: 22,
    color: Theme.SECONDARY_BLUE,
  },
  inputTextContainer: {
    borderColor: Theme.TextInputOutline_GREY,
    borderRadius: 3,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    margin: 4,
    paddingHorizontal: 12,
  },
  inputText: {
    fontFamily: Fonts.Regular,
    fontSize: 16,
    color: Theme.TextInputOutline_GREY,
    padding: 0,
  },
  text: {fontFamily: 'Montserrat-Regular', color: Theme.grey_1},
  errorText: {
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 4,
    fontSize: 12,
    color: Theme.color_primary_2,
  },
});
