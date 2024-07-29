import {colors} from '../../utils/Colors';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

type RootStackParamList = {
  Profile: {message: string} | undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const statusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 20;

const ScanQRCode = () => {
  const device = useCameraDevice('back');
  const navigation = useNavigation<NavigationProp>();
  const {hasPermission, requestPermission} = useCameraPermission();
  const [torchEnabled, setTorchEnabled] = useState(false);

  const isValidJson = (str: string): boolean => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-8', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      if (codes[0]?.value) {
        // fetch data
        console.log(codes[0].value);

        if (!isValidJson(codes[0].value)) {
          navigation.navigate('Profile', {message: 'QR Code tidak sesuai'});
        }
      }
    },
  });

  useEffect(() => {
    const checkPermission = async () => {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            'Izin ditolak',
            'Izin kamera diperlukan untuk memindai kode batang.',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Profile'),
              },
            ],
          );
        }
      }
    };

    checkPermission();
  }, [hasPermission, requestPermission, navigation]);

  const toggleTorch = () => {
    setTorchEnabled(prevTorchEnabled => !prevTorchEnabled);
  };

  if (!device) {
    Alert.alert(
      'Perangkat Tidak Ditemukan',
      'Tidak ada perangkat kamera yang ditemukan.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Profile'),
        },
      ],
    );

    return null;
  }

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.info}
        translucent
      />

      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
        torch={torchEnabled ? 'on' : 'off'}
      />

      <View style={styles.topOverlay}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => navigation.goBack()}
          activeOpacity={1}>
          <MaterialCommunityIcons
            size={20}
            color={colors.info}
            name="arrow-left"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.topButton}
          onPress={toggleTorch}
          activeOpacity={1}>
          <MaterialCommunityIcons
            size={20}
            color={colors.info}
            name={torchEnabled ? 'flashlight-off' : 'flashlight'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ScanQRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topOverlay: {
    top: 56,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  topButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#f0fdfa',
  },
});
