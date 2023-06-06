import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, ListItem} from '@rneui/base';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import AppContext from '../context/appContext';
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  UpdateAnimeField,
  deleteAnimeFromList,
} from '../helpers/followFunctions';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {styles as global} from '../styles/styles';
import NumericInput from 'react-native-numeric-input';

const ListaAnime = props => {
  const {theme, lista, setLista} = useContext(AppContext);
  useEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: theme === 'dark' ? '#232322' : '#F5F5F5',
      },
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
                    style={{
                      ...global.titles,
                      color: theme === 'dark' ? '#F5F5F5' : '#232322',
                    }}>
                    {serie.name}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{
                      ...global.Text,
                      textAlign: 'center',
                      color: theme === 'dark' ? '#F5F5F5' : '#232322',
                    }}>
                    Episodio
                  </ListItem.Subtitle>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <NumericInput
                      onChange={value => {
                        UpdateAnimeField(
                          serie.name,
                          {currentEp: value},
                          setLista,
                          lista,
                        );
                      }}
                      minValue={0}
                      value={serie.currentEp}
                      maxValue={serie.episodes}
                      totalWidth={50}
                      totalHeight={30}
                      iconSize={25}
                      step={1}
                      valueType="real"
                      rounded
                      textColor="#B0228C"
                      iconStyle={{color: 'white'}}
                      rightButtonBackgroundColor="#000000"
                      leftButtonBackgroundColor="#232322"
                    />
                    <Text
                      style={{
                        ...global.Text,
                        textAlign: 'center',
                        color: theme === 'dark' ? '#F5F5F5' : '#232322',
                      }}>{` de ${serie.episodes}`}</Text>
                  </View>
                </ListItem.Content>
                <Icon
                  color={theme === 'dark' ? '#F5F5F5' : '#232322'}
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
                ...global.SubTitle,
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
