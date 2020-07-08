import * as React from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from "expo-constants";
import App from "./ClassList"
// https://stackoverflow.com/questions/32030050/how-can-you-float-right-in-react-native

export default function ClassesScreen() {
    return (
      <View style={styles.container}>
          <View style = {styles.topRight}>
              <TouchableOpacity>
                  <MaterialCommunityIcons name="book-plus-multiple" size={48} />
              </TouchableOpacity>
          </View>
          
              <App/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
    topRight:{
        alignItems: 'flex-end'
    }
});
  