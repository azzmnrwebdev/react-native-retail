import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

type RootStackParamList = {
  Profile: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ScanBarcode = () => {
  const device = useCameraDevice('back');
  const navigation = useNavigation<NavigationProp>();
  const {hasPermission, requestPermission} = useCameraPermission();
  const [latestScannedData, setLatestScannedData] = useState<string | null>(
    null,
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      if (codes[0]?.value) {
        // Update the state with the latest scanned data
        setLatestScannedData(codes[0].value);
        console.log(codes[0].value);
      }
    },
  });

  useEffect(() => {
    const checkPermission = async () => {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            'Permission Denied',
            'Camera permission is required to scan barcodes.',
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

  if (!device) {
    Alert.alert('Device Not Found', 'No camera device found.', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Profile'),
      },
    ]);

    return null;
  }

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
      />

      {latestScannedData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Latest Scanned Code:</Text>
          <Text style={styles.resultText}>{latestScannedData}</Text>
        </View>
      )}
    </View>
  );
};

export default ScanBarcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  resultText: {
    fontSize: 14,
    color: 'white',
  },
});
