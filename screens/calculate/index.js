import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const Calculate = (props) => (
    <View style={styles.container}>
        <Text>Calculate</Text>
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