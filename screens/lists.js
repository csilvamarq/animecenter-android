import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, ListItem} from '@rneui/base';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import AppContext from '../context/appContext';

const ListaAnime = props => {
  const {theme,lista,setLista} = useContext(AppContext);
  console.log(lista)
  return (
    <ScrollView>
      {lista.length > 0 ? (
        lista.map((serie,i) => {
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
            </ListItem>
          );
        })
      ) : (
        <View style={style.EmptyList}>
          <Text style={style.EmptyListText}>
            Empieza a seguir algun anime y aparecera aqui
          </Text>
        </View>
      )}
    </ScrollView>
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
});

export default ListaAnime;
