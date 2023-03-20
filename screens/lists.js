import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import ViewMoreText from 'react-native-view-more-text';
import {API} from '../api';
import {
  Image,
  TouchableHighlight,
  View,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import AppContext from '../context/appContext';

const ListaAnime = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaOpen, setListaOpen] = useState([]);
  const [lista, setLista] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hover, setHover] = useState(false);
  const [searchLoad, setSearchLoad] = useState(false);
  const [search, setSearch] = useState([]);
  const [DropDown, setDropDown] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [value, setValue] = useState(null);
  const {theme} = useContext(AppContext)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (lista) {
      const list = JSON.parse(lista);
      list.push({
        name: name,
        descripcion: description,
        animes: animes,
      });
      await AsyncStorage.setItem('listas', JSON.stringify(list));
      setLista(JSON.stringify(list));
      setAnimes([]);
    } else {
      const arr = [];
      arr.push({
        name: name,
        descripcion: description,
        animes: animes,
      });
      await AsyncStorage.setItem('listas', JSON.stringify(arr));
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

  const onChange = value => {
    if (animes.find(item => item.name === value.label) === undefined) {
      setAnimes(current => [
        ...current,
        {imagen: value.imagen, url: value.value, name: value.label},
      ]);
    }
  };
  const onSelect = value => {
    setSearchLoad(true);
    axios.get(`${API}/search/${value}`).then(({data}) => {
      let arr = [];
      data.map(item =>
        arr.push({value: item.url, label: item.name, imagen: item.imagen}),
      );
      setSearch(arr);
      setSearchLoad(false);
    });
  };
  useEffect(() => {
    props.navigation.setOptions({
      title: 'Mis Listas',
      headerTitleStyle: { color: theme === "dark" ? "white" : "black" },
      headerStyle: { backgroundColor: theme === "dark" ? "black" : "white" },
      headerRight: () => (
        <>
          <Icon name="pluscircleo" size={30} onPress={showModal} />
        </>
      ),
    });
    AsyncStorage.getItem('listas').then(data => {
      setListaOpen(JSON.parse(data).map(() => false));
      setLista(data ? (JSON.parse(data).length === 0 ? null : data) : null);
    });
  }, []);
  useEffect(() => {
    AsyncStorage.getItem('listas').then(data => {
      setLista(data ? (JSON.parse(data).length === 0 ? null : data) : null);
    });
  }, [animes]);
  const height = 800
  return (
    <ScrollView contentContainerStyle={{height: '100%',backgroundColor :theme === "dark" ? "black" : "white" }}>
      {lista ? (
        <ScrollView>
          {JSON.parse(lista).map((item, index) => {
            
            return (
              <CollapsibleView
                expanded={listaOpen[index]}
                unmountOnCollapse={true}
                style={{color: theme === "dark" ? "white" : "black", borderRadius: 5, height: listaOpen[index] ? height : 50}}
                title={
                  <Text
                    onPress={() => {
                      let newLista = listaOpen.map((item, index1) => {
                        if (index === index1) {
                          item === false ? (item = true) : (item = false);
                        }
                        return item;
                      });
                      setListaOpen(newLista);
                    }}
                    style={{color:  theme === "dark" ? "white" : "black"}}>
                    {item.name.toUpperCase()}
                  </Text>
                }>
                <Text style={{color:  theme === "dark" ? "white" : "black"}} >{item.descripcion}</Text>
                <ScrollView
                  style={{
                  }}>
                  {item.animes.map(anime => {
                    return (
                      <View>
                        <View>
                          <View>
                            <ViewMoreText
                              numberOfLines={2}
                              renderViewMore="Leer mas"
                              renderViewLess="Leer menos">
                              <Text style={{...style.itemName,color:  theme === "dark" ? "white" : "black"}}>{anime.name}</Text>
                            </ViewMoreText>
                          </View>
                        </View>
                        <Image
                          source={{uri: anime.imagen}}
                          style={{marginRight: 30, marginLeft: 30, height: height/(item.animes.length+0.5),imageRendering: "--webkit-optimize-contrast"}}
                          onPress={() =>
                            props.navigation.navigate('Anime', {
                              url: serie.url,
                              name: serie.name,
                              imagen: serie.imagen,
                            })
                          }
                        />
                      </View>
                    );
                  })}
                </ScrollView>
                <View style={{alignItems : "flex-end"}}>
                            <Icon name='delete' size={20} ></Icon>
                      </View>
              </CollapsibleView>
              
            );
          })}
        </ScrollView>
      ) : (
        <View>
          <Text>Aun no tienes ninguna lista</Text>
          <Button title="Nueva Lista" onPress={showModal} />
        </View>
      )}
      <Modal transparent={true} animationType="slide" visible={isModalOpen}>
        <View style={style.modals}>
          <View style={style.form}>
            <Text h1>
              Crear Lista{' '}
              <Icon name="closecircleo" onPress={handleCancel} size={20} />
            </Text>
            <Text style={{textAlign: 'left'}}>Nombre</Text>
            <TextInput
              style={style.input}
              value={name}
              isRequired
              asterik
              onChangeText={name => setName(name)}
            />
            <Text style={{textAlign: 'left'}}>Descripción</Text>
            <TextInput
              style={style.input}
              value={description}
              isRequired
              asterik
              onChangeText={() => setDescription(description)}
            />
            <Text>Animes</Text>
            <DropDownPicker
              placeholder="Busca un anime"
              containerProps={{
                height: DropDown === true ? '50%' : null,
                backgroundColor: '#fff',
              }}
              searchPlaceholder="Escribe algo"
              searchable={true}
              onChangeSearchText={onSelect}
              onSelectItem={onChange}
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '100%',
              width: '100%',
            }}>
            {animes.map((item, index) => {
              return (
                <View style={{padding: '2%'}} key={index}>
                  <Text>{item.name}</Text>
                  <TouchableHighlight
                    onPress={() => {
                      props.navigation.navigate('/anime', {
                        state: {
                          name: item.name,
                          enlace: item.url,
                          image: item.imagen,
                        },
                      });
                    }}>
                    <Image
                      source={{uri: item.imagen}}
                      style={{width: 75, height: 75}}
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
    height: '100%',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    padding: '8%',
  },
  form: {
    fontSize: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FAF9F6',
    borderRadius: 5,
    width: '65%',
    height: 40,
    borderWidth: 0.75,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  image: {
    flex: 1,
    aspectRatio: 0.8,
    resizeMode: 'cover',
    width: 100,
    height: 100,
  },
});

export default ListaAnime;
