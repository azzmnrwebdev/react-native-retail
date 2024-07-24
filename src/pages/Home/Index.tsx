import React, {useState} from 'react';
import {fonts} from '../../utils/Fonts';
import {colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {StackNavigationProp} from '@react-navigation/stack';
import CarouselImage from '../../components/CarouselImage/Index';
import VerticalProductCard from '../../components/VerticalProductCard/Index';
import HorizontalProductCard from '../../components/HorizontalProductCard/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  images,
  categories as initialCategories,
  bestSellingProduct as initialBestSellingProduct,
  newProduct as initialNewProduct,
  recommendation as initialRecommendation,
} from '../../utils/Home';

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
  RefreshControl,
} from 'react-native';

type RootStackParamList = {
  Catalog: undefined;
  Cart: undefined;
  Notification: undefined;
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
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [categories, setCategories] = useState(initialCategories);
  const [bestSelling, setBestSelling] = useState(initialBestSellingProduct);
  const [newProducts, setNewProducts] = useState(initialNewProduct);
  const [recommendations, setRecommendations] = useState(initialRecommendation);

  const handleSearch = () => {
    // TODO: ganti url ke halaman Catalog
    // navigation.navigate('Catalog');
    Alert.alert('Pencarian belum tersedia, nanti dialihkan ke halaman catalog');
  };

  const handleCart = () => {
    // TODO: ganti url ke halaman Cart
    // navigation.navigate('Cart');
    Alert.alert(
      'Keranjang belum tersedia, nanti dialihkan ke halaman keranjang',
    );
  };

  const handleNotification = () => {
    // TODO: ganti url ke halaman Cart
    // navigation.navigate('Notification');
    Alert.alert(
      'Notifikasi belum tersedia, nanti dialihkan ke halaman notifikasi',
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

  const getData = async () => {
    setRefreshing(true);
    try {
      setCategories([...categories]);
      setBestSelling([...bestSelling]);
      setNewProducts([...newProducts]);
      setRecommendations([...recommendations]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
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
    inputRange: [0, 100],
    outputRange: ['transparent', '#ffffff'],
    extrapolate: 'clamp',
  });

  const colorStyle = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['#ffffff', '#F5F5F5'],
    extrapolate: 'clamp',
  });

  const iconColor = scrollY.interpolate({
    inputRange: [0, 100],
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
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Input dan Icon Keranjang */}
      <Animated.View style={[styles.headerContainer, {backgroundColor}]}>
        <Animated.Text
          style={[styles.inputLabel, {backgroundColor: colorStyle}, textStyle]}
          onPress={handleSearch}>
          Cari Produk?
        </Animated.Text>
        <TouchableOpacity onPress={handleCart} activeOpacity={1}>
          <AnimatedMaterialCommunityIcons
            name="cart-outline"
            size={24}
            color={iconColor}
            style={{marginRight: 12}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotification} activeOpacity={1}>
          <AnimatedMaterialCommunityIcons
            name="bell-outline"
            size={24}
            color={iconColor}
          />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        bounces
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getData}
            tintColor="#ffffff"
            colors={[colors.info]}
            progressBackgroundColor="#ffffff"
            progressViewOffset={80}
          />
        }
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
        <View style={[styles.section, {marginBottom: -5}]}>
          <View style={[styles.sectionHeader, {marginBottom: 0}]}>
            <Text style={[styles.sectionTitle]}>Produk Terlaris</Text>
            <TouchableOpacity
              onPress={() => handleSeeAll('ProdukTerlaris')}
              activeOpacity={1}>
              <Text style={styles.seeAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {bestSelling.map((product, index) => (
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
        <View style={[styles.section, {marginBottom: -5}]}>
          <View style={[styles.sectionHeader, {marginBottom: 0}]}>
            <Text style={[styles.sectionTitle]}>Produk Terbaru</Text>
            <TouchableOpacity
              onPress={() => handleSeeAll('ProdukTerbaru')}
              activeOpacity={1}>
              <Text style={styles.seeAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {newProducts.map((product, index) => (
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

        {/* Rekomendasi */}
        <View style={[styles.section, {marginBottom: -8}]}>
          <View style={[styles.sectionHeader]}>
            <Text style={[styles.sectionTitle]}>Rekomendasi</Text>
          </View>

          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {recommendations.map((product, index) => (
              <View
                key={index}
                style={{
                  width: (Dimensions.get('window').width - 24) / 2,
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
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
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
    paddingHorizontal: 8,
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
    paddingHorizontal: 8,
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
    textTransform: 'uppercase',
  },
  seeAll: {
    fontSize: 10,
    color: colors.secondary,
    fontFamily: fonts.Regular,
  },
});
