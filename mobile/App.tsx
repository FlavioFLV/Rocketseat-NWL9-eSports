import { StatusBar } from 'react-native'
import { useEffect, useRef } from 'react'
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black} from '@expo-google-fonts/inter'
import { Subscription } from 'expo-modules-core'
import * as Notifications from 'expo-notifications';
import { Background } from './src/components/Background';
import { Routes } from './src/routes'
import { Loading } from './src/components/Loading';
import './src/services/notificactionConfigs'
import { getPushNotificationToken } from './src/services/getPushNotificationToken';


export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black
  });

  const getNotificationlistener = useRef<Subscription>();
  const responseNotificationlistener = useRef<Subscription>();
  
  useEffect(() => {
    getPushNotificationToken();
  })
  
  useEffect(() => {
    getNotificationlistener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    });

    responseNotificationlistener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    });

    return () => {
      if (getNotificationlistener.current && responseNotificationlistener.current) {
        Notifications.removeNotificationSubscription(getNotificationlistener.current)
        Notifications.removeNotificationSubscription(responseNotificationlistener.current)

      }
    }
  }, [])



  return (
    <Background >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      { fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
