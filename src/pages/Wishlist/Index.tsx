import React from 'react';
import {colors} from '../../utils/Colors';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../../utils/Fonts';

const Wishlist = () => {
  return (
    <View style={styles.container}>
      <Text>Wishlist</Text>
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.white,
    paddingHorizontal: 16,
    fontFamily: fonts.Regular,
    width: '100%',
  },
});
