import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActivityIndicator, ScrollView,Text,View ,StyleSheet} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ListItem,Image,Card,Button,Icon } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";
import Star from "react-native-star-view/lib/Star";
import { FlatGrid } from "react-native-super-grid";
import { API } from "../api";
import { useContext } from "react";
import AppContext from "../context/appContext";

const Anime = (props) => {
    const isFocused = useIsFocused()
    const [episodes,setEpisodes] = useState([])
    const [info,setInfo] = useState({})
    const [loading,setLoading] = useState(true)
    const [empty,IsEmpty] = useState(false)
    const {theme} = useContext(AppContext)
    useEffect(() => {
      props.navigation.setOptions({ title : props.route.params.name, headerTitleStyle: { color: theme === "dark" ? "white" : "black" },
      headerStyle: { backgroundColor: theme === "dark" ? "black" : "white" },})
       axios.get(`${API}/episodes/${props.route.params.url ?props.route.params.url.substring(31,props.route.params.url.length-12) :props.route.params.anime.substring(20,props.route.params.anime.length-3)}`)
       .then(response => {console.log(response.data);
        if (response.data !== []) {
          setEpisodes(response.data.episodes);
          setInfo(response.data.info)
          setLoading(false)
          IsEmpty(false)}
          else { IsEmpty(true)}
        }
       )
       .catch(error => console.error(error))
     },[isFocused])
    return loading ? (
      <View >
      <ActivityIndicator style={{backgroundColor : theme === "dark" ? "black" : "white"}} size={40}/>
      </View>
    ) : (
        <SafeAreaProvider style={{overflow: "hidden",backgroundColor : theme === "dark" ? "black" : "white"}}>
                  <ScrollView>
          <Card containerStyle={{backgroundColor : theme === "dark" ? "black" : "white",borderColor : theme === "dark" ? "black" : "white"}}
  title='HELLO WORLD'>
    <Image source={{uri : props.route.params.imagen}} style={styles.image} />
    <Text style={{color : theme === "dark" ? "white" : "black"}}>{info.descripcion}</Text>
 <FlatGrid itemDimension={130} spacing={10} data={[
    { name: 'Total episodios', value: episodes.length },
    { name: 'Duración episodios', value: '24 minutos' },
    { name: 'Estado', value: info.estado }]}   renderItem={({ item }) => (
      <View style={styles.itemContainer}>
      <Text style={{...styles.itemName,color : theme === "dark" ? "white" : "black"}}>{item.name}</Text>
      <Text style={{...styles.itemCode,color : theme === "dark" ? "white" : "black"}}>{item.value}</Text>
    </View>
    )}/>
    <Text style={{marginBottom : 10,fontSize : 30,color : theme === "dark" ? "white" : "black"}}>Puntuación</Text>
  <Star score={info.score}/>
  <Text style={{marginBottom : 10,color : "#ffdf00",fontSize : 30}}>{info.score}</Text>
</Card>
         {episodes.map((episode,i) => 
         <ListItem containerStyle={{backgroundColor : theme === "dark" ? "black" : "white"}} style={styles.episodeContainer} key={i} bottomDivider>
         <Image source={{uri : episode.imagen}} style={{ width: 100, height: 100 }} onPress={() => props.navigation.navigate("Player", {anime : episode.enlace,episode : i+1,totalEp : episodes.length})}/>
         <ListItem.Content style={{backgroundColor : theme === "dark" ? "black" : "white"}} >
           <ListItem.Title style={{color : theme === "dark" ? "white" : "black"}}>episodio {i+1}</ListItem.Title>
         </ListItem.Content>
       </ListItem>)} 
        </ScrollView>
        </SafeAreaProvider>
    )
  }

  const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    episodeContainer : {
      display : "flex",
      alignItems : "center",
      justifyContent : "center"
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: 'black',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: 'black',
    },
    image: {
      flex: 1,
      aspectRatio: 0.8, 
      resizeMode: 'cover',
  }});
export default Anime
