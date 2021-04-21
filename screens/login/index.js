import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const Login = (props) => (
    <View style={styles.container}>
        <Text>Login</Text>
    </View>
    )
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});