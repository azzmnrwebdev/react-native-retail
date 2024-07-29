import React from 'react';
import {fonts} from '../../utils/Fonts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Alert,
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type HeaderProps = {
  bgHeader: any;
  bgInput?: any;
  titlePage?: any;
  iconColor?: any;
  textDark?: object;
  onLayout?: (event: any) => void;
};

type RootStackParamList = {
  Cart: undefined;
  Catalog: undefined;
  Notification: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const AnimatedMaterialCommunityIcons = Animated.createAnimatedComponent(
  MaterialCommunityIcons,
);

const statusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 20;

const Header: React.FC<HeaderProps> = ({
  bgHeader,
  bgInput,
  iconColor,
  textDark,
  titlePage,
  onLayout,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleCatalog = () => {
    // TODO: ganti url ke halaman Catalog
    // navigation.navigate('Catalog');
    Alert.alert('Katalog belum tersedia');
  };

  const handleCart = () => {
    // TODO: ganti url ke halaman Cart
    // navigation.navigate('Cart');
    Alert.alert('Keranjang belum tersedia');
  };

  const handleNotification = () => {
    // TODO: ganti url ke halaman Notification
    // navigation.navigate('Notification');
    Alert.alert('Notifikasi belum tersedia');
  };

  return (
    <Animated.View
      style={[styles.headerContainer, {backgroundColor: bgHeader}]}
      onLayout={onLayout}>
      {bgInput && (
        <Animated.Text
          style={[styles.input, {backgroundColor: bgInput}, textDark]}
          onPress={handleCatalog}>
          Cari Produk?
        </Animated.Text>
      )}

      {titlePage && textDark && (
        <Text
          style={[
            textDark,
            {
              flex: 1,
              fontSize: 16,
              paddingTop: 8,
              paddingLeft: 12,
              fontFamily: fonts.Medium,
            },
          ]}>
          {titlePage}
        </Text>
      )}

      {iconColor && (
        <>
          <TouchableOpacity onPress={handleCart} activeOpacity={1}>
            <AnimatedMaterialCommunityIcons
              size={24}
              color={iconColor}
              name="cart-variant"
              style={{marginRight: 12}}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNotification} activeOpacity={1}>
            <AnimatedMaterialCommunityIcons
              size={24}
              name="bell-outline"
              color={iconColor}
              style={{marginRight: 12}}
            />
          </TouchableOpacity>
        </>
      )}
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingBottom: 10,
    overflow: 'hidden',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: statusBarHeight + 48,
    maxHeight: statusBarHeight + 48,
    justifyContent: 'space-between',
    paddingTop: statusBarHeight + 0,
  },
  input: {
    flex: 1,
    paddingLeft: 12,
    marginRight: 10,
    paddingVertical: 8,
  },
});
