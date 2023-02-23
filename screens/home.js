import React, { useEffect, useState } from "react";
import List from "./list";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/EvilIcons";
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Search from "./search";
import Lists from "./lists";

const Home = (props) => {
    const [active, setActive] = useState("List")
    const Tab = createBottomTabNavigator();
    useEffect(() => {
        console.log(active)
        props.navigation.setOptions({ headerShown: active === "List" ? true : false,title : "Anime", headerRight: () => (<Icon name="search" size={35} onPress={() => props.navigation.navigate("Search")} />) })
    })
    return (
        <Tab.Navigator>
            <Tab.Screen listeners={({ navigation, route }) => ({
                tabPress: e => {
                    setActive("List")
                    navigation.navigate("List")
                }
            })} options={{ tabBarIcon: () => <Icon name="play" size={35} /> }} name="List" component={List} />
            <Tab.Screen listeners={({ navigation, route }) => ({
                tabPress: e => {
                    setActive("Search")
                    navigation.navigate("Buscar")
                }
            })} options={{ tabBarIcon: () => <Icon name="search" size={35} /> }} name="Buscar"  component={Search} />
             <Tab.Screen listeners={({ navigation, route }) => ({
                tabPress: e => {
                    setActive("Lists")
                    navigation.navigate("Listas")
                }
            })} options={{tabBarIcon: () => <Icon1 name="list-alt" size={35} /> }} name="Listas"  component={Lists} />
        </Tab.Navigator>
    );
}

export default Home