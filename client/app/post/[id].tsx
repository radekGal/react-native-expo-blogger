import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Featured } from '../(tabs)/home';
import { Comments } from '../../components/comments';
import { AntDesign } from '@expo/vector-icons';
import { PostContent } from '../../components/postContent';
import { SIZES } from '../../constants/sizes';
import { Loader } from '../../components/loader';
import Markdown from 'react-native-markdown-display';
import axios from 'axios';

const DetailPage = () => {

  const { id } = useLocalSearchParams();
  const [item, setItem] = useState<Featured | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://192.168.0.5:5000/api/posts/${id}`);
        setItem(res.data);
      } catch(err) {
        console.log('Something was wrong', err);
        setLoading(false)
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return(
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
        <AntDesign name='left' size={24} color="white" />
      </TouchableOpacity>
      {loading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1, alignItems: 'center'}}>
          <Image
            source={{ uri: item?.imageUrl }} 
            alt={item?.title} 
            style={{ width: '100%', height: 300, resizeMode: 'cover' }}
          />
          <ScrollView 
            showsVerticalScrollIndicator={false}
            >
            <View style={{ width: SIZES.WIDTH }}>
              <PostContent
                styleView={styles.viewStyle}
                styleText={styles.textStyle}
                title={item?.title!}
                authorName={item?.author?.name!}
                avatar={item?.author?.image!}
                date={item?.createAt!}
              />
              <Markdown>{item?.desc ? item?.desc : ''}</Markdown>
              <Comments postId={item?._id!} />
            </View>
          </ScrollView>
        </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignContent: 'center'
  },
  icon: {
    position: 'absolute', 
    left: 16, 
    top: 48,
    zIndex: 10
  },
  viewStyle: {
    position: 'static',
    marginTop: 36,
    left: 0,
  },
  textStyle: {
    color: 'black',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  }
})

export default DetailPage;
