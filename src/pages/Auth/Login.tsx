import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  useColorScheme,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '../../utils/Colors';
import {fonts} from '../../utils/Fonts';

type RootStackParamList = {
  Splash: undefined;
  MainApp: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

const Login = ({navigation}: Props) => {
  const colorScheme = useColorScheme();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPinFocused, setIsPinFocused] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [isLoginButtonFocused, setIsLoginButtonFocused] = useState(false);
  const [isGoogleButtonFocused, setIsGoogleButtonFocused] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (phone === '123456' && pin === '123456') {
      try {
        await Keychain.setGenericPassword(phone, 'dummy-auth-token');
        navigation.replace('MainApp');
      } catch (error) {
        console.log('Error saving token:', error);
      }
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  const handleLoginWithGoogle = async () => {
    Alert.alert('Belum tersedia');
  };

  const handleForgotPassword = () => {
    // TODO: ganti url ke halaman Lupa Password
    // navigation.navigate('Splash');
    Alert.alert('Belum tersedia');
  };

  const handleRegister = () => {
    // TODO: ganti url ke halaman Register
    // navigation.navigate('Splash');
    Alert.alert('Belum tersedia');
  };

  const handlePinChange = (text: any) => {
    const cleanedPin = text.replace(/[^0-9]/g, '');
    setPin(cleanedPin);
  };

  const textStyle = {
    color: colorScheme === 'dark' ? colors.dark : '',
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={[styles.container]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="always">
          <View style={styles.inner}>
            <Text style={[styles.title, textStyle]}>Login</Text>
            <View style={styles.formGroup}>
              <Text style={[styles.label, textStyle]}>Nomor Handphone</Text>
              <TextInput
                style={[
                  styles.input,
                  isPhoneFocused && styles.inputFocused,
                  textStyle,
                ]}
                placeholder="cth: 08123456789"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
              />
            </View>
            <View style={[styles.formGroup, styles.lastFormGroup]}>
              <Text style={[styles.label, textStyle]}>PIN</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    isPinFocused && styles.inputFocused,
                    styles.passwordInput,
                    textStyle,
                  ]}
                  placeholder="cth: 123456"
                  placeholderTextColor="#999"
                  value={pin}
                  onChangeText={handlePinChange}
                  secureTextEntry={!showPin}
                  onFocus={() => setIsPinFocused(true)}
                  onBlur={() => setIsPinFocused(false)}
                  keyboardType="numeric"
                  maxLength={6}
                />
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => setShowPin(!showPin)}>
                  <Icon
                    name={showPin ? 'eye-slash' : 'eye'}
                    size={18}
                    color={colors.dark}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={[styles.forgetPassLink]}
              onPress={handleForgotPassword}>
              Lupa PIN?
            </Text>
            <TouchableWithoutFeedback
              onPressIn={() => setIsLoginButtonFocused(true)}
              onPressOut={() => setIsLoginButtonFocused(false)}
              onPress={handleLogin}>
              <View
                style={[
                  styles.loginButton,
                  isLoginButtonFocused && styles.loginButtonFocused,
                ]}>
                <Text style={styles.loginButtonText}>Masuk</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={[styles.separatorText, textStyle]}>
                atau masuk dengan
              </Text>
              <View style={styles.separatorLine} />
            </View>
            <TouchableWithoutFeedback
              onPressIn={() => setIsGoogleButtonFocused(true)}
              onPressOut={() => setIsGoogleButtonFocused(false)}
              onPress={handleLoginWithGoogle}>
              <View
                style={[
                  styles.googleButton,
                  isGoogleButtonFocused && styles.googleButtonFocused,
                ]}>
                <Image
                  source={require('../../assets/images/flat-color-icons_google.png')}
                  style={styles.googleLogo}
                />
                <Text style={styles.googleButtonText}>Google</Text>
              </View>
            </TouchableWithoutFeedback>
            {!keyboardVisible && (
              <View style={styles.registerContainer}>
                <Text style={[styles.registerText, textStyle]}>
                  Belum punya akun?{' '}
                </Text>
                <Text style={styles.registerLink} onPress={handleRegister}>
                  Daftar Sekarang
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f0fdfa',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 56,
    fontFamily: fonts.Regular,
  },
  inner: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.Bold,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 48,
  },
  formGroup: {
    marginBottom: 16,
    width: '100%',
  },
  lastFormGroup: {
    marginBottom: 0,
  },
  label: {
    marginBottom: 8,
    fontFamily: fonts.Medium,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.secondary,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  inputFocused: {
    borderColor: colors.info,
  },
  forgetPassLink: {
    marginTop: 14,
    marginBottom: 14,
    textAlign: 'right',
    fontFamily: fonts.Regular,
    color: colors.info,
    width: '100%',
  },
  loginButton: {
    backgroundColor: colors.info,
    paddingVertical: 12,
    borderRadius: 5,
    width: '100%',
  },
  loginButtonFocused: {
    backgroundColor: colors.infoHover,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.white,
    textAlign: 'center',
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    top: 10,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    paddingRight: 40,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 10,
    fontFamily: fonts.Regular,
  },
  googleButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.info,
    paddingVertical: 12,
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonFocused: {
    backgroundColor: colors.white,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.dark,
    textAlign: 'center',
    marginLeft: 10,
  },
  googleLogo: {
    marginTop: -2,
    width: 28,
    height: 28,
  },
  registerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
  registerText: {
    fontFamily: fonts.Medium,
  },
  registerLink: {
    fontFamily: fonts.SemiBold,
    color: colors.info,
  },
});
