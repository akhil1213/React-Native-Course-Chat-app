import React from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";

function ChattersScreen({ navigation }) {
  return (
    <View>
      {[
        { user: "akhil121398", lastMessage: "hey how u been", seen: false },
        {
          user: "johndoe",
          lastMessage:
            "dude ur always coding react kfs dfks dkf skjdf ksjdf ksd fjksd fksd fksd fk",
          seen: false,
        },
      ].map((chatter) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Messages", {
                classmateName: chatter.user,
              })
            }
          >
            <View style={styles.chatter}>
              <Image
                source={{
                  uri:
                    "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
                }}
                style={styles.sendersIcon}
              />
              <View>
                <Text style={styles.userText}>{chatter.user}</Text>
                <Text style={styles.lastMessage}>
                  {chatter.lastMessage.length > 30
                    ? chatter.lastMessage.substring(0, 27) + "..."
                    : chatter.lastMessage}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  chatter: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  sendersIcon: {
    width: 36,
    height: 36,
    borderRadius: 3,
    marginRight: 6,
  },
  userText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  lastMessage: {
    maxWidth: 200,
  },
});
export default ChattersScreen;
