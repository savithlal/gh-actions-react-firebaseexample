import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Fonts} from '../../Styles/Font';
import {Theme} from '../../Styles/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';

const LoginTextInput = ({
  customStyle,
  subHeading,
  type,
  value,
  onChangeText,
  password = false,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(password ? true : false);

  return (
    <View>
      <View
        style={{
          ...styles.outerView,
          ...customStyle,
          borderColor: error ? Theme.ERROR_RED : Theme.GREY,
        }}>
        <Text style={styles.text}>{subHeading}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <TextInput
            placeholder=""
            style={{...styles.textInput, flex: password ? 0.8 : 1}}
            secureTextEntry={showPassword}
            value={value}
            onChangeText={onChangeText}
          />
          {password ? (
            <TouchableOpacity
              style={styles.ShowClick}
              onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.Show}>{showPassword ? 'SHOW' : 'HIDE'}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  outerView: {
    backgroundColor: Theme.White,
    borderWidth: 1,
    height: 56,
    marginHorizontal: 24,
    borderRadius: 3,

    //  paddingBottom: 10,
  },
  text: {
    fontFamily: Fonts.Regular,
    color: Theme.DARK_GREY,
    fontSize: 12,
    marginLeft: 8,
    marginTop: 8,
  },
  textInput: {
    // marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
    padding: Platform.OS === 'ios' ? 8 : 0,
    color: Theme.BLACK,
    paddingLeft: 0,
  },
  Show: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
    color: Theme.SECONDARY_BLUE,
  },
  ShowClick: {
    flex: 0.2,
    marginTop: -5,
    marginLeft: 10,
  },
  error: {
    marginLeft: 25,
    marginTop: 5,
    fontFamily: Fonts.Regular,
    color: Theme.ERROR_RED,
  },
});
export default LoginTextInput;
