import React, {useState} from 'react';
import {fonts} from '../../utils/Fonts';
import {colors} from '../../utils/Colors';
import * as Keychain from 'react-native-keychain';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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
} from 'react-native';

type RootStackParamList = {
  Splash: undefined;
  EditProfile: undefined;
  ScanBarcode: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const statusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 20;

const Profile = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<NavigationProp>();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditProfile = () => {
    // TODO: ganti url ke halaman EditProfile
    // navigation.navigate('EditProfile');
    Alert.alert(
      'Ubah profil belum tersedia, nanti dialihkan ke halaman ubah profil',
    );
  };

  const handleScanAbsensi = () => {
    navigation.navigate('ScanBarcode');
  };

  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
  const textStyle = {
    color: colorScheme === 'dark' ? colors.dark : '',
  };

  // Data Menus
  const menuItems = [
    {
      name: 'Ubah Profil',
      icon: 'account-edit-outline',
      onPress: handleEditProfile,
    },
    {name: 'Scan Kunjungan', icon: 'qrcode-scan', onPress: handleScanAbsensi},
    {name: 'Keluar Aplikasi', icon: 'exit-run', onPress: handleLogout},
  ];

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View
        style={styles.headerContainer}
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}>
        <Text style={[styles.headerTitle, textStyle]}>Akun Saya</Text>
      </View>

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
            <TouchableOpacity onPress={handleImagePress} activeOpacity={1}>
              <Image
                source={require('../../assets/images/profile/person.jpg')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={[styles.roleText, textStyle]}>Agen</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={[styles.profileName, textStyle]}>
              Muhammad Azzam Nur Alwi Mansyur
            </Text>
            <Text style={[styles.profileText, textStyle]}>081234567891</Text>
            <Text style={[styles.profileText, textStyle]}>
              azzmnrwebdev@gmail.com
            </Text>
            <Text style={[styles.profileText, textStyle]}>
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
            <TouchableOpacity activeOpacity={1}>
              <Text style={styles.seeAll}>Lihat Semua {'>'}</Text>
            </TouchableOpacity>
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
                  <Text style={[styles.text, textStyle]}>{item.name}</Text>
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
      </ScrollView>

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
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingTop: statusBarHeight + 10,
    paddingBottom: statusBarHeight - 22,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.Medium,
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
    paddingHorizontal: 8,
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
});
