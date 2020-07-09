import * as React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput,Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from "expo-constants";
import ListOfClasses from "./ClassList"
import DateTimePicker from '@react-native-community/datetimepicker';




export default function AddClass({navigation,route}) {
    const [className, classNameChange] = React.useState('Class name');
    const [profName, profNameChange] = React.useState('Professor name');
    const [date, setDate] = React.useState(Date.now());
    const {setClasses} = route.params
    const onTimeChange = (event, date) => {
        console.log(date.getMinutes())
        setDate(date);
    };
    const addClassToList = () =>{
        let minutes = date.getMinutes();
        minutes = minutes%10 == minutes ? `0${minutes}` : minutes//append 0 to single digit minutes.
        let hour = date.getHours();
        // hour = hour == 0 ? 12 : hour
        // const meridean = hour >= 
        const time = `${hour}:${minutes} pm`
        const newClass = {
            className,
            profName,
            time,
            id:'4953294'
        }
        setClasses(prevClasses => [...prevClasses,newClass])
        navigation.navigate('ClassList')
    }
    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => classNameChange(text)}
                value={className}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => profNameChange(text)}
                value={profName}
            />
            
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='time'
                is24Hour={true}
                display="default"
                onChange={onTimeChange}
            />
            <Button title="Add Class" onPress={()=>addClassToList()}/>
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

