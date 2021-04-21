import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const Results = (props) => (
    <View style={styles.container}>
        <Text>Results</Text>
    </View>
    )
export default Results;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});