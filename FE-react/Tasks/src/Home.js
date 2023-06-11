import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Carousel from 'react-native-banner-carousel-updated';

const BannerWidth = 355;
const BannerHeight = 260;

const images = [
  'https://im.uniqlo.com/global-cms/spa/resfd49e80f26e54d3ec7ba35dfece2e7cdfr.jpg',
  'https://im.uniqlo.com/global-cms/spa/res6e9b0c69c8d13367f7e36667aadbaf46fr.jpg',
  'https://im.uniqlo.com/global-cms/spa/res637c4a4b5b5b744dc963ce42d8ad7309fr.jpg',
];

export default function Home() {
  const renderPage = (image, index) => {
    return (
      <View key={index}>
        <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} alt="Carousel" />
      </View>
    );
  };

  return (
    <View style={styles.app}>
      <View style={styles.categoryList}>
        <TouchableOpacity onPress={() => setFilter('All')}>
          <Text style={styles.categoryItem}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Men')}>
          <Text style={styles.categoryItem}>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Women')}>
          <Text style={styles.categoryItem}>Women</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Kids')}>
          <Text style={styles.categoryItem}>Kids</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Baby')}>
          <Text style={styles.categoryItem}>Baby</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Carousel autoplay autoplayTimeout={5000} loop index={0} pageSize={BannerWidth}>
          {images.map((image, index) => renderPage(image, index))}
        </Carousel>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#F0F1F9',
  },
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  categoryItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  mainImgCustom: {
    width: '100%',
    height: 200,
  },
  cardFooter: {
    padding: 10,
  },
  badge: {
    alignSelf: 'center',
  },
});
