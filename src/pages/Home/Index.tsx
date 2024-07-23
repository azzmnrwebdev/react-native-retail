import React, {useEffect, useState} from 'react';
import {fonts} from '../../utils/Fonts';
import {colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {StackNavigationProp} from '@react-navigation/stack';
import CarouselImage from '../../components/CarouselImage/Index';
import HorizontalProductCard from '../../components/HorizontalProductCard/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Modal,
  Alert,
  Animated,
  FlatList,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import VerticalProductCard from '../../components/VerticalProductCard/Index';

type RootStackParamList = {
  Catalog: undefined;
  ShowCart: undefined;
  ShowCategory: {id: string};
  ProdukTerbaru: undefined;
  ProdukTerlaris: undefined;
  ShowProduct: {id: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type CategoryItem = {
  id: string;
  name: string;
  icon: string;
};

// Data Dummy
const images = [
  {
    url: 'https://assets-a1.kompasiana.com/items/album/2020/12/07/read-5fcda9568ede485d98617872.jpg',
  },
  {
    url: 'https://diskerpus.badungkab.go.id/storage/olds/diskerpus/15-Manfaat-Membaca-Buku-dalam-Kehidupan_838618.jpg',
  },
  {
    url: 'https://cdn1-production-images-kly.akamaized.net/TIpuSykzCa6zqGib7rGGAPMdCjs=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3154097/original/087220900_1592297644-collage-female-is-reading-book_1421-3697.jpg',
  },
];

const categories: CategoryItem[] = [
  {id: '1', name: 'Pengaturan', icon: 'cog'},
  {id: '2', name: 'Internet', icon: 'wifi'},
  {id: '3', name: 'Battery', icon: 'battery'},
  {id: '4', name: 'Bluetooth', icon: 'bluetooth'},
  {id: '5', name: 'Mobil', icon: 'car'},
  {id: '6', name: 'Awan', icon: 'cloud'},
  {id: '7', name: 'Kopi', icon: 'coffee'},
  {id: '8', name: 'Database', icon: 'database'},
  {id: '9', name: 'Api', icon: 'fire'},
  {id: '10', name: 'Hadiah', icon: 'gift'},
  {id: '11', name: 'Musik', icon: 'music'},
  {id: '12', name: 'Kesehatan', icon: 'heart-pulse'},
  {id: '13', name: 'Kamera', icon: 'camera'},
  {id: '14', name: 'Pesawat', icon: 'airplane'},
  {id: '15', name: 'Buku', icon: 'book'},
  {id: '16', name: 'Uang', icon: 'cash'},
  {id: '17', name: 'Pendidikan', icon: 'school'},
  {id: '18', name: 'Makanan', icon: 'silverware-fork-knife'},
  {id: '19', name: 'Olahraga', icon: 'football'},
  {id: '20', name: 'Film', icon: 'movie'},
  {id: '21', name: 'Game', icon: 'gamepad-variant'},
  {id: '22', name: 'Fashion', icon: 'tshirt-crew'},
  {id: '23', name: 'Kecantikan', icon: 'spa-outline'},
  {id: '24', name: 'Perjalanan', icon: 'briefcase'},
  {id: '25', name: 'Teknologi', icon: 'laptop'},
  {id: '26', name: 'Rumah', icon: 'home'},
  {id: '27', name: 'Kebersihan', icon: 'broom'},
  {id: '28', name: 'Hobi', icon: 'brush'},
  {id: '29', name: 'Elektronik', icon: 'power-plug'},
  {id: '30', name: 'Pertanian', icon: 'tractor'},
];

const productData = [
  {
    id: '1',
    imageUrl: require('../../assets/images/products/product1.png'),
    productName: 'Produk 1 Produk Produk Produk Produk Produk',
    productPrice: 2800,
    productRating: '4.0',
    totalSold: 100,
  },
  {
    id: '2',
    imageUrl: require('../../assets/images/products/product2.png'),
    productName: 'Produk 2',
    productPrice: 3000,
    productRating: '5.0',
    totalSold: 50,
  },
  {
    id: '3',
    imageUrl: require('../../assets/images/products/product1.png'),
    productName: 'Produk 3',
    productPrice: 5000,
    productRating: '5.0',
    totalSold: 80,
  },
  {
    id: '4',
    imageUrl: require('../../assets/images/products/product2.png'),
    productName: 'Produk 4 Produk Produk Produk Produk Produk Produk Produk',
    productPrice: 5000,
    productRating: '5.0',
    totalSold: 125,
  },
  {
    id: '5',
    imageUrl: require('../../assets/images/products/product1.png'),
    productName: 'Produk 5 Produk Produk Produk Produk Produk',
    productPrice: 5000,
    productRating: '5.0',
    totalSold: 35,
  },
  {
    id: '6',
    imageUrl: require('../../assets/images/products/product2.png'),
    productName: 'Produk 6',
    productPrice: 5000,
    productRating: '5.0',
    totalSold: 35,
  },
  {
    id: '7',
    imageUrl: require('../../assets/images/products/product1.png'),
    productName: 'Produk 7',
    productPrice: 5000,
    productRating: '5.0',
    totalSold: 35,
  },
  {
    id: '8',
    imageUrl: require('../../assets/images/products/product2.png'),
    productName: 'Produk 8 Produk Produk Produk Produk Produk Produk Produk',
    productPrice: 5000,
    productRating: '5.0',
    totalSold: 35,
  },
  {
    id: '9',
    imageUrl: require('../../assets/images/products/product1.png'),
    productName: 'Produk 9 Produk Produk Produk Produk Produk',
    productPrice: 5000,
    productRating: '5.0',
    totalSold: 35,
  },
  {
    id: '10',
    imageUrl: require('../../assets/images/products/product2.png'),
    productName: 'Produk 10',
    productPrice: 5000,
    productRating: '5.0',
    totalSold: 35,
  },
];

// Global Helper Functions
const AnimatedMaterialCommunityIcons = Animated.createAnimatedComponent(
  MaterialCommunityIcons,
);

const statusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 20;

const Home: React.FC = () => {
  const carouselHeight = 200;
  const colorScheme = useColorScheme();
  const navigation = useNavigation<NavigationProp>();

  const [scrollY] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [barStyle, setBarStyle] = useState<'light-content' | 'dark-content'>(
    'light-content',
  );

  useEffect(() => {
    const listener = scrollY.addListener(({value}) => {
      if (value >= 50) {
        setBarStyle('dark-content');
      } else {
        setBarStyle('light-content');
      }
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  const handleSearch = () => {
    // TODO: ganti url ke halaman Catalog
    // navigation.navigate('Catalog');
    Alert.alert('Pencarian belum tersedia, nanti dialihkan ke halaman catalog');
  };

  const handleCart = () => {
    // TODO: ganti url ke halaman Cart
    // navigation.navigate('ShowCart');
    Alert.alert(
      'Keranjang belum tersedia, nanti dialihkan ke halaman keranjang',
    );
  };

  const handleShowCategory = (id: string) => {
    // navigation.navigate('ShowCategory', {id});
    Alert.alert(`id kategori: ${id}, nanti dialihkan ke detail kategori`);
  };

  const handleSeeAll = (section: 'ProdukTerlaris' | 'ProdukTerbaru') => {
    // navigation.navigate(section);
    Alert.alert(`nama route: ${section}`);
  };

  const handleShowProduct = (id: string) => {
    // navigation.navigate('ShowProduct', {id});
    Alert.alert(`id produk: ${id}, nanti dialihkan ke detail produk`);
  };

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  // Helpers Functions
  const textStyle = {
    color: colorScheme === 'dark' ? colors.dark : '',
  };

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['transparent', '#ffffff'],
    extrapolate: 'clamp',
  });

  const colorStyle = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['#ffffff', '#F5F5F5'],
    extrapolate: 'clamp',
  });

  const iconColor = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['#ffffff', colors.info],
    extrapolate: 'clamp',
  });

  // Category
  const categorySlides = [];
  for (let i = 0; i < categories.length; i += 10) {
    categorySlides.push(categories.slice(i, i + 10));
  }

  const renderCategoryItem = ({item}: {item: CategoryItem}) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleShowCategory(item.id)}
      activeOpacity={1}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={item.icon}
          size={20}
          color={colors.info}
        />
      </View>
      <Text style={[styles.categoryText, textStyle]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.container}>
        {/* Input dan Icon Keranjang */}
        <Animated.View style={[styles.headerContainer, {backgroundColor}]}>
          <Animated.Text
            style={[
              styles.inputLabel,
              {backgroundColor: colorStyle},
              textStyle,
            ]}
            onPress={handleSearch}>
            Cari Produk?
          </Animated.Text>
          <TouchableOpacity onPress={handleCart} activeOpacity={1}>
            <AnimatedMaterialCommunityIcons
              name="cart-outline"
              size={24}
              color={iconColor}
              style={{marginRight: 14}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCart} activeOpacity={1}>
            <AnimatedMaterialCommunityIcons
              name="bell-outline"
              size={24}
              color={iconColor}
            />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={styles.scrollView}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}>
          {/* Carousel Header */}
          <CarouselImage
            images={images}
            carouselHeight={carouselHeight}
            onImagePress={openModal}
          />

          {/* Category */}
          <FlatList
            data={categorySlides}
            renderItem={({item}: {item: CategoryItem[]}) => (
              <View style={styles.slide}>
                {item.map((category, index) => (
                  <View key={index} style={styles.categoryItemContainer}>
                    {renderCategoryItem({item: category})}
                  </View>
                ))}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />

          {/* Produk Terlaris */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle]}>Produk Terlaris</Text>
              <TouchableOpacity
                onPress={() => handleSeeAll('ProdukTerlaris')}
                activeOpacity={1}>
                <Text style={styles.seeAll}>Lihat Semua {' >'}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {productData.map((product, index) => (
                <HorizontalProductCard
                  key={index}
                  imageUrl={product.imageUrl}
                  productName={product.productName}
                  productPrice={product.productPrice}
                  productRating={product.productRating}
                  totalSold={product.totalSold}
                  onPress={() => handleShowProduct(product.id)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Break */}
          <View style={styles.break}>{/*  */}</View>

          {/* Produk Terbaru */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle]}>Produk Terbaru</Text>
              <TouchableOpacity
                onPress={() => handleSeeAll('ProdukTerbaru')}
                activeOpacity={1}>
                <Text style={styles.seeAll}>Lihat Semua {' >'}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {productData.map((product, index) => (
                <HorizontalProductCard
                  key={index}
                  imageUrl={product.imageUrl}
                  productName={product.productName}
                  productPrice={product.productPrice}
                  productRating={product.productRating}
                  totalSold={product.totalSold}
                  onPress={() => handleShowProduct(product.id)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Break */}
          <View style={styles.break}>{/*  */}</View>

          {/* Produk Lainnya */}
          <View style={[styles.section, {paddingBottom: 14}]}>
            <View style={[styles.sectionHeader, {marginBottom: 6}]}>
              <Text style={[styles.sectionTitle]}>Produk Lainnya</Text>
            </View>

            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {productData.map((product, index) => (
                <View
                  key={index}
                  style={{
                    width: (Dimensions.get('window').width - 36) / 2,
                  }}>
                  <VerticalProductCard
                    imageUrl={product.imageUrl}
                    productName={product.productName}
                    productPrice={product.productPrice}
                    productRating={product.productRating}
                    totalSold={product.totalSold}
                    onPress={() => handleShowProduct(product.id)}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <ImageViewer imageUrls={images} index={selectedImageIndex} />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  break: {
    height: 12,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingBottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: statusBarHeight,
    justifyContent: 'space-between',
  },
  inputLabel: {
    flex: 1,
    paddingLeft: 16,
    marginRight: 10,
    paddingVertical: 8,
  },
  slide: {
    flexWrap: 'wrap',
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    backgroundColor: '#f0fdfa',
    width: Dimensions.get('window').width,
  },
  categoryItemContainer: {
    width: '20%',
    marginVertical: 8,
  },
  categoryItem: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    elevation: 3,
    marginBottom: 8,
    shadowRadius: 4,
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowOffset: {width: 0, height: 2},
  },
  categoryText: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: fonts.Medium,
  },
  section: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.info,
    fontFamily: fonts.Regular,
    textTransform: 'uppercase',
  },
  seeAll: {
    fontSize: 10,
    color: colors.secondary,
    fontFamily: fonts.Regular,
  },
});
