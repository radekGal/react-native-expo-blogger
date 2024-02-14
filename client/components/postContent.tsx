import { Image, StyleProp, StyleSheet, Text, TextStyle, View } from "react-native"
import { sharedStyles } from "../constants/sharedStyles"
import { ViewStyle } from "react-native";

type PostContentProps = {
  title: string;
  authorName: string;
  avatar: string;
  date: Date;
  styleView?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
}

export const PostContent = ({ title, authorName, avatar, date, styleView, styleText }: PostContentProps) => {
  return(
    <View style={[styles.itemTextContainer, styleView]}>
      <Text style={[styles.itemText, styleText]}>{title}</Text>
      <View style={sharedStyles.itemAuthorContainer}>
        <Image
          source={{ uri: avatar }}
          alt={authorName}
          style={sharedStyles.itemAuthorAvatar} 
        />
        <Text style={[sharedStyles.itemAuthorText, styleText, { textTransform: 'capitalize' }]}>{authorName}</Text>
        <Text style={[sharedStyles.itemAuthorText, styleText]}>{new Date(date).toDateString()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemTextContainer: {
    position: 'absolute', 
    bottom: 14, 
    left: 12,
  },
  itemText: {
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold',
  }
})