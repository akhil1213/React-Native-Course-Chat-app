import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from "react-native";
import Swipeout from 'react-native-swipeout'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
        <Text style={styles.title}>{item.coursename}</Text>
        <Text>{item.profname}</Text>
        <Text>{item.time}</Text>
    </View>
  </Swipeout>
);


const ListOfClasses = ({navigation,classes}) => {
  console.log(navigation)
  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Students',{coursename:item.coursename})}>
      <Item item={item} />
    </TouchableWithoutFeedback>
  );

  return (
      <FlatList
        data={classes}
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

export default ListOfClasses;