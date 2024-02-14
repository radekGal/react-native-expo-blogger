import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Layout(){
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
      initialRouteName='home'
    >
      <Tabs.Screen name='home' options={{ tabBarIcon: ({ color }) => <FontAwesome5 name='home' size={20} color={color} />}} />
      <Tabs.Screen name='blog' options={{ tabBarIcon: ({ color }) => <FontAwesome5 name='book-open' size={20} color={color} />}} />
    </Tabs>
  );
}
