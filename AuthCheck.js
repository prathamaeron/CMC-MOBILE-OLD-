import React, {useState, useEffect} from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from "./screens/login"
import Calculate from "./screens/calculate"
import Results from "./screens/results"
import Info from "./screens/results/info"
import Working from "./screens/working"
import Loading from "./screens/loading"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthCheck = () => {
    return (
    <View style={styles.container}>
        <Text>AuthCheck</Text>
    </View>
    )
}
export default AuthCheck;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});