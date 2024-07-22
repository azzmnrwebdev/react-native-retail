import {colors} from '../../utils/Colors';
import React, {useEffect, useRef} from 'react';
import * as Keychain from 'react-native-keychain';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Animated,
  useColorScheme,
  StatusBar,
} from 'react-native';
import {fonts} from '../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';

type RootStackParamList = {
  Splash: undefined;
  MainApp: undefined;
  Login: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

const Splash = ({navigation}: Props) => {
  const colorScheme = useColorScheme();
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();

        if (credentials) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.log('Keychain error:', error);
        navigation.replace('Login');
      }
    };

    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
      checkLoginStatus();
    });
  }, [navigation, scaleValue]);

  const textStyle = {
    color: colorScheme === 'light' ? 'white' : '',
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <LinearGradient
        colors={[colors.primary, '#ffffff']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Animated.Text
          style={[styles.text, {transform: [{scale: scaleValue}]}, textStyle]}>
          Retail
        </Animated.Text>
      </LinearGradient>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    textTransform: 'uppercase',
    fontFamily: fonts.Bold,
    color: colors.white,
  },
});
