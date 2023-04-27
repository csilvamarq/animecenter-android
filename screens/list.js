import React, { useContext, useEffect, useState } from "react"
import {ScrollView, ActivityIndicator,View } from "react-native"
import axios from "axios";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from 'react-native-vector-icons/Ionicons'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListItem, Image } from '@rneui/themed'
import { API } from "../api";
import AppContext from "../context/appContext";

const List = (props) => {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const {theme,token,setTheme} = useContext(AppContext)
  useEffect(() => {
    props.navigation.setOptions({headerStyle: { backgroundColor : theme === "dark" ? "#232322" : "#F5F5F5" }, title: "Anime", headerRight: () => (<View style={{display : "flex",flexDirection : "row"}}><Icon2 color={theme === "dark" ? "#F5F5F5" : "#232322"} size={30} name={theme === "dark" ? "md-flashlight" : "md-flashlight-outline"} onPress={() => setTheme(theme === "dark" ? "light" : "dark")} /><Icon color={theme === "dark" ? "#F5F5F5" : "#232322"} name="search" size={35} onPress={() => props.navigation.navigate("Search")} /></View>) })
    axios.get(`${API}/lastAnime`,{ headers: {
      "Authorization":  token
   }})
      .then(response => { setSeries(response.data);setLoading(false) })
      .catch(error => console.error(error))
  }, []);
  return loading && series.length < 1 ? (
    <>
      <ActivityIndicator style={{backgroundColor : theme === "dark" ? "#232322" : "#F5F5F5"}} size={40} /></>
  ) : (
    <SafeAreaProvider>
      <ScrollView>
        {series.map((serie, i) =>
          <ListItem containerStyle={{backgroundColor : theme === "dark" ? "#232322" : "#F5F5F5"}} key={i} bottomDivider>
            <Image source={{ uri: serie.image }} style={{ width: 100, height: 100 }} onPress={() => props.navigation.navigate("Anime", { anime: serie.url, episode: serie.episode, name: serie.name,imagen : serie.image })} />
            <ListItem.Content style={{backgroundColor : theme === "dark" ? "#232322" : "#F5F5F5"}}>
              <ListItem.Title style={{color : theme === "dark" ? "#F5F5F5" : "#232322"}}>{serie.name}</ListItem.Title>
              <ListItem.Subtitle style={{color : theme === "dark" ? "#F5F5F5" : "#232322"}}>Episodio {serie.episode}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>)}
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default List
