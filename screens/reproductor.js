import React, { useEffect, useState } from "react";
import axios from "axios";
import { Linking,BackHandler,ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/Feather";
// https://anime-app-backend-production.up.railway.app

const Player = (props) => {
    const [load,setLoad] = useState(false)
    const backAction = () => props.navigation.setOptions({headerShown : true})
    const [url, setUrl] = useState("")
    const [loading,setLoading] = useState(true)
    const getAnimeUrl = async () => {
        return axios.get(`http://localhost:3002/dowload/${props.route.params.anime.substring(29,props.route.params.anime.length-11)}/${props.route.params.episode}`)
            .then(response => Linking.openURL(response.data))
            .catch(error => console.error(error))
    }
    useEffect(() => {
         props.navigation.setOptions({ title: `Episodio ${props.route.params.episode}`, headerRight: () => (<Icon name="download" size={35} onPress={() => getAnimeUrl().then()} />) })
        axios.get(`http://192.168.1.37:3002/url/${props.route.params.anime.substring(29,props.route.params.anime.length-11)}/${props.route.params.episode}`)
            .then(response => {setUrl(response.data);setLoading(false)})
             .catch(error => console.error(error))
             const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
              );
              return () => backHandler.remove();
      }, [])
      useEffect(() => {
        props.navigation.setOptions({headerShown: false})
      },[load])
      return loading ? (
          <>
          <ActivityIndicator size={40}/>
          </>
      ) :
     (
        <>
        {console.log(url)}
              <WebView  mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        onLoadEnd={() => setLoad(true)}
        allowsFullscreenVideo={true} source={{ uri: url }} /> 
        </>
    )
}

export default Player

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})
