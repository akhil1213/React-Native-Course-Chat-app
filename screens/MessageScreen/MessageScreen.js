import React, { useRef } from "react";
import {
  TextInput,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Constants from "expo-constants";
import MessageInput from "./MessageInput";

function ChattingScreen() {
  const username = "akhil";
  const messages = [
    {
      from: "akhil",
      to: "lebron",
      text:
        "hey man hey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey man",
    },
    { from: "lebron", to: "akhil", text: "im great" },
    {
      from: "akhil",
      to: "lebron",
      text:
        "hey man hey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey man",
    },
    { from: "lebron", to: "akhil", text: "im great" },
    {
      from: "akhil",
      to: "lebron",
      text:
        "hey man hey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey man",
    },
    { from: "lebron", to: "akhil", text: "im great" },
    {
      from: "akhil",
      to: "lebron",
      text:
        "hey man hey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey man",
    },
    { from: "lebron", to: "akhil", text: "im great" },
    {
      from: "akhil",
      to: "lebron",
      text:
        "hey man hey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey man",
    },
    { from: "lebron", to: "akhil", text: "im great" },
    {
      from: "akhil",
      to: "lebron",
      text:
        "hey man hey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey manhey man",
    },
    { from: "lebron", to: "akhil", text: "im great" },
  ];
  const scrollViewRef = useRef();
  return (
    // <View style={styles.container}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        style={[styles.messagesContainer]}
      >
        {messages.map((message) => {
          if (message.from == username) {
            return (
              <View style={styles.messageLeft}>
                <Image
                  source={{
                    uri:
                      "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
                  }}
                  style={styles.sendersIcon}
                />
                <View style={[styles.messageLeft, styles.message]}>
                  <Text style={{ color: "#ebeef2" }}>{message.text}</Text>
                </View>
              </View>
            );
          } else if (message.to == username) {
            return (
              <View style={[styles.messageRight, styles.message]}>
                <Text style={{ color: "#ebeef2" }}>{message.text}</Text>
              </View>
            );
          }
        })}
      </ScrollView>
      <View style={styles.input}>
        <MessageInput />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 50,
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    flexDirection: "column",
    height: 15,
  },
  messageLeft: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  messageRight: {
    alignSelf: "flex-end",
  },
  message: {
    backgroundColor: "#6A6666",
    padding: 10,
    borderRadius: 13,
    color: "#ebeef2",
    maxWidth: "60%",
  },
  sendersIcon: {
    width: 24,
    height: 24,
    borderRadius: 2,
    marginRight: 6,
  },
  input: {},
});
export default ChattingScreen;
