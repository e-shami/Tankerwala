import React from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions, Alert
} from "react-native";

import {
    Text,
    TextInput,
    Checkbox,
    Button,
} from "react-native-paper";

import auth from '@react-native-firebase/auth';
import FlashMessage, { showMessage } from "react-native-flash-message";
const window = Dimensions.get('window');
const screen = {
    height: window.height,
    width: window.width
}

function Login({navigation}){

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const handleSignIn = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            showMessage({
                message: "Login Successful",
                type: "success",
                animated: true,
                duration: 2000
            });
    
            setTimeout(()=>{
                navigation.navigate("Dashboard");
            }, 3000)
            
          } catch (error) {
            console.error('Error signing in:', error);
            Alert.alert('Error', 'Invalid email or password');
          }
    }

    const handleSignUp = () => {
        navigation.navigate('Register');
      };



    return(
        <View style={styles.outerContainer}>
            <View style={[styles.innerContainer, {height:screen.height * 0.825}]}>
                <Text variant="displaySmall"
                style={{textAlign:"center", marginBottom:25}}>
                    Sign in
                </Text>

                <TextInput style={styles.inputFields}
                    mode="outlined"
                    label="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    />
                <TextInput
                    style={styles.inputFields}
                    mode="outlined"
                    label="Password"
                    secureTextEntry={!isPasswordVisible}
                    right={
                        <TextInput.Icon
                        icon={isPasswordVisible ? 'eye' : 'eye-off'}
                        onPress={togglePasswordVisibility}
                        />
                    }
                    value={password}
                    onChangeText={text => setPassword(text)}
                    />

                <View style={[styles.row, {marginTop:10, marginBottom:20}]}>
                    <Checkbox.Item label="Remember me!"
                        style={{paddingLeft:-5}}
                        labelVariant="bodySmall"
                        position="leading"
                        status={checked ? 'checked': 'unchecked'}
                        onPress={()=>{
                            setChecked(!checked)
                        }}
                        />

                    <TouchableOpacity style={[styles.boxingAround, {width:120}]}>
                        <Text variant="bodySmall"
                        style={{fontWeight:"bold"}}>
                            Forget password?
                        </Text>
                    </TouchableOpacity>
                </View>

                <Button 
                mode="contained"
                buttonColor="#655959"
                onPress={handleSignIn}>
                    Login
                </Button>

                <View style={[styles.row, {marginTop:40, marginBottom:40}]}>
                    <View style={styles.line}/>
                    <Text variant="bodyMedium"
                        style={{fontWeight:"bold"}}>
                            Or
                    </Text>
                    <View style={styles.line}/>
                </View>
                
                <Button 
                mode="contained"
                buttonColor="#655959">
                    Sign in with Google
                </Button>

                <View style={[styles.row, {justifyContent: "center", marginTop:35, marginBottom:20}]}>
                <Text variant="bodySmall">
                    Don't have an account? 
                </Text>

                <TouchableOpacity style={[styles.boxingAround, {marginLeft:5}]}
                onPress={()=>{
                    
                }}>
                    <Text variant="bodySmall"
                        style={{fontWeight:"bold"}}
                        onPress={handleSignUp}>
                        Sign up
                    </Text>
                </TouchableOpacity>
                </View>

                <FlashMessage position='center'/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        display: "flex",
        justifyContent: "center"
    },

    innerContainer:{
        display: "flex",
        justifyContent: "center",
        alignContent: "flex-end",
        backgroundColor: "#D9D9D9",
        height: "90%",
        margin: 25, 
        padding: 20,
        borderRadius:25
    },
    inputFields:{
        marginTop:25,
        height: 42,
        backgroundColor:'#F4F1F1',
        fontSize:17
    },

    row:{
        padding:0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    line:{
        borderBottomColor: "black",
        borderBottomWidth: 2,
        width: "45%"
    },
    boxingAround:{
        padding:2,
        borderWidth:1, 
        alignItems:"center",
        borderRadius:5
    }
})

export default Login;