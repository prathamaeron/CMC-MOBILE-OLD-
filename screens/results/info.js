import React, {useState, useEffect} from "react";
import { 
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from "react-native";
import AppBarJS from "../../components/Appbar"

import firestore from "@react-native-firebase/firestore"


import {Title, Text, Subheading, Headline, DataTable, ActivityIndicator, Paragraph} from "react-native-paper"

import Loading from "../loading"


const Info = ({navigation, route}) => {
    var user = route.params.data
    const [loading, setLoading] = useState(true)
    const [results, setData] = useState([])
    const userCollection = firestore()
                          .collection(user.uid)
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    const [vt, setVt] = useState([])
    const [time, setTime] = useState([])

    useEffect(() => {
      return userCollection.onSnapshot((querySnapshot) => {
        const list = []
        querySnapshot.forEach(doc => {
          if (doc.id == user.id){
            list.push(doc.data())
            setData(list)
          }
        })

      if (loading){
        setLoading(false)
      }

      });
    }, []);

    
    if (loading){
      return (
        <Loading />
      )
    }

    var total = 0;
    for(var i = 0; i < results[0].velocityTable.length; i++) {
    total += results[0].velocityTable[i];
    }
    var avg = total / results[0].velocityTable.length;
    console.log(avg)
    
    return(
    <>
    <AppBarJS />
    <View style={styles.container}>
      <ScrollView style={{width: width - 30}}>
        <Headline>{results[0].date}</Headline>
        <Title style={{marginTop: 10, fontWeight: "bold"}}>User Inputs</Title>
        <DataTable>
    <DataTable.Header>
      <DataTable.Title>Factor</DataTable.Title>
      <DataTable.Title numeric>Value</DataTable.Title>
      <DataTable.Title numeric>SI Unit</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>Mass</DataTable.Cell>
      <DataTable.Cell numeric>{results[0].mass}</DataTable.Cell>
      <DataTable.Cell numeric>kg</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Height</DataTable.Cell>
      <DataTable.Cell numeric>{results[0].height}</DataTable.Cell>
      <DataTable.Cell numeric>m</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Width</DataTable.Cell>
      <DataTable.Cell numeric>{results[0].width}</DataTable.Cell>
      <DataTable.Cell numeric>m</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Drag Coefficient</DataTable.Cell>
      <DataTable.Cell numeric>{results[0].cd}</DataTable.Cell>
      <DataTable.Cell numeric>None</DataTable.Cell>
    </DataTable.Row>
  </DataTable>
  <Title style={{marginTop: 10, fontWeight: "bold"}}>Calculated Data</Title>
  <DataTable>
    <DataTable.Header>
      <DataTable.Title>Factor</DataTable.Title>
      <DataTable.Title numeric>Value</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>Average Velocity</DataTable.Cell>
      <DataTable.Cell numeric>{avg} m/s</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Race Time</DataTable.Cell>
      <DataTable.Cell numeric>#TODO s</DataTable.Cell>
    </DataTable.Row>


  </DataTable>
  <View style={{justifyContent: "center", alignItems: "center", marginTop: 10}}>
  <Paragraph>For detailed analysis, visit our website!</Paragraph>
  </View>
    </ScrollView>
    </View>
    </>
    )
}
export default Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    }
});