import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import ListOfClasses from "./ClassList";
import AddClass from "./AddClass";
import Students from "./students";
import { createStackNavigator } from "@react-navigation/stack";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
const GET_CLASSES = gql`
  query classes($username: String!) {
    classes(username: $username) {
      coursename
      profname
      time
    }
  }
`;
const GET_USER_INFO = gql`
  query UserInfo {
    userInfo {
      username
    }
  }
`;
const StackNavigator = createStackNavigator();
// https://stackoverflow.com/questions/32030050/how-can-you-float-right-in-react-native

function ClassScreen({ navigation }) {
  const client = useApolloClient();
  const username = client.readQuery({
    query: GET_USER_INFO,
  }).userInfo.username;
  console.log(username);
  const { loading, error, data } = useQuery(GET_CLASSES, {
    variables: { username },
  });
  return (
    <View style={styles.container}>
      <View style={styles.topRight}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddClassModal", { setClasses });
          }}
        >
          <MaterialCommunityIcons name="book-plus-multiple" size={48} />
        </TouchableOpacity>
      </View>
      <ListOfClasses
        navigation={navigation}
        classes={data.classes}
        username={username}
      />
    </View>
  );
}
export default function ClassesScreen({ navigation }) {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="ClassList" component={ClassScreen} />
      <StackNavigator.Screen name="AddClassModal" component={AddClass} />
      <StackNavigator.Screen name="Students" component={Students} />
    </StackNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  topRight: {
    alignItems: "flex-end",
  },
});
