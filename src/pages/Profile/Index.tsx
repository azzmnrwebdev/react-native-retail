import {fonts} from '../../utils/Fonts';
import {colors} from '../../utils/Colors';
import React, {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import Header from '../../components/Header/Index';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  StyleSheet,
  Text,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  View,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Animated,
} from 'react-native';

type RootStackParamList = {
  Splash: undefined;
  MonthExpenses: undefined;
  EditProfile: undefined;
  ScanQRCode: undefined;
  Profile: {message?: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
type ProfileRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const statusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 20;

const Profile = () => {
  const colorScheme = useColorScheme();
  const route = useRoute<ProfileRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [scrollY] = useState(new Animated.Value(0));
  const [headerHeight, setHeaderHeight] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const toastOpacity = useState(new Animated.Value(0))[0];
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.message) {
      setToastVisible(true);
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(toastOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setToastVisible(false);
          });
        }, 3000);
      });
    }
  }, [route.params, toastOpacity]);

  // Handle Function
  const handleHeaderLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  const handlePreviewImage = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCurrentMonthExpenses = () => {
    // TODO: ganti url ke halaman MonthExpenses
    // navigation.navigate('MonthExpenses');
    Alert.alert('Detail pengeluaran bulan ini belum tersedia');
  };

  const handleEditProfile = () => {
    // TODO: ganti url ke halaman EditProfile
    // navigation.navigate('EditProfile');
    Alert.alert('Ubah profil belum tersedia');
  };

  const handleScanQrCode = () => {
    navigation.navigate('ScanQRCode');
  };

  const handleLogout = async () => {
    try {
      await Keychain.resetGenericPassword();
      navigation.replace('Splash');
    } catch (error) {
      console.log('Keychain error:', error);
    }
  };

  // Helpers Functions
  const textDark = {
    color: colorScheme === 'dark' ? colors.dark : '',
  };

  const backgroundHeader = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['#ffffff', '#ffffff'],
    extrapolate: 'clamp',
  });

  const iconColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [colors.info, colors.info],
    extrapolate: 'clamp',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Data Menus
  const menuItems = [
    {
      name: 'Ubah Profil',
      icon: 'account-edit-outline',
      onPress: handleEditProfile,
    },
    {name: 'Scan QR Code', icon: 'qrcode-scan', onPress: handleScanQrCode},
    {name: 'Keluar Aplikasi', icon: 'exit-run', onPress: handleLogout},
  ];

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <Header
        bgHeader={backgroundHeader}
        titlePage={'Akun Saya'}
        textDark={textDark}
        iconColor={iconColor}
        onLayout={handleHeaderLayout}
      />

      <ScrollView
        bounces={false}
        bouncesZoom={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: headerHeight}}>
        {/* Break */}
        <View style={styles.break} />

        {/* Profile */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={handlePreviewImage} activeOpacity={1}>
              <Image
                source={require('../../assets/images/profile/person.jpg')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={[styles.roleText, textDark]}>Agen</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={[styles.profileName, textDark]}>
              Muhammad Azzam Nur Alwi Mansyur
            </Text>
            <Text style={[styles.profileText, textDark]}>081234567891</Text>
            <Text style={[styles.profileText, textDark]}>
              azzmnrwebdev@gmail.com
            </Text>
            <Text style={[styles.profileText, textDark]}>
              Pasar Minggu, Jakarta Selatan
            </Text>
          </View>
        </View>

        {/* Break */}
        <View style={styles.break} />

        {/* Pengeluaran Bulan Ini */}
        <View style={[styles.section]}>
          <View style={[styles.sectionHeader]}>
            <Text style={[styles.sectionTitle]}>Pengeluaran Bulan Ini</Text>
            <TouchableOpacity
              onPress={handleCurrentMonthExpenses}
              activeOpacity={1}>
              <Text style={styles.seeAll}>Lihat Semua {'>'}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                paddingTop: 14,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                size={48}
                name="basket"
                color={colors.primary}
                style={{marginBottom: 8}}
              />
              <Text style={[{fontFamily: fonts.SemiBold}, textDark]}>
                Jumlah Barang
              </Text>
              <Text style={[{fontFamily: fonts.Regular}, textDark]}>50</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 14,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                size={48}
                name="cash"
                color={colors.success}
                style={{marginBottom: 8}}
              />
              <Text style={[{fontFamily: fonts.SemiBold}, textDark]}>
                Total Harga
              </Text>
              <Text style={[{fontFamily: fonts.Regular}, textDark]}>
                {formatPrice(10000000)}
              </Text>
            </View>
          </View>
        </View>

        {/* Break */}
        <View style={styles.break} />

        {/* List Menu */}
        <View>
          {menuItems.map((item, index) => (
            <View
              key={index}
              style={[
                styles.menuItem,
                index !== menuItems.length - 1 && styles.menuItemBorder,
              ]}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={item.onPress}
                activeOpacity={1}>
                <View style={styles.iconTextContainer}>
                  <MaterialCommunityIcons
                    size={24}
                    color={colors.dark}
                    name={item.icon}
                    style={styles.icon}
                  />
                  <Text style={[styles.text, textDark]}>{item.name}</Text>
                </View>
                <MaterialCommunityIcons
                  size={20}
                  color={colors.dark}
                  name="chevron-right"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Break */}
        <View style={styles.break} />
      </ScrollView>

      {toastVisible && (
        <Animated.View style={[styles.toast, {opacity: toastOpacity}]}>
          <Text style={styles.toastText}>{route.params.message}</Text>
        </Animated.View>
      )}

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
              activeOpacity={1}>
              <MaterialCommunityIcons
                name="close-circle"
                size={36}
                color={colors.white}
              />
            </TouchableOpacity>
            <Image
              style={styles.fullImage}
              source={require('../../assets/images/profile/person.jpg')}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  break: {
    height: 10,
    backgroundColor: '#F5F5F5',
  },
  profileContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    backgroundColor: colors.white,
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  roleText: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: fonts.Medium,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
    fontFamily: fonts.Medium,
  },
  profileText: {
    fontSize: 14,
    fontFamily: fonts.Regular,
  },
  editIconContainer: {
    marginTop: 2,
    marginLeft: 12,
  },
  section: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
  },
  sectionHeader: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.info,
    fontFamily: fonts.Regular,
  },
  seeAll: {
    fontSize: 10,
    color: colors.secondary,
    fontFamily: fonts.Regular,
  },
  menuItem: {
    paddingLeft: 13,
    paddingRight: 8,
    backgroundColor: colors.white,
  },
  menuItemBorder: {
    borderBottomColor: '#d1d5db',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  touchable: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.Regular,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullImage: {
    width: '100%',
    maxHeight: '80%',
    resizeMode: 'cover',
  },
  closeButton: {
    marginLeft: 336,
    marginBottom: 10,
  },
  toast: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    backgroundColor: '#d0f0f5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  toastText: {
    fontSize: 14,
    color: colors.info,
    fontFamily: fonts.Medium,
  },
});
