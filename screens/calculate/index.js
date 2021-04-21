import React, {useState, useEffect} from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    ScrollView,
} from "react-native";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"


import { Title, TextInput, Button, Paragraph } from 'react-native-paper';

import AppBarJS from "../../components/Appbar"

const getRaceTime = ({data}) => {
    var m = data.mass
    var k = 0.5 * data.cd * data.density * data.height * data.width
    var frontalArea = data.height * data.width
    var t = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4]
    var T = [0, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 0, 0, 0]
    var v = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (var i = 1; i < 14; i++) { 
        v[i] = (((-1 * m) / t[i]) + Math.sqrt((Math.pow((m / t[i]), 2) + (4 * k * T[i])))) / (2 * k)
    }

    return v;
}

const addResults = async ({data}, ref, velocityTable, timeStamp) => {
    await ref.add({
    date: data.date,
    mass: data.mass,
    cd: data.cd,
    density: data.density,
    height: data.height,
    width: data.width,
    dragConstant: data.k,
    velocityTable: velocityTable,
    time: data.time,
    timeStamp: timeStamp
  });
}


const Calculate = ({navigation, route}) => {

    const user = (route.params.user)
    console.log(user)
    const [cd, setCd] = useState(0);
    const [mass, setMass] = useState(0);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [currentDate, setDate] = useState('');
    const [raceTime, setRaceTime] = useState(null);
    const timestamp = new Date()

    const ref = firestore().collection(user.uid);


    useEffect(()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        setDate(
            date+'/'+month+'/'+year
        )
    },[])

    return(
        <>
        <AppBarJS />
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={{marginTop: 10, marginHorizontal: 20}}>
            <Title style={{fontWeight: "bold", marginVertical: 10}}>Enter Values</Title>
            <View>
                <TextInput 
                style = {{marginBottom: 10}}
                label = "Enter drag cofficient"
                value = {cd}
                onChangeText = {text => setCd(text)}
                keyboardType = "numeric"
                />
                 <TextInput 
                 style = {{marginBottom: 10}}
                label = "Enter mass of car in grams"
                value = {mass}
                onChangeText = {text => setMass(text)}
                keyboardType = "numeric"
                />
                 <TextInput 
                 style = {{marginBottom: 10}}
                label = "Enter height of car in mm"
                value = {height}
                onChangeText = {text => setHeight(text)}
                keyboardType = "numeric"
                />
                 <TextInput 
                 style = {{marginBottom: 10}}
                label = "Enter width of car in mm"
                value = {width}
                onChangeText = {text => setWidth(text)}
                keyboardType = "numeric"
                />
            </View>
            <View>
                <Button
                onPress = {()=>{
                    var k = 0.5 * parseFloat(cd) * parseFloat(height) * parseFloat(width) * 0.0000012041
                    var data = {
                        date: currentDate,
                        mass: parseFloat(mass/1000),
                        cd: parseFloat(cd),
                        height: parseFloat(height/1000),
                        width: parseFloat(width/1000),
                        density: 1.2041,
                        k: k,
                        time: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4]
                    }
                    var velocityTable = getRaceTime({data})
                    // getRaceTime({data}, ref)
                    addResults({data}, ref, velocityTable, timestamp)
                    setCd(0)
                    setMass(0)
                    setHeight(0)
                    setWidth(0)
                }}
                mode = "contained"
                color = "#f21d1d"
                style={{height: 50, justifyContent: "center", alignItems: "center"}}
                >
                <Title style={{color: "#ffffff"}}>Calculate</Title>
                </Button>
            </View>
        </View>
        <View style={{marginTop: 20, marginHorizontal: 20}}>
            <Title style={{color: "#f21d1d", fontWeight: "bold"}}>Note:</Title>
            <Paragraph>
                This is a Beta version of the Car Motion Calculator application. No input in the fields above will lead to miscalculations. If you see NaN in the results tab, it means you have entered an alphabetical value by mistake.
            </Paragraph>
        </View>
        <View style={{margin: 20}}>
            <Button mode="contained" color="#1d1d1d" onPress={()=>{
                auth()
                .signOut()
                .then(() => console.log("Signed out!"));
            }}>Sign out</Button>
        </View>
        </ScrollView>
    </SafeAreaView>
    </>
    )}
export default Calculate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});