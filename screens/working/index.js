import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const Working = (props) => (
    <View style={styles.container}>
        <Text>Working</Text>
    </View>
    )
export default Working;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});