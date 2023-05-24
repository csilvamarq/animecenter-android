import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  View,
  RefreshControl,
  BackHandler,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ListItem, Image} from '@rneui/themed';
import {API} from '../api';
import AppContext from '../context/appContext';
import {useFocusEffect} from '@react-navigation/native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import usePrevious from '../hooks/usePrevious';
import { styles } from '../styles/styles';

const List = props => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const {theme, token, setTheme,lista} = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);
  const previousArray = usePrevious(lista);
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    },[]),
  );
  useEffect(() => {
    props.navigation.setOptions({
      headerTitleStyle: {...styles.header, color: theme === 'dark' ? '#F5F5F5' : '#232322'},
      headerStyle: {backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5'},
      title: 'Anime',
      headerRight: () => (
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Icon2
            color={theme === 'dark' ? '#F5F5F5' : '#232322'}
            size={30}
            name={theme === 'dark' ? 'md-flashlight' : 'md-flashlight-outline'}
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <Icon
            color={theme === 'dark' ? '#F5F5F5' : '#232322'}
            name="search"
            size={35}
            onPress={() => props.navigation.navigate('Search')}
          />
        </View>
      ),
    });
    axios
      .get(`${API}/lastAnime`, {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        setSeries(response.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, [theme]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    axios
      .get(`${API}/lastAnime`, {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        setSeries(response.data);
        setRefreshing(false);
      })
      .catch(error => console.error(error));
  }, []);
  return loading && series.length < 1 ? (
    <>
      <ActivityIndicator
        style={{backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5'}}
        size={40}
      />
    </>
  ) : (
    <AlertNotificationRoot>
    <SafeAreaProvider>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {series.map((serie, i) => (
          <ListItem
            containerStyle={{
              backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5',
            }}
            key={i}
            bottomDivider>
            <Image
              source={{uri: serie.image}}
              style={{width: 100, height: 100}}
              onPress={() =>
                props.navigation.navigate('Anime', {
                  anime: serie.url,
                  episode: serie.episode,
                  name: serie.name,
                  imagen: serie.image,
                })
              }
            />
            <ListItem.Content
              style={{
                backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5',
              }}>
              <ListItem.Title
                style={{...styles.titles,color: theme === 'dark' ? '#F5F5F5' : '#232322'}}>
                {serie.name}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{...styles.SubTitle,color: theme === 'dark' ? '#F5F5F5' : '#232322'}}>
                Episodio {serie.episode}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaProvider>
    </AlertNotificationRoot>
  );
};

export default List;
