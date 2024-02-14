import axios from "axios";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Author } from "../app/(tabs)/home";
import { sharedStyles } from "../constants/sharedStyles";

type Comments = {
  _id: string;
  comment: string;
  createAt: Date;
  author: Author;
}[]

export const Comments = ({ postId }: { postId: string }) => {

  const [comments, setComments] = useState<Comments | null>(null);  

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/comments/${postId}`);
        setComments(response.data);
      } catch(err) {
        console.log('Something was wrong', err);
      }
    })()
  }, []);

  return(
    <View style={styles.container}>
      <Text style={styles.comments}>Comments</Text>
      <View>
        {comments?.map(comment => (
          <View key={comment._id} style={{ marginBottom: 18 }}>
            <View style={styles.flexRow}>
              <Image 
                source={{ uri: comment?.author?.image }} 
                alt={comment?.author?.name}
                style={sharedStyles.itemAuthorAvatar}
              />
              <View style={{ marginLeft: 8 }}>
                <View style={styles.flexRow}>
                  <Text style={[sharedStyles.itemAuthorText, styles.text, { textTransform: 'capitalize' }]}>{comment?.author?.name}</Text>
                  <Text style={[sharedStyles.itemAuthorText, styles.text]}>{new Date(comment?.createAt).toDateString()}</Text>
                </View>
                <Text style={styles.commentText}>{comment?.comment}</Text>
              </View>
            </View>
            <View style={styles.separator}></View>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 24,
  },
  flexRow: {
    flexDirection: 'row'
  },
  comments: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  commentText: {
    marginLeft: 6, 
    marginTop: 4,
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    opacity: 0.05,
    marginTop: 12,
  }
})