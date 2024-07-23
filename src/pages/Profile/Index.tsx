import React from 'react';
import {colors} from '../../utils/Colors';
import {StyleSheet, Text, View, Button} from 'react-native';
import {fonts} from '../../utils/Fonts';
import * as Keychain from 'react-native-keychain';

const Profile = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await Keychain.resetGenericPassword();
      navigation.replace('Splash');
    } catch (error) {
      console.log('Keychain error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    fontFamily: fonts.Regular,
    width: '100%',
  },
});
