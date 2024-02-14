import axios from 'axios'
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { PostContent } from '../../components/postContent';
import { SIZES } from '../../constants/sizes';
import { Loader } from '../../components/loader';

export type Author = {
  name: string;
  image: string;
}

export type Featured = {
  _id: string;
  authorEmail: string;
  createAt: Date;
  imageUrl: string;
  title: string;
  desc: string;
  author?: Author; 
}

export type Item = {
  item: Featured
}

const Page = () => {

  const [data, setData] = useState<Featured[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/posts');
        setData(res?.data);
      } catch(err) {
        console.log('Something was wrong', err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featured = data?.at(0);
  const posts = data?.slice(1);

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='default' />
      <View style={{ 
        marginBottom: 6,
        paddingTop: 24,
        width: SIZES.WIDTH,
      }}>
        <Text style={styles.header}>The Blogger</Text>
      </View>
      {loading ? 
        <Loader /> : 
        (
          <>
            <View style={[styles.featuredText, { width: SIZES.WIDTH }]}>
              <Text style={{ fontWeight: '700', fontSize: 22 }}>Featured</Text>
            </View>
            {featured && 
              <TouchableOpacity 
                style={[styles.itemContainer, { height: 190, width: SIZES.WIDTH, marginBottom: SIZES.SPACING }]}
                onPress={() => router.push(`/post/${featured?._id}`)}
              >
                <Image 
                  source={{ uri: featured?.imageUrl }} 
                  alt={featured?.title} 
                  style={[StyleSheet.absoluteFillObject, { width: SIZES.WIDTH, resizeMode: 'cover' }]}
                />
                <PostContent
                  title={featured?.title}
                  avatar={featured?.author?.image!}
                  authorName={featured?.author?.name!}
                  date={featured?.createAt}
                />
              </TouchableOpacity>
            }
            <View style={[styles.featuredText, { width: SIZES.WIDTH, alignItems: 'center' }]}>
              <Text style={{ fontWeight: '700', fontSize: 22 }}>Latest Posts</Text>
              <Link href='/blog'>
                <Text>All Posts</Text>
              </Link>
            </View>
            <FlatList
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: SIZES.SPACING }}
              snapToInterval={SIZES.WIDTH}
              decelerationRate='fast'
              data={posts}
              renderItem={({ item }: Item) => (
                <TouchableOpacity 
                  style={{ width: SIZES.WIDTH, height: SIZES.HEIGHT}} 
                  onPress={() => router.push(`/post/${item._id}`)}
                >
                  <View style={[styles.itemContainer, { margin: SIZES.SPACING, flex: 1 }]}>
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
          </>
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredText: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 24, 
    marginBottom: 12
  },
  header: {
    fontWeight: '700',
    fontSize: 38,
  },
  itemContainer: {
    overflow: 'hidden', 
    borderRadius: 18,
  },
})

export default Page;