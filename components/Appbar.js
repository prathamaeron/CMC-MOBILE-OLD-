import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView
} from "react-native";

import {Appbar, DefaultTheme} from "react-native-paper"

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const AppBarJS = (props) => (
    <SafeAreaView style={{height: 150, width: width, justifyContent: "center", alignItems: "center"}}>
        <Image source={require("../assets/logoAppBar.png")}/>
    </SafeAreaView>
    )
export default AppBarJS;
