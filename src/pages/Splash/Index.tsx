import {colors} from '../../utils/Colors';
import React, {useEffect} from 'react';
import * as Keychain from 'react-native-keychain';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, View, StatusBar, Image} from 'react-native';
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

    const timer = setTimeout(() => {
      checkLoginStatus();
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <LinearGradient
        colors={[colors.info, colors.info]}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Image
          source={require('../../assets/images/logo_white.png')}
          style={styles.logo}
          resizeMode="contain"
        />
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
  logo: {
    width: 160,
    height: 160,
  },
});
