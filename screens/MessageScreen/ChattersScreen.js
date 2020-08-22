import React from "react";
import {
  TextInput,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
function ChattersScreen({ navigation }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search for Students")}
      >
        <MaterialIcons name="person-add" size={48} />
      </TouchableOpacity>

      {[
        { user: "akhil121398", lastMessage: "hey how u been", seen: false },
        {
          user: "johndoe",
          lastMessage: "dude ur always coding react",
          seen: false,
        },
      ].map((chatter) => {
        return (
          <View style={styles.chatter}>
            <Text>{chatter.user}</Text>
            <Text>{chatter.lastMessage}</Text>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  chatter: {
    flex: 1,
    flexDirection: "row",
  },
});
export default ChattersScreen;
