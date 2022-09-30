import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@Types/@navigation';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard } from '../../components/DuoCard';


export function Game() {
  const [duos, setDuos] = useState([])

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;
  
  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.110.22:3333/games/${game.id}/ads`) // maquina da empresa
    .then(response => response.json())
    .then(data => console.log(data))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>

          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}            
          />
          <View style={styles.right}/>
        </View>

        <Image 
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          // resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle='Conecte-se para começar a jogar!'
        />

        <DuoCard 
          
        />

      </SafeAreaView>
    </Background>
  );
}