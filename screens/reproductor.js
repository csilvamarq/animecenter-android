import React, { useEffect, useState } from "react";
import axios from "axios";
import { Linking,BackHandler,ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/Feather";
import { API } from "../api";

const Player = (props) => {
    const [load,setLoad] = useState(false)
    const backAction = () => props.navigation.setOptions({headerShown : true})
    const [url, setUrl] = useState("")
    const [loading,setLoading] = useState(true)
    const getAnimeUrl = async () => {
        return axios.get(`${API}/dowload/${props.route.params.anime.substring(29,props.route.params.anime.length-11)}/${props.route.params.episode}`)
            .then(response => Linking.openURL(response.data))
            .catch(error => console.error(error))
    }
    useEffect(() => {
         props.navigation.setOptions({ title: `Episodio ${props.route.params.episode}`})
        axios.get(`${API}/url/${props.route.params.anime.substring(29,props.route.params.anime.length-11)}/${props.route.params.episode}`)
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
        <Icon color={"white"} name="arrow-left" size={35} style={styles.icon}/>
        <Icon color={"white"} style={styles.iconLeft} name="download" size={35} onPress={() => getAnimeUrl().then()} />
              <WebView  onTouchStart={(e) => {e.nativeEvent.locationX>400 & e.nativeEvent.locationX
               }} mediaPlaybackRequiresUserAction={false}
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
    icon : {
        zIndex : 10000,
        position: "absolute",
        margin: "auto",
        left: 0,
        right:0
    },
    iconLeft : {
        zIndex : 10000,
        position: "absolute",
        margin: "auto",
        left: 0,
        right:0
        ,textAlign : "right"
    }
})
