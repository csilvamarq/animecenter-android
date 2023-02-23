import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ViewMoreText from 'react-native-view-more-text';
import { API } from "../api";
import { Image, TouchableHighlight, View, TextInput, Modal, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign'
import { Text } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';

const ListaAnime = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lista, setLista] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [hover, setHover] = useState(false);
    const [searchLoad, setSearchLoad] = useState(false);
    const [search, setSearch] = useState([]);
    const [DropDown, setDropDown] = useState(false)
    const [animes, setAnimes] = useState([]);
    const [value, setValue] = useState(null)
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (values) => {
        if (lista) {
            const list = JSON.parse(lista);
            list.push({
                name: values.nombre,
                descripcion: values.descripcion,
                animes: animes,
            });
            await AsyncStorage.setItem("listas", JSON.stringify(list));
            setLista(JSON.stringify(list))
            setAnimes([]);
        } else {
            const arr = [];
            arr.push({
                name: values.nombre,
                descripcion: values.descripcion,
                animes: animes,
            });
            await AsyncStorage.setItem("listas", JSON.stringify(arr));
            setAnimes([]);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setAnimes([]);
        setSearch([]);
    };
    const handleClear = () => {
        setSearch([]);
    };

    const onChange = (value) => {
        const filtered = search.filter((item) => item.label === value.label)[0];
        if (animes.find((item) => item.name === value.label) === undefined) {
            setAnimes((current) => [
                ...current,
                { imagen: filtered.imagen, url: filtered.value, name: value.label },
            ]);
        }
    };
    const onSelect = (value) => {
        setSearchLoad(true);
        axios.get(`${API}/search/${value}`)
            .then(({ data }) => {
                let arr = [];
                data.map((item) =>
                    arr.push({ value: item.url, label: item.name, imagen: item.imagen })
                );
                setSearch(arr);
                setSearchLoad(false);
            });
    };
    useEffect(() => {
        props.navigation.setOptions({ title: "Mis Listas" })
        AsyncStorage.getItem("listas").then((data) => {
            setLista(data ? JSON.parse(data).length === 0 ? null : data : null)
        })

    }, [])
    return (
        <ScrollView style={{ padding: 20, display: "flex" }}>
            {lista ? (
                <View style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }} >
                    {JSON.parse(lista).map((item) => {
                        return <View style={{ width: "100%" }}>
                            <Text>{item.name}  <Icon name="delete" onPress={() => {
                                const newList = JSON.parse(lista).filter((lista) => lista.name !== item.name)
                                localStorage.setItem("listas", JSON.stringify(newList))
                                setLista(newList.length === 0 ? null : JSON.stringify(newList))
                            }} /></Text>
                            <View style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }} >
                                {item.animes.map((anime) => {
                                    return (
                                        <View style={{ display: "flex", flexDirection: "column", padding: "2%", width: "fit-content", width: `${100 / item.animes.length}%` }}>
                                            <View style={{ display: "flex", flexDirection: "column", height: "100%" }} ><View style={{ width: "60%" }}><ViewMoreText
                                                numberOfLines={2}
                                                renderViewMore="Leer mas"
                                                renderViewLess="Leer menos"
                                            >
                                                <Text>{anime.name}</Text>
                                            </ViewMoreText>
                                            </View>
                                                <View style={{ width: "40%" }}>
                                                    <Icon name="delete" style={{ cursor: "pointer" }} size={40} />
                                                </View>
                                            </View>
                                            <Image onPress={() => { props.navigation.navigate("/anime", { state: { name: anime.name, enlace: anime.url, image: anime.imagen } }) }} preview={false} height={"100%"} width={"70%"} src={anime.imagen} />
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    })}
                </View>
            ) : (
                <View>
                    <Text>Aun no tienes ninguna lista</Text>
                    <Button title="Nueva Lista" onPress={showModal} />
                </View>
            )}
                <Modal transparent={true} animationType="slide" visible={isModalOpen}>
                    <View style={style.modals} >

                        <View style={style.form}>
                            <Text h1>Crear Lista <Icon name="closecircleo" onPress={() => setIsModalOpen(false)} size={20} /></Text>
                            <Text style={{ textAlign: "left" }}>Nombre</Text>
                            <TextInput style={style.input} value={name} isRequired asterik onChangeText={(name) => setName(name)} />
                            <Text style={{ textAlign: "left" }}>Descripción</Text>
                            <TextInput style={style.input} value={description} isRequired asterik onChangeText={() => setDescription(description)} />
                            <Text>Animes</Text>
                            <DropDownPicker
                                containerProps={{
                                    height: DropDown === true ? 150 : null,
                                    backgroundColor: "#fff",
                                }}
                                searchable={true}
                                onChangeSearchText={onSelect}
                                open={DropDown}
                                onClose={() => setDropDown(false)}
                                value={value}
                                items={search}
                                loading={searchLoad}
                                setValue={setValue}
                                setOpen={() => setDropDown(true)}
                            />
                        </View>
                        <Button title="Crear Lista" onPress={handleOk} />
                        <View style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }} >
                            {animes.map((item) => {
                                return (
                                    <View style={{ width: "40%", padding: "2%" }}>
                                        <View style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }} >
                                            <>
                                                <View span={22}>
                                                    <Text>
                                                        <ViewMoreText
                                                            numberOfLines={2}
                                                            renderViewMore="Leer mas"
                                                            renderViewLess="Leer menos"
                                                        >
                                                            <Text>{item.name}</Text>
                                                        </ViewMoreText>
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        justifyContent: "center",
                                                        alignSelf: "flex-end",
                                                        height: "30px",
                                                    }}
                                                    span={2}
                                                >
                                                    <Icon name="delete"
                                                        onMouseOver={() => setHover(true)}
                                                        onMouseLeave={() => setHover(false)}
                                                        style={{ color: hover ? "red" : "black" }}
                                                        onPress={() => {
                                                            setHover(false);
                                                            setAnimes(
                                                                animes.filter(
                                                                    (anime) => anime.name !== item.name
                                                                )
                                                            );
                                                        }}
                                                        size={40}
                                                    />
                                                </View>
                                            </>
                                        </View>
                                        <TouchableHighlight onPress={() => {
                                            props.navigation.navigate("/anime", {
                                                state: {
                                                    name: item.name,
                                                    enlace: item.url,
                                                    image: item.imagen,
                                                },
                                            });
                                        }}>
                                            <Image
                                                src={item.imagen}
                                                width="100%"
                                                height="90%"
                                            />
                                        </TouchableHighlight>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </Modal>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    modals: {
        margin: 30,
        height : "70%",
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        padding : "8%"
       },
       form : {
        fontSize : 10, 
        display : "flex",
        flexDirection : "column"
        ,alignItems : "center"
       },
    input: {
        backgroundColor: "#FAF9F6",
        borderRadius: 5,
        width: "65%",
        height : 40,
        borderWidth: 0.75,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    }
})

export default ListaAnime;
