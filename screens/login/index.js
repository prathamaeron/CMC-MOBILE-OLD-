import React, {useState, useEffect} from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth"


GoogleSignin.configure({
  webClientId: '144144737879-8gq2g4ugvrpp572t4522d0d20k8lc02m.apps.googleusercontent.com',
});

  const Login = ({navigation}) => {

    const [user, setUser] = useState(null);

    const onGoogleButtonPress = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }
    
    return(
    <View style={styles.container}>
        <View style={{...StyleSheet.absoluteFill}}>
        <Image source={require('../../assets/loginbg.png')} style={styles.backgroundImage} />
        </View>
        <View style={{alignItems: "center", justifyContent: "center", flex: 1, shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1}}}>
            <Image source={require("../../assets/logoAppBar.png")}/>
        </View>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => onGoogleButtonPress().then(()=>console.log("User Signed In"))
        }
        />
        </View>
    </View>
    )
  }
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});