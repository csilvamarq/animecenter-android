import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteAnimeFromList = (name,setLista,lista) => {
    const newLista = [...lista];
    const index = newLista.map(item => item.name).indexOf(name);
    newLista.splice(index, 1);
    setLista(newLista);
    AsyncStorage.setItem('lista', JSON.stringify(newLista)).then(data => data);
  };

  export const addFollowAnime = (serie,setLista,lista) => {
    const newLista = [...lista, serie];
    setLista(newLista);
    AsyncStorage.setItem('lista', JSON.stringify(newLista)).then(data => data);
  };