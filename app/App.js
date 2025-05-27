/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './src/lib/config/env';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import LoadingApp from './src/screens/LoadingApp';
import Otp from './src/screens/Otp';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import Find from './src/screens/Find';
import ChatRoom from './src/screens/ChatRoom';
import CallRoom from './src/screens/CallRoom';
import Callhistory from './src/screens/Callhistory';



const RootStack = createNativeStackNavigator({
  initialRouteName: 'LoadingApp',
  screens: {
    LoadingApp,
    Otp ,
    Login,
    Profile,
    Find ,
    ChatRoom,
    CallRoom ,
    Callhistory
  }
});

const Navigation = createStaticNavigation(RootStack);


export default function App() {
  
  return (
    <SafeAreaProvider >
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,

  },
});