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
const Login = props => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState('');
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
    _isSignedIn();
  }, []);
  const tokenSignIn = async userInfo => {
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    console.log('GOOGLE CREDENTIAL');
    console.log(googleCredential);

    // Sign-in the user with the credential
    const signInWithCredential = await auth().signInWithCredential(
      googleCredential,
    );
    console.log('SIGN IN WITH CREDENTIAL');
    console.log(signInWithCredential);

    //Get the token from the current User
    const idTokenResult = await auth().currentUser.getIdTokenResult();
    console.log('USER JWT');
    console.log(idTokenResult.token);
  };
  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      console.log(1)
      setLoading(true);
      setLogin(true);
      const user_email = await AsyncStorage.getItem('user_email');
      const user_status = await AsyncStorage.getItem('user_status');
      setEmail(user_email);
      // Set User Info if user is already signed in
      console.log('signed in ' + user_email);
      setMessage("Logged");
      setLoading(false);
      props.navigation.navigate('Home');
    }
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
      console.log('ID TOKEN');
      console.log(userInfo);
      setMessage("Informacion");
      const token = await AsyncStorage.getItem('token');
      await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));
      console.log('USER TOKEN SAVED');
      console.log(token);
      await tokenSignIn(userInfo);
      const userEmail = await AsyncStorage.getItem('user_email');
      setMessage("Login Correcto");
      console.log('USER EMAIL ', userEmail);
      setLoading(false);
      await AsyncStorage.setItem('login', 'logged');
      await AsyncStorage.setItem('login', JSON.stringify(true));
      props.navigation.navigate('Home');
    } catch (error) {
      console.log('Message', JSON.stringify(error));
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
        {console.log('INFO')}
        {console.log(userInfo)}
        <View>
          <View style={styles.container}>
            {login ? (
              <>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={_signOut}><Text>Cerrar sesion</Text></TouchableOpacity>
              </>
            ) : (
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
