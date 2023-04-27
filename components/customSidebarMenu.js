// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AppContext from '../context/appContext';

const CustomSidebarMenu = (props) => {
const {theme} = useContext(AppContext)
const styles = StyleSheet.create({
  constainer : {
    flex : 1,
    color : "#232322",
    backgroundColor : "#F5F5F5"
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
      fontFamily : "Gotham-Black"
  },
  darkUserText : {
    textAlign: "center",
    fontFamily : "Gotham-Black",
    color : theme === "dark" ? "#F5F5F5" : "#232322"
}
});
  return (
    <SafeAreaView style={theme === "dark" ? styles.darkContainer : styles.constainer}>
      <View style ={{bottom : 10}}>
      {/*Top Large Image */}
      <Image
        source={{uri: props.userPhoto}}
        style={styles.sideMenuProfileIcon}
      />
      <Text style={theme === "dark" ? styles.darkUserText : styles.userText}>{props.userName}</Text>
      </View>
      <DrawerContentScrollView style={{top : 25}} {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
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
