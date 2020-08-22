import React, { Component } from "react";
import {
  TextInput,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from "react-native";

// import uuid from 'react-native-uuid'

class MessageInput extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    messageText: "",
    keyboardHeight: 0,
  };
  render() {
    return (
      <View style={styles.textContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Send message"
          onChangeText={(text) => {
            this.setState({ messageText: text });
          }}
        />
        <View style={styles.postButton}>
          <TouchableOpacity>
            <Text style={{ color: "rgb(122, 136, 204)" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    color: "black",
  },
  textContainer: {
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  postButton: {
    color: "rgb(122,136,204)",
    flexDirection: "column",
    justifyContent: "center",
  },
});
export default MessageInput;
