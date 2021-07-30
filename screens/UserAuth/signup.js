import React, { useState } from 'react';
// import { ApolloClient, InMemoryCache ,  gql, useMutation } from '@apollo/client';


//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from './loader'

import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';





const SIGN_UP = gql`
  mutation signupUser($email: String!, $password:String!, $college:String!) {
    signupUser(
      email: $email,
      password:$password,
      college:$college
    )
    {
      
        email
        college
      
    }
  }
`;
const RegisterScreen = props => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [college, setCollege] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  //changing input focus's while user is typing in signup/login info
  let [passwordInput,setPasswordInput] = useState(null)
  let [collegeInput,setCollegeInput] = useState(null)


  const handleSubmitButton = async (signupUser) => {
    setErrortext('');
    if (!email) {
      alert('Please fill Name');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    if (password.length < 8){
      alert('Password must be > 8')
      return;
    }
    if (!college) {
      alert('Please enter College name');
      return;
    }
    try{
      signupUser({ variables: { email:email,password:password,college:college } })
    }catch(err){
      console.log(err)
    }
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/Images/collegePic.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
      <ScrollView keyboardShouldPersistTaps="handled">
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
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={email => setEmail(email)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter Name"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() => { passwordInput.focus(); }}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPassword => setPassword(UserPassword)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter password"
              placeholderTextColor="#F6F6F7"
              secureTextEntry={true}
              autoCompleteType="off"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => { collegeInput.focus(); }}
              ref={(input) => { setPasswordInput(input); }}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={college => setCollege(college)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter College"
              placeholderTextColor="#F6F6F7"
              blurOnSubmit={false}
              ref={(input) => { setCollegeInput(input); }}//this ref function is called upon rendering
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <Mutation mutation={SIGN_UP} variables={{ email,password,college }}>
            {(signup, { data, loading, error }) => 
              <View>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={()=>handleSubmitButton(signup)}>
                    <Text style={styles.buttonTextStyle}>REGISTER</Text>
                  </TouchableOpacity>
              </View>
              }
          </Mutation>
          {/* <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity> */}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});