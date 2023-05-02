import React, { useEffect } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/EvilIcons";
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { View } from "react-native";
import { useContext } from "react";
import AppContext from "../context/appContext";
import List from "./list";
import Series from "./series";
import Search from "./search";
import Lists from "./lists";
import CustomSidebarMenu from "../components/customSidebarMenu";
const Home = (props) => {
    const Drawer = createDrawerNavigator()
    const {theme,setTheme,userInfo} = useContext(AppContext)
    useEffect(() => {
        props.navigation.setOptions({headerShown:  false , headerTitleStyle: { color: theme === "dark" ? "#F5F5F5" : "#232322" },headerStyle: { backgroundColor: theme === "dark" ? "#232322" : "#F5F5F5" },title : "Animecenter2", headerRight: () => (<View style={{display : "flex",flexDirection : "row"}}><Icon2 color={theme === "dark" ? "#F5F5F5" : "#232322"} size={30} name={theme === "dark" ? "md-flashlight" : "md-flashlight-outline"} onPress={() => setTheme(theme === "dark" ? "light" : "dark")} /><Icon color={theme === "dark" ? "#F5F5F5" : "#232322"} name="search" size={35} onPress={() => props.navigation.navigate("Search")} /></View>) })
    },[])
    return (
        <Drawer.Navigator screenOptions={({navigation}) => ({
           headerTitleStyle : {color: theme === "dark" ? "#F5F5F5" : "#232322"}, headerLeft : props => <Icon2 color={theme === "dark" ? "#F5F5F5" : "#232322"} name="menu" onPress={navigation.toggleDrawer} size={40} />
        })}   drawerContent={(props) => <CustomSidebarMenu userName={userInfo ? `${userInfo.user.givenName}` : "Bienvenido Admin"} userPhoto={userInfo ? userInfo.user.photo : "https://media-exp1.licdn.com/dms/image/C4D03AQHj0LXK6dAddA/profile-displayphoto-shrink_200_200/0/1603400414371?e=1643241600&v=beta&t=N0urNAN-gID1GjtJeZW3Dej94EjRSjvKhYQum3bQeNs"} {...props} />}>
        <Drawer.Screen 
         options={{ drawerLabelStyle : {color: theme === "dark" ? "#F5F5F5" : "#232322"}, drawerStyle : {backgroundColor : theme === "dark" ? "#232322" : "#F5F5F5"}, drawerIcon: () => <Icon color={theme === "dark" ? "#F5F5F5" : "#232322"} name="play" size={35} /> }} name="List" component={List} />
         <Drawer.Screen  options={{ drawerLabelStyle : {color: theme === "dark" ? "#F5F5F5" : "#232322"}, drawerStyle : {backgroundColor : theme === "dark" ? "#232322" : "#F5F5F5"}, drawerIcon: () => <Icon1 color={theme === "dark" ? "#F5F5F5" : "#232322"} name="picture-o" size={35} /> }} name="Series" component={Series} />
        <Drawer.Screen  options={{ drawerLabelStyle : {color: theme === "dark" ? "#F5F5F5" : "#232322"}, drawerStyle : {backgroundColor : theme === "dark" ? "#232322" : "#F5F5F5"},drawerIcon: () => <Icon color={theme === "dark" ? "#F5F5F5" : "#232322"} name="search" size={35} /> }} name="Buscar"  component={Search} />
         <Drawer.Screen  options={{ drawerLabelStyle : {color: theme === "dark" ? "#F5F5F5" : "#232322"},drawerStyle : {backgroundColor : theme === "dark" ? "#232322" : "#F5F5F5"},drawerIcon: () => <Icon1 color={theme === "dark" ? "#F5F5F5" : "#232322"} name="list-alt" size={35} /> }} name="Listas"  component={Lists} />
    </Drawer.Navigator>
    );
}

export default Home