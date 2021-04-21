import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const ResultsCard = ({date, cd, mass, id, uid}) => {

    return (
    <Card style={{height: "auto", width: width-30}}>
        <Card.Title title={date}/>
        <Card.Content>
            <Paragraph>Mass: {mass} kg</Paragraph>
            <Paragraph>Drag Coefficient: {cd}</Paragraph>
        </Card.Content>
        <Card.Actions>
            <Button mode="contained" icon="delete" onPress={()=>{
                firestore()
                .collection(uid)
                .doc(id)
                .delete()
                .then(() => {
                  console.log('Data deleted!');
                });
            }}>DELETE</Button>
        </Card.Actions>
    </Card>
    )
}
export default ResultsCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});