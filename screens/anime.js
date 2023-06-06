import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ListItem, Image, Card, Button} from '@rneui/themed';
import Star from 'react-native-star-view/lib/Star';
import {FlatGrid} from 'react-native-super-grid';
import {API} from '../api';
import {useContext} from 'react';
import AppContext from '../context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles as global} from '../styles/styles';

const Anime = props => {
  const [episodes, setEpisodes] = useState([]);
  const [info, setInfo] = useState({});
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [empty, IsEmpty] = useState(false);
  const {theme, token, lista, setLista} = useContext(AppContext);
  const [episodesCount, setEpisodesCount] = useState(1);
  const lastIndex =
    props.route.params.url !== undefined
      ? props.route.params.url.lastIndexOf(`-sub`)
      : props.route.params.anime.lastIndexOf(`-episodio`);
  useEffect(() => {
    axios
      .get(
        `${API}/episodes/${
          props.route.params.url
            ? props.route.params.url.substring(31, lastIndex)
            : props.route.params.anime.substring(29, lastIndex)
        }/${episodesCount}`,
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(response => {
        if (response.data !== []) {
          setEpisodes(response.data.episodes);
          setPages(response.data.pages);
          setInfo(response.data.info);
          setLoading(false);
          IsEmpty(false);
          props.navigation.setOptions({
            title: props.route.params.name,
            headerTitleStyle: {
              ...global.header,
              color: theme === 'dark' ? '#F5F5F5' : '#232322',
            },
            headerStyle: {
              backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5',
            },
            headerRight: () => (
              <>
                {lista.find(item => item.name === props.route.params.name) ===
                undefined ? (
                  <Button
                    onPress={() => {
                      const list = [...lista];
                      const anime = {
                        name: props.route.params.name,
                        url: props.route.params.url
                          ? props.route.params.url
                          : props.route.params.anime,
                        image: props.route.params.imagen,
                        info,
                        episodes: response.data.episodes.length,
                        currentEp: 0,
                      };
                      list.push(anime);
                      setLista(list);
                      AsyncStorage.setItem('lista', JSON.stringify(list)).then(
                        data => data,
                      );
                    }}
                    radius={'sm'}
                    color={theme ? '#232322' : '#F5F5F5'}
                    style={{...global.titles, ...styles.followButton}}>
                    Seguir
                    <Icon
                      size={40}
                      color={theme ? '#F5F5F5' : '#232322'}
                      name="plus"
                    />
                  </Button>
                ) : (
                  <Button
                    onPress={() => {
                      const list = [...lista];
                      list.splice(
                        list.findIndex(
                          item => item.name === props.route.params.name,
                        ),
                        1,
                      );
                      setLista(list);
                      AsyncStorage.setItem('lista', JSON.stringify(list)).then(
                        data => data,
                      );
                    }}
                    radius={'sm'}
                    color={theme ? '#232322' : '#F5F5F5'}
                    style={{...global.titles, ...styles.followButton}}>
                    Dejar de Seguir
                    <Icon
                      size={40}
                      color={theme ? '#F5F5F5' : '#232322'}
                      name="plus"
                    />
                  </Button>
                )}
              </>
            ),
          });
        } else {
          IsEmpty(true);
        }
      })
      .catch(error => console.error(error));
  }, [episodesCount, lista]);
  return loading ? (
    <View>
      <ActivityIndicator
        style={{backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5'}}
        size={40}
      />
    </View>
  ) : (
    <SafeAreaProvider
      style={{
        overflow: 'hidden',
        backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5',
      }}>
      <ScrollView>
        <Card
          containerStyle={{
            backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5',
            borderColor: theme === 'dark' ? '#232322' : '#F5F5F5',
          }}
          title="HELLO WORLD">
          <Image
            source={{uri: props.route.params.imagen}}
            style={styles.image}
          />
          <Text
            style={{
              ...global.SubTitle,
              color: theme === 'dark' ? '#F5F5F5' : '#232322',
            }}>
            {info.descripcion}
          </Text>
          <FlatGrid
            itemDimension={130}
            spacing={10}
            data={[
              {name: 'Total episodios', value: episodes.length},
              {name: 'Duración episodios', value: '24 minutos'},
              {name: 'Estado', value: info.estado},
            ]}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <Text
                  style={{
                    ...global.titles,
                    ...styles.itemName,
                    color: theme === 'dark' ? '#F5F5F5' : '#232322',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    ...global.Text,
                    ...styles.itemCode,
                    color: theme === 'dark' ? '#F5F5F5' : '#232322',
                  }}>
                  {item.value}
                </Text>
              </View>
            )}
          />
          <Text
            style={{
              ...global.SubTitle,
              marginBottom: 10,
              fontSize: 30,
              color: theme === 'dark' ? '#F5F5F5' : '#232322',
            }}>
            Puntuación
          </Text>
          <Star score={Math.floor(info.score)} />
          <Text style={{marginBottom: 10, color: '#ffdf00', fontSize: 30}}>
            {info.score}
          </Text>
        </Card>
        {episodes.map((episode, i) => {
          const episodesArr = Array.from({ length: lista.find((item)=> item.name === props.route.params.name)?.currentEp }, (_, index) => index + 1);
          return (
          <ListItem
            containerStyle={{
              backgroundColor: theme === 'dark' ? ((episodesCount - 1) * 30 + i + 1) === episodesArr[i] ?  "grey": '#232322' : ((episodesCount - 1) * 30 + i + 1) === episodesArr[i] ? "grey" : '#F5F5F5',
            }}
            style={styles.episodeContainer}
            key={i}
            bottomDivider>
            <Image
              source={{uri: episode.imagen}}
              style={{width: 100, height: 100}}
              onPress={() =>
                props.navigation.navigate('OptionSelector', {
                  anime: episode.enlace,
                  episode: (episodesCount - 1) * 30 + i + 1,
                  totalEp: pages * 30,
                })
              }
            />
            <ListItem.Content
              style={{
                backgroundColor: theme === 'dark' ? ((episodesCount - 1) * 30 + i + 1) === episodesArr[i] ?  "grey": '#232322' : ((episodesCount - 1) * 30 + i + 1) === episodesArr[i] ? "grey" : '#F5F5F5',
              }}>
              <ListItem.Title
                style={{
                  ...global.Text,
                  color: theme === 'dark' ? '#F5F5F5' : '#232322',
                }}>
                episodio {(episodesCount - 1) * 30 + i + 1}
              </ListItem.Title>
              <Text style={{ color: theme === 'dark' ? '#F5F5F5' : '#232322',}}>{((episodesCount - 1) * 30 + i + 1) === episodesArr[i] ? "visto" : "no visto"}</Text>
            </ListItem.Content>
          </ListItem>
        )})}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            disabled={episodesCount > 1 ? false : true}
            onPress={() =>
              episodesCount > 1 && setEpisodesCount(episodesCount - 1)
            }>
            Anterior
          </Button>
          <Button
            disabled={episodesCount < pages ? false : true}
            onPress={() =>
              episodesCount < pages && setEpisodesCount(episodesCount + 1)
            }>
            Siguiente
          </Button>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  episodeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#232322',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#232322',
  },
  image: {
    flex: 1,
    aspectRatio: 0.8,
    resizeMode: 'cover',
  },
  followButton: {
    borderRadius: 10,
  },
});
export default Anime;
