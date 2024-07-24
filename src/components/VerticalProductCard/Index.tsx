import React from 'react';
import {fonts} from '../../utils/Fonts';
import {colors} from '../../utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

interface VerticalProductCardProps {
  imageUrl: any;
  productName: string;
  productPrice: number;
  productRating: string;
  totalSold: number;
  onPress?: () => void;
}

const VerticalProductCard: React.FC<VerticalProductCardProps> = ({
  imageUrl,
  productName,
  productPrice,
  productRating,
  totalSold,
  onPress,
}) => {
  const colorScheme = useColorScheme();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const textStyle = {
    color: colorScheme === 'dark' ? colors.dark : '',
  };

  return (
    <TouchableOpacity style={[styles.card]} onPress={onPress} activeOpacity={1}>
      <Image source={imageUrl} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, textStyle]} numberOfLines={2}>
          {productName}
        </Text>
        <Text style={[styles.price]}>{formatPrice(productPrice)}</Text>
        <View style={styles.rating}>
          <MaterialCommunityIcons name="star" size={12} color="#FFCC00" />
          <Text style={styles.soldText}>
            {productRating} | {totalSold} terjual
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 10,
    borderColor: '#F5F5F5',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    height: 150,
    width: '100%',
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fonts.Regular,
  },
  price: {
    fontSize: 14,
    marginTop: 6,
    color: colors.info,
    fontFamily: fonts.Regular,
  },
  rating: {
    marginTop: -2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  soldText: {
    fontSize: 10,
    color: '#888',
    marginLeft: 3,
    marginBottom: -3,
    fontFamily: fonts.Regular,
  },
});

export default VerticalProductCard;
