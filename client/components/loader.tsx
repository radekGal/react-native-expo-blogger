import { StyleSheet, Text, View } from 'react-native'

export const Loader = () => {
  return(
    <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  loadingText: {
    fontWeight: '600',
    fontSize: 20
  }
});


