import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, TextInput,Text, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem,Image } from "@rneui/themed";
import { Button,SearchBar } from "@rneui/themed";

const Search = (props) => {
    const [text, setText] = useState('')
    const [search, setSearch] = useState(false);
    const [results, setResults] = useState([]);
    const [loading,setLoading] = useState(false);

    const getSearchResults = (text) => {
        setLoading(true)
        console.log("PRESSED")
        console.log(results)
        return axios.get(`http://192.168.1.37:3002/search/${text}`)
            .then(response => { setResults(response.data); setSearch(true);setLoading(false) })
            .catch(error => console.error(error))
    }
    return (
        <SafeAreaProvider>
            <ScrollView>
                <SearchBar  onSubmitEditing={() =>getSearchResults(text)} onChangeText={setText} onClear={() => {
                    setSearch(false)
                    setResults([])
                    setText("")}}  value={text}/>
                {search ? (<>
                    <Text> se han encontrado {results.length} resultados</Text>
                    {results.map((serie, i) =>
                        <ListItem key={i} bottomDivider>
                            <Image source={{ uri: serie.imagen }} style={{ width: 100, height: 100 }} onPress={() => props.navigation.navigate("Anime",{ url: serie.url, name: serie.name,imagen : serie.imagen })} />
                            <ListItem.Content>
                                <ListItem.Title>{serie.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>)}
                </>) : loading ? (<ActivityIndicator />) : null}
            </ScrollView>
        </SafeAreaProvider>
    )
}
export default Search

const styles = StyleSheet.create(
    {
        inputText: {
            backgroundColor: "grey",
        },
        button : {
            display : "flex",
            alignItems : "flex-end",
            bottom : 0
        }
    }
)
