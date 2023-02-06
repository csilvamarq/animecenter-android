import React, { useEffect, useState } from "react"
import {ScrollView, ActivityIndicator } from "react-native"
import axios from "axios";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListItem, Image } from '@rneui/themed'
import Icon from "react-native-vector-icons/EvilIcons";

const List = (props) => {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    props.navigation.setOptions({ title: "Anime", headerRight: () => (<Icon name="search" size={35} onPress={() => props.navigation.navigate("Search")} />) })
    axios.get("http://192.168.1.37:3002/lastAnime")
      .then(response => { setSeries(response.data);setLoading(false) })
      .catch(error => console.error(error))
  }, []);

  return loading ? (
    <>
      <ActivityIndicator size={40} /></>
  ) : (
    <SafeAreaProvider>
      <ScrollView>
        {series.map((serie, i) =>
          <ListItem key={i} bottomDivider>
            <Image source={{ uri: serie.image }} style={{ width: 100, height: 100 }} onPress={() => props.navigation.navigate("Anime", { anime: serie.url, episode: serie.episode, name: serie.name,imagen : serie.image })} />
            <ListItem.Content>
              <ListItem.Title>{serie.name}</ListItem.Title>
              <ListItem.Subtitle>Episodio {serie.episode}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>)}
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default List
