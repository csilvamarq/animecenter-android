import React, {useState, useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext } from 'react';
import AppContext from '../context/appContext';
import { API } from '../api';
const Login = props => {
  const [loading, setLoading] = useState(false);
  const {setToken,setUserInfo} = useContext(AppContext)
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState(false);
  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId:
        '439011813979-sn2u250ms59r57khpccp19gi6r3kksmd.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    _isSignedIn()
  }, []);
  const tokenSignIn = async userInfo => {
    // ("userInfo")
    // (userInfo)
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    // ('GOOGLE CREDENTIAL');
    // (googleCredential);

    // Sign-in the user with the credential
    const signInWithCredential = await auth().signInWithCredential(
      googleCredential,
    );
    // ('SIGN IN WITH CREDENTIAL');
    // (signInWithCredential);

    //Get the token from the current User
    const idTokenResult = await auth().currentUser.getIdTokenResult();
    // ('USER JWT');
    // (idTokenResult.token);
     //Validate User Token

     await axios.post(`${API}/token`, {
      token: idTokenResult.token,
      email: userInfo.user.email
    })
      .then(async response => {
        // ("JWT TOKEN FROM EXPRESS");
        // (response.data);
        setToken(response.data.data.access_token)
      })
      .catch(error => {
        ''
        // ("RESPONSE ERROR TOKEN VERIFICATION");
        // (error);
      })

  };
  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      setLoading(true);
      setLogin(true);
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      // ('ID TOKEN');
      // (userInfo);
      setMessage("Informacion");
      await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));
      // ('USER TOKEN SAVED');
      // (token);
      
      await tokenSignIn(userInfo);
      const userEmail = await AsyncStorage.setItem('user_email',userInfo.user.email);
      // setMessage("Login Correcto");
      // ('USER EMAIL ', userEmail);
      setLoading(false);
      await AsyncStorage.setItem('login', 'logged');
      await AsyncStorage.setItem('login', JSON.stringify(true));
       props.navigation.navigate('Home');
    } catch (error) {
      ('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
        setLoading(false);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
        setLoading(false);
      }
    }
  };
  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
     _signIn()
    }
  };

  const _signOut = async () => {
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('login');
      setUserInfo('');
      // Removing user Info
      setLogin(false);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>{message}</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {/* {('INFO')}
        {(userInfo)} */}
        <View>
          <View style={styles.container}>
            {login ? props.navigation.navigate("Home") : (
              <GoogleSigninButton
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={_signIn}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#232322',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    fontFamily: 'Gotham-Bold',
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#61b97c',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  text: {
    color: '#232322',
    fontFamily: 'Gotham-Bold',
  },
  darkText: {
    color: '#F5F5F5',
    fontFamily: 'Gotham-Bold',
  },
});

export default Login;
