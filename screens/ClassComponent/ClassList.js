import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from "react-native";
import Swipeout from 'react-native-swipeout'

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    className:'CS-381',
    profName:'Akhil Khanna',
    time:'01:30'
  },
  {
    id: "bd7acbea-c1b1-462-aed5-3ad53abb28ba",
    className:'CS-381',
    profName:'Akhil Khanna',
    time:'01:30'
  },
  {
    id: "bd7acbea-c1b1-46c2aed5-3ad53abb28ba",
    className:'CS-381',
    profName:'Akhil Khanna',
    time:'01:30'
  },
  
];

{/* <FlatList
               data={this.state.images}
               renderItem={({ item }) => {
                  console.log({item})
               return( */}
const swipeoutBtns = [
    {
        onPress: () =>{
           console.log('delete')
        },
        text:'delete',
        type:'delete'
     },
     {
        onPress: () =>{
           console.log('edit class')
        },
        text:'edit',
        type:'secondary'
     },
];
const Item = ({ item }) => (
    <Swipeout style = {styles.swipeout} autoClose={true} right={swipeoutBtns}>
    <View style={styles.item}>
        <Text style={styles.title}>{item.className}</Text>
        <Text>{item.profName}</Text>
        <Text>{item.time}</Text>
    </View>
  </Swipeout>
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  return (
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    borderBottomColor:'#c8c9cc',
    borderBottomWidth:2,
    padding: 35,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight:'bold'
  },
  swipeout:{
      backgroundColor:'white'
  }
});

export default App;