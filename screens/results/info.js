import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const Info = (props) => (
    <View style={styles.container}>
        <Text>Info</Text>
    </View>
    )
export default Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});