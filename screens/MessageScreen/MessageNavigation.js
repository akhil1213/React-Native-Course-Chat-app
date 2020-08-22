import React from "react";
import ChattersScreen from "./ChattersScreen";
import MessagesScreen from "./MessageScreen";
import SearchClassmates from "./SearchClassmates";
import { createStackNavigator } from "@react-navigation/stack";

const StackNavigator = createStackNavigator();

export default function MessagesNavigation() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Chatters" component={ChattersScreen} />
      <StackNavigator.Screen
        name="Messages with {nameofuser}"
        component={MessagesScreen}
      />
      <StackNavigator.Screen
        name="Search for Students"
        component={SearchClassmates}
      />
    </StackNavigator.Navigator>
  );
}
