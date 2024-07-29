import {fonts} from '../../utils/Fonts';
import {colors} from '../../utils/Colors';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Index';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CarouselImage from '../../components/CarouselImage/Index';
import VerticalProductCard from '../../components/VerticalProductCard/Index';
import HorizontalProductCard from '../../components/HorizontalProductCard/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  images,
  categories as initialCategories,
  newProducts as initialNewProducts,
  recommendation as initialRecommendation,
  topSellingProducts as initialTopSellingProducts,
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
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

type RootStackParamList = {
  Catalog: undefined;
  DetailCategory: {id: string};
  newProducts: undefined;
  ProdukTerlaris: undefined;
  DetailProduct: {id: string};
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
  const ITEMS_PER_PAGE_RECOMMENDATION = 10;

  const carouselHeight = 200;
  const colorScheme = useColorScheme();
  const navigation = useNavigation<NavigationProp>();
  const [scrollY] = useState(new Animated.Value(0));
  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [newProducts, setNewProducts] = useState(initialNewProducts);
  const [recommendations, setRecommendations] = useState(initialRecommendation);
  const [pageRecommendations, setPageRecommendations] = useState(1);
  const [topSellingProducts, setTopSellingProducts] = useState(
    initialTopSellingProducts,
  );

  useEffect(() => {
    setRecommendations(
      initialRecommendation.slice(0, ITEMS_PER_PAGE_RECOMMENDATION),
    );
  }, []);

  // Handle Function
  const handleDetailCategory = (id: string) => {
    // navigation.navigate('DetailCategory', {id});
    Alert.alert(`id kategori: ${id}, nanti dialihkan ke detail kategori`);
  };

  const handleSeeAll = (section: 'ProdukTerlaris' | 'newProducts') => {
    // navigation.navigate(section);
    Alert.alert(`nama route: ${section}`);
  };

  const handleDetailProduct = (id: string) => {
    // navigation.navigate('DetailProduct', {id});
    Alert.alert(`id produk: ${id}, nanti dialihkan ke detail produk`);
  };

  const loadMoreData = () => {
    if (loading || recommendations.length >= initialRecommendation.length)
      return;

    setLoading(true);
    setTimeout(() => {
      const newPage = pageRecommendations + 1;
      const newRecommendations = initialRecommendation.slice(
        0,
        newPage * ITEMS_PER_PAGE_RECOMMENDATION,
      );
      setRecommendations(newRecommendations);
      setPageRecommendations(newPage);
      setLoading(false);
    }, 1000);
  };

  const getData = async () => {
    setRefreshing(true);
    try {
      setCategories([...categories]);
      setTopSellingProducts([...topSellingProducts]);
      setNewProducts([...newProducts]);
      setPageRecommendations(1);
      setRecommendations(
        initialRecommendation.slice(0, ITEMS_PER_PAGE_RECOMMENDATION),
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Helpers Functions
  const textDark = {
    color: colorScheme === 'dark' ? colors.dark : '',
  };

  const backgroundHeader = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['transparent', '#ffffff'],
    extrapolate: 'clamp',
  });

  const backgroundInput = scrollY.interpolate({
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
      onPress={() => handleDetailCategory(item.id)}
      activeOpacity={1}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={item.icon}
          size={20}
          color={colors.info}
        />
      </View>
      <Text style={[styles.categoryText, textDark]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const isCloseToBottom = (event: NativeScrollEvent) => {
    const {layoutMeasurement, contentOffset, contentSize} = event;
    const paddingToBottom = 20;

    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Input dan Icon Keranjang */}
      <Header
        bgHeader={backgroundHeader}
        bgInput={backgroundInput}
        iconColor={iconColor}
        textDark={textDark}
      />

      <ScrollView
        bounces={false}
        bouncesZoom={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getData}
            tintColor={colors.info}
            colors={[colors.info]}
            progressBackgroundColor="#ffffff"
            progressViewOffset={80}
          />
        }
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
            listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
              if (isCloseToBottom(event.nativeEvent)) {
                loadMoreData();
              }
            },
          },
        )}
        scrollEventThrottle={16}>
        {/* Carousel Header */}
        <CarouselImage images={images} carouselHeight={carouselHeight} />

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
              <Text style={styles.seeAll}>Lihat Semua {'>'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {topSellingProducts.map((product, index) => (
              <HorizontalProductCard
                key={index}
                imageUrl={product.imageUrl}
                productName={product.productName}
                productPrice={product.productPrice}
                productRating={product.productRating}
                totalSold={product.totalSold}
                onPress={() => handleDetailProduct(product.id)}
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
              onPress={() => handleSeeAll('newProducts')}
              activeOpacity={1}>
              <Text style={styles.seeAll}>Lihat Semua {'>'}</Text>
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
                onPress={() => handleDetailProduct(product.id)}
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
                  onPress={() => handleDetailProduct(product.id)}
                />
              </View>
            ))}
          </View>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.info} />
            </View>
          )}
        </View>
      </ScrollView>
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
    height: 10,
    backgroundColor: '#F5F5F5',
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
  },
  seeAll: {
    fontSize: 10,
    color: colors.secondary,
    fontFamily: fonts.Regular,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
