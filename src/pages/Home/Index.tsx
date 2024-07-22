import {colors} from '../../utils/Colors';
import React, {useState} from 'react';
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
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ImageViewer from 'react-native-image-zoom-viewer';
import CarouselImage from '../../components/CarouselImage/Index';
import {fonts} from '../../utils/Fonts';
import HorizontalProductCard from '../../components/HorizontalProductCard/Index';

type RootStackParamList = {
  Search: undefined;
  ShowCart: undefined;
  ShowCategory: {id: string};
  ProdukTerbaru: undefined;
  ProdukTerlaris: undefined;
  ShowProduct: {id: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

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

const categories = [
  {id: '1', name: 'Kategori Pengaturan', icon: 'cog'},
  {id: '2', name: 'Kategori Wifi', icon: 'wifi'},
  {id: '3', name: 'Kategori Battery', icon: 'battery-half'},
  {id: '4', name: 'Kategori Bluetooth', icon: 'bluetooth'},
  {id: '5', name: 'Kategori Mobil', icon: 'car'},
  {id: '6', name: 'Kategori Awan', icon: 'cloud'},
  {id: '7', name: 'Kategori Kopi', icon: 'coffee'},
  {id: '8', name: 'Kategori Database', icon: 'database'},
  {id: '9', name: 'Kategori Api', icon: 'fire'},
  {id: '10', name: 'Kategori Hadiah', icon: 'gift'},
  {id: '11', name: 'Kategori Musik', icon: 'music'},
  {id: '12', name: 'Kategori Kesehatan', icon: 'heartbeat'},
  {id: '13', name: 'Kategori Kamera', icon: 'camera'},
  {id: '14', name: 'Kategori Pesawat', icon: 'plane'},
  {id: '15', name: 'Kategori Buku', icon: 'book'},
  {id: '16', name: 'Kategori Uang', icon: 'money-bill'},
  {id: '17', name: 'Kategori Pendidikan', icon: 'graduation-cap'},
  {id: '18', name: 'Kategori Makanan', icon: 'utensils'},
  {id: '19', name: 'Kategori Olahraga', icon: 'football-ball'},
  {id: '20', name: 'Kategori Film', icon: 'film'},
  {id: '21', name: 'Kategori Game', icon: 'gamepad'},
  {id: '22', name: 'Kategori Fashion', icon: 'tshirt'},
  {id: '23', name: 'Kategori Kecantikan', icon: 'spa'},
  {id: '24', name: 'Kategori Perjalanan', icon: 'suitcase'},
  {id: '25', name: 'Kategori Teknologi', icon: 'laptop'},
  {id: '26', name: 'Kategori Rumah', icon: 'home'},
  {id: '27', name: 'Kategori Kebersihan', icon: 'broom'},
  {id: '28', name: 'Kategori Hobi', icon: 'paint-brush'},
  {id: '29', name: 'Kategori Elektronik', icon: 'plug'},
  {id: '30', name: 'Kategori Pertanian', icon: 'tractor'},
];

const productData = [
  {
    id: '1',
    imageUrl: require('../../assets/images/products/product1.png'),
    productName: 'Air Mineral Air Mineral Air Mineral Air Mineral Air Mineral',
    productPrice: 2800,
    productRating: 4,
  },
  {
    id: '2',
    imageUrl: require('../../assets/images/products/product2.png'),
    productName: 'Mie Goreng',
    productPrice: 3000,
    productRating: 5,
  },
  {
    id: '3',
    imageUrl: require('../../assets/images/products/product1.png'),
    productName: 'Sabun Mandi',
    productPrice: 5000,
    productRating: 5,
  },
  {
    id: '4',
    imageUrl: require('../../assets/images/products/product2.png'),
    productName: 'Chimory Fresh Milk',
    productPrice: 5000,
    productRating: 5,
  },
  {
    id: '5',
    imageUrl: require('../../assets/images/products/product1.png'),
    productName: 'Yakult',
    productPrice: 5000,
    productRating: 5,
  },
];

const AnimatedFontAwesome5 = Animated.createAnimatedComponent(FontAwesome5);

const Home: React.FC = () => {
  const carouselHeight = 200;
  const colorScheme = useColorScheme();
  const scrollY = new Animated.Value(0);
  const navigation = useNavigation<NavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleSearch = () => {
    // TODO: ganti url ke halaman Catalog
    // navigation.navigate('Splash');
    Alert.alert('Pencarian belum tersedia, nanti dialihkan ke halaman catalog');
  };

  const handleCart = () => {
    // TODO: ganti url ke halaman Cart
    // navigation.navigate('Splash');
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

  // Helpers
  const textStyle = {
    color: colorScheme === 'dark' ? colors.dark : '',
  };

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['transparent', '#ffffff'],
    extrapolate: 'clamp',
  });

  const colorStyle = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['#ffffff', '#c8c8c8'],
    extrapolate: 'clamp',
  });

  // Category
  const categorySlides = [];
  for (let i = 0; i < categories.length; i += 10) {
    categorySlides.push(categories.slice(i, i + 10));
  }

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleShowCategory(item.id)}
      activeOpacity={1}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name={item.icon} size={16} color={colors.primary} />
      </View>
      <Text style={[styles.categoryText, textStyle]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {/* Input dan Icon Keranjang */}
        <Animated.View style={[styles.inputContainer, {backgroundColor}]}>
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
            <AnimatedFontAwesome5
              name="shopping-cart"
              size={24}
              color={colorStyle}
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
            renderItem={({item}) => (
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
              <Text style={[styles.sectionTitle, textStyle]}>
                Produk Terlaris
              </Text>
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
              <Text style={[styles.sectionTitle, textStyle]}>
                Produk Terbaru
              </Text>
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
                  onPress={() => handleShowProduct(product.id)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Break */}
          <View style={styles.break}>{/*  */}</View>

          {/* Produk Lainnya */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, textStyle]}>
                Produk Lainnya
              </Text>
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
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
  },
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  break: {
    height: 12,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  inputLabel: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 16,
    marginRight: 16,
    borderRadius: 20,
  },
  slide: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: '#eff6ff',
  },
  categoryItemContainer: {
    width: '20%',
    marginVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    textAlign: 'center',
    fontFamily: fonts.Medium,
    fontSize: 10,
  },
  section: {
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: fonts.Medium,
    textTransform: 'uppercase',
  },
  seeAll: {
    color: colors.primaryHover,
    fontSize: 10,
    fontFamily: fonts.Regular,
  },
});
