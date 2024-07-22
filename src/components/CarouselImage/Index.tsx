import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');

interface CarouselProps {
  images: {url: string}[];
  carouselHeight: number;
  onImagePress: (index: number) => void;
}

const CarouselImage: React.FC<CarouselProps> = ({
  images,
  carouselHeight,
  onImagePress,
}) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (activeIndex + 1) % images.length;
      scrollViewRef.current?.scrollTo({x: nextIndex * width, animated: true});
      setActiveIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };

  return (
    <View style={{height: carouselHeight}}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false, listener: handleScroll},
        )}
        scrollEventThrottle={16}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.imageContainer, {height: carouselHeight, width}]}
            onPress={() => onImagePress(index)}
            activeOpacity={1}>
            <Image source={{uri: image.url}} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              scrollViewRef.current?.scrollTo({
                x: index * width,
                animated: true,
              });
              setActiveIndex(index);
            }}>
            <View
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : null,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CarouselImage;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#a78bfa',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#5b21b6',
  },
});
