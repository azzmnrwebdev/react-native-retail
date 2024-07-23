import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fonts} from '../../utils/Fonts';
import {colors} from '../../utils/Colors';

interface HorizontalProductCardProps {
  imageUrl: any;
  productName: string;
  productPrice: number;
  productRating: string;
  totalSold: number;
  onPress?: () => void;
}

const HorizontalProductCard: React.FC<HorizontalProductCardProps> = ({
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

const cardWidth = Dimensions.get('window').width * 0.35;
const aspectRatio = 4 / 3;
const imageHeight = cardWidth / aspectRatio;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    marginHorizontal: 8,
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: imageHeight,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -2,
  },
  soldText: {
    fontSize: 10,
    color: '#888',
    marginLeft: 3,
    marginBottom: -3,
    fontFamily: fonts.Regular,
  },
});

export default HorizontalProductCard;
