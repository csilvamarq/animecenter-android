// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AppContext from '../context/appContext';
import { Divider } from '@rneui/base';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles as global }  from '../styles/styles';

const CustomSidebarMenu = (props) => {
const {theme,setUserInfo,setLogin} = useContext(AppContext)
const styles = StyleSheet.create({
  constainer : {
    flex : 1,
    color : "#232322",
  },
  darkContainer : {
    flex : 1,
    color : "#F5F5F5",
    backgroundColor : "#232322",
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    marginTop : 15,
    width: 90,
    height: 90,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText : {
      textAlign: "center",
      position : "relative",
      color : "white",
      fontSize : 22,
  },
  darkUserText : {
    textAlign: "center",
    fontFamily : "Gotham-Black",
    color : theme === "dark" ? "#F5F5F5" : "#232322"
}
});
  return (
    <SafeAreaView style={theme === "dark" ? styles.darkContainer : styles.constainer}>
      <ImageBackground source={require("../assets/profileBackground.jpg")} style ={{borderBottomWidth : 1}}>
      {/*Top Large Image */}
      <View style={{width : "40%",}}>
      <Image
        source={{uri: props.userPhoto}}
        style={styles.sideMenuProfileIcon}
      />
      <Text style={{...global.titles,...styles.theme === "dark" ? styles.darkUserText : styles.userText}}>{props.userName}</Text>
      </View>
      </ImageBackground>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Divider />
      <View style={{width : "100%", height : "20%",padding : "8%",display : "flex",flexDirection : "row"}}>
      <Icon color={theme === "dark" ? "white" : "black"}  onPress={async () => {
         await GoogleSignin.revokeAccess();
         await GoogleSignin.signOut();
         await AsyncStorage.removeItem('login');
         setUserInfo('');
         setLogin(false)
         props.navigation.navigate("Login")
      }} name="sign-out" size={25} />
      <Text style={{...global.SubTitle,color : theme === "dark" ? "white" : "black",marginLeft : 10}}>Logout</Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color : theme === "dark" ? "#F5F5F5" : "#232322"
        }}>
        Animecenter {new Date().getFullYear()}®
      </Text>
    </SafeAreaView>
  );
};


export default CustomSidebarMenu;
