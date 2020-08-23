import React from "react";
import { View, TouchableOpacity } from "react-native";
import ChattersScreen from "./ChattersScreen";
import MessagesScreen from "./MessageScreen";
import SearchClassmates from "./SearchClassmates";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const StackNavigator = createStackNavigator();

function ChattersScreenHeader({ navigation }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search for Students")}
      >
        <MaterialIcons name="person-add" size={48} />
      </TouchableOpacity>
    </View>
  );
}

export default function MessagesNavigation() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Chatters"
        options={({ route, navigation }) => ({
          headerRight: (props) => (
            <ChattersScreenHeader navigation={navigation} {...props} />
          ),
        })}
        component={ChattersScreen}
      />
      <StackNavigator.Screen
        name="Messages"
        options={({ route }) => ({ title: route.params.classmateName })}
        component={MessagesScreen}
      />
      <StackNavigator.Screen
        name="Search for Students"
        component={SearchClassmates}
      />
    </StackNavigator.Navigator>
  );
}
