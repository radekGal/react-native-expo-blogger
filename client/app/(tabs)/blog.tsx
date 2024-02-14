import axios from 'axios';
import { useEffect, useState } from 'react';
import { StatusBar, FlatList, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Item } from './home';
import { router } from 'expo-router';
import { PostContent } from '../../components/postContent';
import { SIZES } from '../../constants/sizes';

const Blog = () => {

  const [data, setData] = useState([]);
  const [text, onChangeText] = useState('');
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://192.168.0.5:5000/api/posts');
        setData(res.data);
        setSearchData(res.data);
      } catch(err) {
        console.log('Something was wrong', err);
      }
    })();
  }, []);

  useEffect(() => {
    const search = data.filter((item: { title: string }) => (
      item.title.toLowerCase().includes(text.toLowerCase())
    ));
    
    if(text === '') setSearchData(data);

    setSearchData(search);
    
  }, [text]);

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='default' />
      <TextInput 
        style={[styles.searchBar, { width: SIZES.WIDTH }]}
        autoCapitalize='none'
        placeholder='Search'
        placeholderTextColor="#000"
        value={text}
        onChangeText={onChangeText}
      />
      <FlatList
        style={{ width: SIZES.WIDTH }}
        showsVerticalScrollIndicator={false}
        data={searchData}
        renderItem={({ item }: Item) => (
          <TouchableOpacity 
            style={[styles.blogItem, { width: SIZES.WIDTH }]}
            onPress={() => router.push(`/post/${item._id}`)}
          >
            <View style={{ flex: 1 }}>
              <Image 
                source={{ uri: item?.imageUrl }} 
                alt={item.title} 
                style={[StyleSheet.absoluteFillObject, { resizeMode: 'cover' }]}
              />
              <PostContent
                title={item?.title}
                avatar={item?.author?.image!}
                authorName={item?.author?.name!}
                date={item?.createAt}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: 340
  },
  blogItem: {
    width: 340, 
    height: 300, 
    borderRadius: 18, 
    overflow: 'hidden',
    marginBottom: 12
  }
})

export default Blog;