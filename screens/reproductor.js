import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Linking, View, BackHandler, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import {API} from '../api';
import {Button} from '@rneui/base';
import {useContext} from 'react';
import AppContext from '../context/appContext';

const Player = props => {
  const [currentEpisode, setCurrentEpisode] = useState(
    props.route.params.episode,
  );
  const backAction = () => props.navigation.setOptions({headerShown: true});
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const {theme} = useContext(AppContext);
  const lastIndex = props.route.params.anime.lastIndexOf(`-episodio`);
  const getAnimeUrl = async () => {
    return axios
      .get(
        `${API}/dowload/${props.route.params.anime.substring(
          29,
          lastIndex,
        )}/${currentEpisode}`,
      )
      .then(response => Linking.openURL(response.data))
      .catch(error => console.error(error));
  };
  useEffect(() => {
    props.navigation.setOptions({
      title: `Episodio ${currentEpisode}`,
      headerTitleStyle: {color: theme === 'dark' ? 'white' : 'black'},
      headerStyle: {backgroundColor: theme === 'dark' ? 'black' : 'white'},
      headerRight: () => (
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Button
              type="clear"
              onPress={() => {
                if (currentEpisode > 1) {
                  setCurrentEpisode(currentEpisode - 1);
                }
              }}
              disabled={currentEpisode < 2 ? true : false}
              title="Prev"
            />
            <Button
              type="clear"
              onPress={() => {
                if (currentEpisode < props.route.params.totalEp) {
                  setCurrentEpisode(currentEpisode + 1);
                }
              }}
              disabled={
                currentEpisode < props.route.params.totalEp ? false : true
              }
              title="Next"
            />
          </View>
          <Icon
            color={theme === 'dark' ? 'white' : 'black'}
            name="download"
            size={35}
            onPress={() => getAnimeUrl().then()}
          />
        </View>
      ),
    });
  }, []);
  useEffect(() => {
    setLoading(true);
    props.navigation.setOptions({
      title: `Episodio ${currentEpisode}`,
    });
    axios
      .get(
        `${API}/url/${props.route.params.anime.substring(
          29,
          lastIndex,
        )}/${currentEpisode}`,
      )
      .then(response => {
        setUrl(response.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [currentEpisode]);
  return loading ? (
    <>
      <ActivityIndicator
        style={{backgroundColor: theme === 'dark' ? 'black' : 'white'}}
        size={40}
      />
    </>
  ) : (
    <>
      <WebView
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo={true}
        source={{uri: url}}
      />
    </>
  );
};

export default Player;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  icon: {
    zIndex: 10000,
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
  },
  iconLeft: {
    zIndex: 10000,
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    textAlign: 'right',
  },
});
