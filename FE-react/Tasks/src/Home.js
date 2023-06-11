import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import Carousel from 'react-native-banner-carousel-updated';

const BannerWidth = 355;
const BannerHeight = 260;

const images = [
  'https://im.uniqlo.com/global-cms/spa/resfd49e80f26e54d3ec7ba35dfece2e7cdfr.jpg',
  'https://im.uniqlo.com/global-cms/spa/res6e9b0c69c8d13367f7e36667aadbaf46fr.jpg',
  'https://im.uniqlo.com/global-cms/spa/res637c4a4b5b5b744dc963ce42d8ad7309fr.jpg',
];

const rupiahFormat = (price) => {
  return `IDR. ${price.toLocaleString('id')},00`;
};

const badgeCategory = (category) => {
  if (category === 'Men') {
    return (
      <View style={[styles.badge, { backgroundColor: 'blue' }]}>
        <Text style={styles.badgeText}>{category}</Text>
      </View>
    );
  } else if (category === 'Women') {
    return (
      <View style={[styles.badge, { backgroundColor: 'green' }]}>
        <Text style={styles.badgeText}>{category}</Text>
      </View>
    );
  } else if (category === 'Kids') {
    return (
      <View style={[styles.badge, { backgroundColor: 'orange' }]}>
        <Text style={styles.badgeText}>{category}</Text>
      </View>
    );
  } else if (category === 'Baby') {
    return (
      <View style={[styles.badge, { backgroundColor: 'cyan' }]}>
        <Text style={styles.badgeText}>{category}</Text>
      </View>
    );
  }
};

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);

  const Item = ({ id, slug, title, price, mainImg, category }) => (
    <TouchableOpacity
      key={id}
      style={styles.item}
      onPress={() =>
        navigation.navigate('Detail', {
          id: +id,
        })
      }
    >
      <View>
        <Image source={{ uri: mainImg }} alt={title} style={styles.mainImgCustom} />
        <View style={styles.cardFooter}>
          <View>
            <Text>{badgeCategory(category)}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
          </View>
          <Text style={{ marginTop: 10 }}>{rupiahFormat(price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item key={item.id} id={item.id} slug={item.slug} title={item.name} price={item.price} mainImg={item.mainImg} category={item.Category?.name} />;

  useEffect(() => {
    const hardcodedData = [
      {
        id: 1,
        slug: 'product-1',
        name: 'Product 1',
        price: 100000,
        mainImg: 'https://example.com/product-1.jpg',
        Category: { name: 'Men' },
      },
      {
        id: 2,
        slug: 'product-2',
        name: 'Product 2',
        price: 200000,
        mainImg: 'https://example.com/product-2.jpg',
        Category: { name: 'Women' },
      },
      {
        id: 3,
        slug: 'product-3',
        name: 'Product 3',
        price: 150000,
        mainImg: 'https://example.com/product-3.jpg',
        Category: { name: 'Kids' },
      },
      {
        id: 4,
        slug: 'product-4',
        name: 'Product 4',
        price: 120000,
        mainImg: 'https://example.com/product-4.jpg',
        Category: { name: 'Baby' },
      },
    ];

    setProducts(hardcodedData);
  }, []);

  const renderPage = (image, index) => {
    return (
      <View key={index}>
        <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} alt="Carousel" />
      </View>
    );
  };

  return (
    <View style={styles.app}>
      <View style={styles.container}>
        <Carousel autoplay autoplayTimeout={5000} loop index={0} pageSize={BannerWidth}>
          {images.map((image, index) => renderPage(image, index))}
        </Carousel>
      </View>
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
      <View>
        {!loading && !error && <>{products.length > 0 ? <FlatList numColumns={2} data={products} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} /> : <Text style={styles.noDataText}>No data available</Text>}</>}
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
