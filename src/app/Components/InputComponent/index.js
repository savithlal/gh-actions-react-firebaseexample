import React, {createRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {Theme} from '../../Styles/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import Row from '../Row';
import {Fonts} from '../../Styles/Font';
const {width} = Dimensions.get('window');

export const InputComponent = ({
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
            paddingTop: Platform.OS === 'ios' ? (multiline ? 6 : 0) : 6,
            justifyContent: 'center',
          },
        ]}
      />
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);
export const DropdownComponent = ({
  title,
  value,
  style,
  titleStyle,
  containerStyle,
  iconColor,
  getSelectedData,
  error,
  data,
  placeholder,
  titleList = false,
  showEnable = true,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[style, {marginTop: 4}]}>
      {title ? (
        <Text style={[styles.titleText, titleStyle]}>{title}</Text>
      ) : null}
      <TouchableOpacity
        style={[styles.inputTextContainer, containerStyle]}
        onPress={() => (showEnable ? setVisible(true) : null)}>
        <Row rowStyle={{justifyContent: 'space-between'}}>
          {value ? (
            <Text
              numberOfLines={1}
              style={{
                ...styles.inputText,
                marginEnd: 12,
                maxWidth: width - 130,
              }}>
              {value}
            </Text>
          ) : (
            <Text
              style={{
                ...styles.inputText,
                marginEnd: 12,
                color: Theme.grey_2,
              }}>
              {placeholder}
            </Text>
          )}
          <MaterialIcons
            name="keyboard-arrow-down"
            color={iconColor ? iconColor : Theme.color_primary_1}
            size={24}
          />
        </Row>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {data ? (
        <DropdownList
          data={data}
          visibility={visible}
          close={() => setVisible(false)}
          onPress={item => {
            getSelectedData(item);
            setVisible(false);
          }}
          titleList={titleList}
        />
      ) : null}
    </View>
  );
};

export const DropdownList = ({visibility, close, data, onPress, titleList}) => {
  return (
    <Modal
      isVisible={visibility}
      onSwipeComplete={close}
      swipeDirection={['down']}
      //  style={styles.modalLayout}
      onBackdropPress={close}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={() => close()}>
          <MaterialIcons
            name="close"
            color={Theme.grey_2}
            size={22}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headTitle}>Sample Titile</Text>
        <Text style={styles.headDis}>Discription discription</Text>

        <ScrollView>
          {data.map((item, index) => (
            <View style={styles.listView} key={index}>
              <View style={styles.rowSet}>
                <View style={styles.squareBox}>
                  <MaterialIcons
                    name="close"
                    color={Theme.White}
                    size={15}
                    style={styles.insideSquare}
                  />
                </View>
                <Text>{item.dataValue}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  titleText: {
    fontFamily: Fonts.Regular,
    padding: 4,
    fontSize: 22,
    color: Theme.SECONDARY_BLUE,
  },
  inputTextContainer: {
    borderColor: Theme.grey_2,
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
    color: Theme.PRIMARY_GREY,
    padding: 0,
  },
  text: {fontFamily: 'Montserrat-Regular', color: Theme.grey_1},
  errorText: {
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 4,
    fontSize: 12,
    color: Theme.color_primary_2,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.grey_3,
    width: '100%',
  },

  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  headTitle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  headDis: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 10,
  },
  closeIcon: {alignSelf: 'flex-end', marginRight: 10, marginTop: 10},
  insideSquare: {},
  listView: {
    borderWidth: 1,
    borderColor: Theme.grey_3,
    margin: 10,
    padding: 10,
  },
  squareBox: {
    height: 20,
    width: 20,
    backgroundColor: Theme.color_primary_2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rowSet: {
    flexDirection: 'row',
  },
});
