import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth"


GoogleSignin.configure({
  webClientId: '144144737879-8gq2g4ugvrpp572t4522d0d20k8lc02m.apps.googleusercontent.com',
});

const onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

const Login = (props) => (
    <View style={styles.container}>
    <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
    </View>
    )
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});