import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Image, SearchBar } from "@rneui/themed";

import Icon from "react-native-vector-icons/AntDesign";
import { API } from "../api";

const Search = (props) => {

    const [text, setText] = useState('')
    const [search, setSearch] = useState(false);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSearchResults = async (text) => {
        setLoading(true)
        console.log("PRESSED")
        console.log(results)
        return axios.get(`${API}/search/${text}`)
            .then(response => { setResults(response.data); setSearch(true); setLoading(false) })
            .catch(error => console.error(error))
    }
    useEffect(() => {
        props.navigation.setOptions({
            header: () => <SearchBar placeholder="busca un anime" onSubmitEditing={() => getSearchResults(text)} onChangeText={setText} onClear={() => {
                setSearch(false)
                setResults([])
                setText("")
            }} value={text} />})
        })
    return (
        <SafeAreaProvider>
            <ScrollView>
                {search ? (<>
                    <Text> se han encontrado {results.length} resultados</Text>
                    {results.map((serie, i) =>
                        <ListItem key={i} bottomDivider>
                            <Image source={{ uri: serie.imagen }} style={{ width: 100, height: 100 }} onPress={() => props.navigation.navigate("Anime", { url: serie.url, name: serie.name, imagen: serie.imagen })} />
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
        button: {
            display: "flex",
            alignItems: "flex-end",
            bottom: 0
        }
    }
)
