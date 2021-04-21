import React, {useState, useEffect} from "react";
import { 
    FlatList,
    Text,
    StyleSheet,
    SafeAreaView,
    View
} from "react-native";
import {Title, ActivityIndicator, Button} from "react-native-paper"
import ResultsCard from "../../components/Card"
import AppBarJS from "../../components/Appbar"
import Info from "./info"
import firestore from "@react-native-firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";

const Results = ({navigation, route}) =>
    {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const user = route.params.user
    const ref = firestore().collection(user.uid).orderBy("timeStamp", "desc")


    useEffect(() => {
        return ref.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const { mass, cd, date, timeStamp } = doc.data();
            list.push({
            uid: user.uid,
            id: doc.id,
            date,
            mass,
            cd,
            timeStamp,
            });
          });
    
          setData(list);
    
          if (loading) {
            setLoading(false);
          }
        });
      }, []);

    if (data.length === 0)
    {
      return(
        <>
        <AppBarJS />
        <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
          <Title style={{fontWeight: "400"}}>No results calculated!</Title>
        </View>
        </>
      )
    }

    if (loading)
    {
        return <ActivityIndicator size="large"/>
    }

    return(
    <>

    <AppBarJS />
    <SafeAreaView style={{flex: 1, marginTop: 10, marginHorizontal: 20}}>
    <FlatList 
        style={{flex: 1}}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return(
            <>
        <ResultsCard {...item}/>
        <Button mode="contained" color="#1d1d1d" style={{marginBottom: 10}} onPress={()=>{
          navigation.navigate("Info", {data: item})
        }}>MORE INFO</Button>
        </>
          )
      }}
      />
    </SafeAreaView>
    </>
    )
  }
export default Results;
