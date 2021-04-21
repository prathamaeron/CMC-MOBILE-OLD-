import React from "react";
import { 
    View,
    Text,
    StyleSheet,
} from "react-native";

import {Button} from "react-native-paper"

import auth from "@react-native-firebase/auth"

const Calculate = (props) => (
    <View style={styles.container}>
        <Button mode="contained" color="#1d1d1d" onPress={()=>{
                auth()
                .signOut()
                .then(() => console.log("Signed out!"));
            }}>Sign out</Button>
    </View>
    )
export default Calculate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});