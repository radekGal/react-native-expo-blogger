import { StyleSheet } from "react-native";

export const sharedStyles = StyleSheet.create({
  itemAuthorContainer: {
    marginTop: 6, 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  itemAuthorAvatar: {
    height: 24, 
    width: 24, 
    borderRadius: 100
  },
  itemAuthorText: {
    color: 'white', 
    fontSize: 12, 
    marginLeft: 6,
  }
})