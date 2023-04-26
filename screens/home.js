import React, { useEffect } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from 'react-native-vector-icons/Ionicons'
import { View } from "react-native";
import { useContext } from "react";
import AppContext from "../context/appContext";
import HomeTabs from "./homeTabs";

const Home = (props) => {
    const Drawer = createDrawerNavigator();
    const {theme,setTheme} = useContext(AppContext)
    useEffect(() => {
        props.navigation.setOptions({headerShown: false,headerTitleStyle: { color: theme === "dark" ? "white" : "black" },headerStyle: { backgroundColor: theme === "dark" ? "black" : "white" },title : "Animecenter2", headerRight: () => (<View style={{display : "flex",flexDirection : "row"}}><Icon2 color={theme === "dark" ? "white" : "black"} size={30} name={theme === "dark" ? "md-flashlight" : "md-flashlight-outline"} onPress={() => setTheme(theme === "dark" ? "light" : "dark")} /><Icon color={theme === "dark" ? "white" : "black"} name="search" size={35} onPress={() => props.navigation.navigate("Search")} /></View>) })
    })
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Tabs"  component={HomeTabs} />
        </Drawer.Navigator>
    );
}

export default Home