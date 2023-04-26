import React, { useEffect, useState } from "react";
import List from "./list";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/EvilIcons";
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Search from "./search";
import Lists from "./lists";
import { View } from "react-native";
import { useContext } from "react";
import AppContext from "../context/appContext";
import Series from "./series";

const HomeTabs = (props) => {
    const [active, setActive] = useState("List")
    const Tab = createBottomTabNavigator();
    const {theme,setTheme,token} = useContext(AppContext)
    useEffect(() => {
        props.navigation.setOptions({headerShown: active === "List" ? true : false,headerTitleStyle: { color: theme === "dark" ? "white" : "black" },headerStyle: { backgroundColor: theme === "dark" ? "black" : "white" },title : "Animecenter2", headerRight: () => (<View style={{display : "flex",flexDirection : "row"}}><Icon2 color={theme === "dark" ? "white" : "black"} size={30} name={theme === "dark" ? "md-flashlight" : "md-flashlight-outline"} onPress={() => setTheme(theme === "dark" ? "light" : "dark")} /><Icon color={theme === "dark" ? "white" : "black"} name="search" size={35} onPress={() => props.navigation.navigate("Search")} /></View>) })
    })
    return (
        <Tab.Navigator>
            <Tab.Screen listeners={({ navigation, route }) => ({
                tabPress: e => {
                    setActive("List")
                    navigation.navigate("List")
                }
            })} options={{ tabBarStyle : {backgroundColor : theme === "dark" ? "black" : "white"}, tabBarIcon: () => <Icon color={theme === "dark" ? "white" : "black"} name="play" size={35} /> }} name="List" component={List} />
             <Tab.Screen listeners={({ navigation, route }) => ({
                tabPress: e => {
                    setActive("List")
                    navigation.navigate("List")
                }
            })} options={{ tabBarStyle : {backgroundColor : theme === "dark" ? "black" : "white"}, tabBarIcon: () => <Icon1 color={theme === "dark" ? "white" : "black"} name="picture-o" size={35} /> }} name="Series" component={Series} />
            <Tab.Screen listeners={({ navigation, route }) => ({
                tabPress: e => {
                    setActive("Search")
                    navigation.navigate("Buscar")
                }
            })} options={{ tabBarStyle : {backgroundColor : theme === "dark" ? "black" : "white"},tabBarIcon: () => <Icon color={theme === "dark" ? "white" : "black"} name="search" size={35} /> }} name="Buscar"  component={Search} />
             <Tab.Screen listeners={({ navigation, route }) => ({
                tabPress: e => {
                    setActive("Lists")
                    navigation.navigate("Listas")
                }
            })} options={{tabBarStyle : {backgroundColor : theme === "dark" ? "black" : "white"},tabBarIcon: () => <Icon1 color={theme === "dark" ? "white" : "black"} name="list-alt" size={35} /> }} name="Listas"  component={Lists} />
        </Tab.Navigator>
    );
}

export default HomeTabs