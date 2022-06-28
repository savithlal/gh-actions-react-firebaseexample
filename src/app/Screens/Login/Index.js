import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, logoutUser} from '../../Redux/Actions/Auth';
import idx from 'idx';
import Toast from 'react-native-simple-toast';
import {IsEmpty, IsValidEmail} from '../../Utilities/Validation';
import {storeItem, getItem} from '../../Utilities/AsyncUtils';
import {Strings} from '../../Utilities/Strings';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
import LoginTextInput from '../../Components/InputComponent/LoginTextInput';
import PlainColorButton from '../../Components/Buttons/PlainColorButton';
import HyperLinkButton from '../../Components/Buttons/HyperLinkButton';
import {useFocusEffect} from '@react-navigation/native';
import {
  changeStatusBarColor,
  changeStatusBarStyle,
} from '../../Redux/Actions/SharedReducerActions';
import moment from 'moment';
import deviceInfoModule from 'react-native-device-info';
/**
 * Login Page
 * @returns
 * @author Charles
 */
const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const authReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const loginApi = params => dispatch(loginUser(params));
  const [userNameErr, setUserNameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [loader, setLoader] = useState(false);
  const imageUrl = require('../../Assets/Images/PT_logo_horizontal.png');
  const callLogin = () => {
    if (validateLogin()) {
      setLoader(true);
      Keyboard.dismiss;
      let params = {userEmail: userName, password: password};
      loginApi(params);
    }
  };

  const forgotpassword = () => {
    //  navigation.navigate('homeNavigation');
    Keyboard.dismiss;
    let params = {
      userEmail: 'savith.lal@digiclave.com',
      password: 'Inspector@1234',
    };
    loginApi(params);
  };

  const signiup = () => {
    //  navigation.navigate('homeNavigation');
    Keyboard.dismiss;
    let params = {
      userEmail: 'ankit.verma@kadellabs.com',
      password: 'Inspector1@123',
    };
    loginApi(params);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(changeStatusBarColor(Theme.DEFAULT_GREY));

      return () => {
        dispatch(changeStatusBarColor('white'));
      };
    }, []),
  );

  const clearFields = () => {
    setUserName('');
    setUserNameErr('');
    setPassword('');
    setPasswordErr('');
  };

  const validateLogin = () => {
    let validated = true;
    if (IsEmpty(userName)) {
      setUserNameErr('Email  cannot be blank.');
      validated = false;
    } else if (!IsValidEmail(userName)) {
      setUserNameErr('Invalid Email address.');
      validated = false;
    } else {
      setUserNameErr('');
    }
    if (IsEmpty(password)) {
      setPasswordErr('Password cannot be blank');
      validated = false;
    } else {
      setPasswordErr('');
    }
    return validated;
  };

  useEffect(() => {
    try {
      if (authReducer.loginRes) {
        let login = idx(authReducer, _ => _.loginRes.data.success);
        let user_id = idx(authReducer, _ => _.loginRes.data.data.user_id);
        if (login) {
          let tokenDate = new Date();
          tokenDate = moment(tokenDate)
            .add(Strings.TOKEN_EXP_DAYS, 'day')
            .format('YYYY-MM-DD');

          storeItem(Strings.EXPIRY_DATE, tokenDate);
          storeItem(Strings.USER_ID, user_id);
          clearFields();
          setLoader(false);
        } else {
          setLoader(false);
          Toast.showWithGravity(
            'The username or password is incorrect',
            Toast.SHORT,
            Toast.BOTTOM,
          );
          dispatch(logoutUser());
        }
      }
    } catch (err) {}
  }, [authReducer.loginRes]);

  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView>
        <Image source={imageUrl} style={styles.image} resizeMode="contain" />
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Log In</Text>
          <LoginTextInput
            subHeading="Email"
            value={userName}
            onChangeText={value => setUserName(value)}
            error={userNameErr}
          />
          <LoginTextInput
            customStyle={styles.passwordView}
            subHeading="Password"
            value={password}
            onChangeText={value => setPassword(value)}
            password={true}
            error={passwordErr}
          />

          <PlainColorButton
            customStyle={styles.loginButton}
            name={'LOG IN'}
            onItemClick={() => callLogin()}
            loading={loader}
          />

          <Text style={styles.infoText}>Need a user name and password? </Text>
          <HyperLinkButton
            value={'Sign up here.'}
            onItemClick={() => signiup()}
          />
          <HyperLinkButton
            value={'Forgot password?'}
            customStyle={styles.forgotPassword}
            onItemClick={() => forgotpassword()}
          />
        </View>
        <Text style={styles.endText}>
          By clicking Log in, you agree to our{'\n'}
          <Text style={styles.hyperLink}>Terms of Service</Text> and have read
          and
          {'\n'} acknowledge our{' '}
          <Text style={styles.hyperLink}>Privacy Policy.</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Theme.DEFAULT_GREY,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: Theme.White,
    margin: 24,
    elevation: 4,
    shadowColor: Theme.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 3,
    ...(deviceInfoModule.isTablet()
      ? {
          width: '60%',
          alignSelf: 'center',
        }
      : {}),
  },
  InputField: {
    width: '90%',
    height: 40,
    margin: 5,
    marginVertical: 10,
  },
  heading: {
    fontSize: 22,
    fontFamily: Fonts.SemiBold,
    marginBottom: 20,
    color: Theme.DARKEST_GREY,
    alignSelf: 'center',
    marginTop: 32,
  },

  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  signupButton: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: Theme.PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  passwordView: {
    marginTop: 16,
  },
  image: {
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  loginButton: {
    marginHorizontal: 24,
    marginTop: 22,
  },
  infoText: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 18,
    color: Theme.DARKEST_GREY,
  },
  endText: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    color: Theme.DARKEST_GREY,
    lineHeight: 25,
  },
  forgotPassword: {
    marginBottom: 20,
  },
  hyperLink: {
    color: Theme.SECONDARY_BLUE,
  },
});

export default LoginScreen;
