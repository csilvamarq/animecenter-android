import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteAnimeFromList = (name, setLista, lista) => {
  const newLista = [...lista];
  const index = newLista.map(item => item.name).indexOf(name);
  newLista.splice(index, 1);
  setLista(newLista);
  AsyncStorage.setItem('lista', JSON.stringify(newLista)).then(data => data);
};

export const addFollowAnime = (serie, setLista, lista) => {
  const newLista = [...lista, serie];
  setLista(newLista);
  AsyncStorage.setItem('lista', JSON.stringify(newLista)).then(data => data);
};

export const UpdateAnimeField = (name, field, setLista, lista) => {
  const newLista = [...lista]
  const item = newLista.find((item) => item.name === name);
  const index = newLista.map(item => item.name).indexOf(name);
  newLista.splice(index, 1);
  const updatedItem = {...item,...field}
  setLista([...newLista,updatedItem])
  AsyncStorage.setItem('lista', JSON.stringify([...newLista,updatedItem])).then(data => data);
};
