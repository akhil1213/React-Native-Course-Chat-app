import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import Constants from "expo-constants";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
const GET_SIMILAR_CLASSES = gql`
  query studentsWithClasses($username: String!) {
    studentsWithClasses(username: $username) {
      classmate
      coursename
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

export default function SearchClassmates({ navigation, route }) {
  // const [classmateWithClasses, setClassmateWithClasses] = React.useState([]);
  // const client = useApolloClient();
  // const username = client.readQuery({
  //   //when ur reading from the local state.
  //   query: GET_USER_INFO,
  // }).userInfo.username;
  // const { loading, error, data } = useQuery(GET_SIMILAR_CLASSES, {
  //   variables: { username: username },
  // });
  // if (loading) console.log(loading);
  // else if (error) console.log(error);
  // let classmatesAndClasses = {};
  // classmatesAndClasses["johndoe"] = ["CS-50", "CS-381"];
  // for (let i = 0; i < data.studentsWithClasses.length; i++) {
  //   const classmate = data.studentsWithClasses[i].classmate;
  //   const commonClass = data.studentsWithClasses[i].coursename;
  //   if (classmatesAndClasses[classmate] == null) {
  //     classmatesAndClasses[classmate] = [commonClass];
  //   } else {
  //     classmatesAndClasses[classmate].push(commonClass);
  //   }
  // }
const classmatesAndClasses = {
  "johndoe":["CS-50","CS-381"],
  "hernan": ["CS-323", "CS-343"]
}
  return (
    <View style={styles.container}>
      {Object.keys(classmatesAndClasses).map((classmate) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Messages", {
                classmateName: classmate,
              })
            }
          >
            <View key={classmate} style={styles.row}>
              <Text style={styles.classmate}>{classmate}</Text>
              <View style={styles.commonClasses}>
                {classmatesAndClasses[classmate].map((commonClass) => {
                  return (
                    <Text key={commonClass} style={styles.commonClass}>
                      {commonClass}
                    </Text>
                  );
                })}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    marginLeft: 8,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 4,
    borderBottomColor: "#e0dede",
  },
  commonClasses: {
    flexDirection: "row",
  },
  commonClass: {
    marginLeft: 6,
  },
  classmate: {
    fontWeight: "bold",
    fontSize: 15,
  },
  topRight: {
    alignItems: "flex-end",
  },
});
