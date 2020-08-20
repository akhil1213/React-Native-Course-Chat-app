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
  // componentWillMount() {
  //   this.keyboardDidShowSub = Keyboard.addListener(
  //     "keyboardDidShow",
  //     this.handleKeyboardDidShow
  //   );
  //   this.keyboardDidHideSub = Keyboard.addListener(
  //     "keyboardDidHide",
  //     this.handleKeyboardDidHide
  //   );
  // }

  // componentWillUnmount() {
  //   this.keyboardDidShowSub.remove();
  //   this.keyboardDidHideSub.remove();
  // }
  state = {
    messageText: "",
    keyboardHeight: 0,
  };
  //when your translating y and if your going from bottom up it should be a negative value.
  // handleKeyboardDidShow = (event) => {
  //   Animated.timing(this.state.keyboardHeight, {
  //     duration: 0,
  //     toValue: -1 * (event.endCoordinates.height - 30),
  //     useNativeDriver: true,
  //   }).start();
  // };
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
    borderRadius: 5,
    borderWidth: 1,
    padding: 15,
    flexDirection: "row",
    // position:'absolute',
    width: "100%",
    height: 20,
    // alignSelf:'flex-end'
    // bottom:0
  },
  postButton: {
    // position:'absolute',
    // right:0,
    color: "rgb(122,136,204)",
    flexDirection: "column",
    justifyContent: "center",
  },
});
export default MessageInput;
