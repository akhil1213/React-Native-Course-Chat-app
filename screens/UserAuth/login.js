import React, { useState, useEffect } from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import Loader from './loader';
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/react-hooks";



const LOG_IN = gql`
  mutation loginUser($username: String!, $password:String!) {
    loginUser(
      username: $username,
      password:$password
    )
    {
      college
      token
      username
    }
  }
`;


const LoginScreen = ({route,navigation}) => {
  let [userName, setuserName] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [errortext, setErrortext] = useState('');
  let [passwordinput,setPasswordInput] = useState(null)
  const client = useApolloClient();
  const [login, { loading, error,data }] = useMutation(LOG_IN, {
    onCompleted(data) {
      console.log(data)//whenever you mutate, you have to write the data to the cache.
      client.writeData({ data: {userInfo:{ username:data.loginUser.username, college:data.loginUser.college,loggedIn:true,token:data.loginUser.token,__typename: 'User'}} });
    }
  });
  
  const handleSubmitPress = (login) => {
    setErrortext('');
    if (!userName) {
      setErrortext('Please fill email');
      return;
    }
    if (!userPassword) {
      setErrortext('Please fill Password');
      return;
    }
    try{
      login({ variables: { username:userName,password:userPassword } })
    }catch(err){
      console.log('heyyyy')
      console.log(err)
    }
  };
  useEffect(() => {
  });
  return (
    <View style={styles.mainBody}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../assets/Images/collegePic.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={userName => setuserName(userName)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Username" //dummy@abc.com
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password" //12345
                placeholderTextColor="#F6F6F7"
                keyboardType="default"
                ref={ref => {
                  setPasswordInput(ref)
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {error && error.graphQLErrors.map(({ message }, i) => (
              <Text style={styles.errorTextStyle} key={i}>{message}</Text>
            ))}
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext } </Text>
            ) : null}
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={()=>handleSubmitPress(login)}>
                  <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('signup')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});