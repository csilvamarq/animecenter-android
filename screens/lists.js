import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, ListItem} from '@rneui/base';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import AppContext from '../context/appContext';
import Icon from 'react-native-vector-icons/EvilIcons';
import {deleteAnimeFromList} from '../helpers/followFunctions';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const ListaAnime = props => {
  const {theme, lista, setLista} = useContext(AppContext);
  useEffect(() => {
    props.navigation.setOptions({
      headerStyle: {backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5'},
    });
  });
  return (
    <SafeAreaProvider>
      <ScrollView
        style={{backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5'}}>
        {lista.length > 0 ? (
          lista.map((serie, i) => {
            return (
              <ListItem
                containerStyle={{
                  backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5',
                }}
                key={i}
                bottomDivider>
                <Image
                  source={{uri: serie.image}}
                  style={{width: 100, height: 100}}
                />
                <ListItem.Content
                  style={{
                    backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5',
                  }}>
                  <ListItem.Title
                    style={{color: theme === 'dark' ? '#F5F5F5' : '#232322'}}>
                    {serie.name}
                  </ListItem.Title>
                </ListItem.Content>
                <Icon
                color={ theme === 'dark' ? '#F5F5F5' : '#232322'}
                  name="trash"
                  onPress={() =>
                    
                    deleteAnimeFromList(serie.name, setLista, lista)
                  }
                  size={25}
                />
              </ListItem>
            );
          })
        ) : (
          <View
            style={{
              ...style.EmptyList,
              backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5',
            }}>
            <Text
              style={{
                ...style.EmptyListText,
                color: theme === 'dark' ? '#F5F5F5' : '#232322',
              }}>
              Empieza a seguir algun anime y aparecera aqui
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

const style = StyleSheet.create({
  EmptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '60%',
  },
  EmptyListText: {
    fontSize: 18,
    textAlign: 'center',
  },
  FollowButton: {
    borderRadius: '10px',
  },
});

export default ListaAnime;
