import * as React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput,Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from "expo-constants";
import ListOfClasses from "./ClassList"
import DateTimePicker from '@react-native-community/datetimepicker';




export default function AddClass({navigation,route}) {
    const [className, classNameChange] = React.useState('');
    const [profName, profNameChange] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const {setClasses} = route.params
    const onTimeChange = (event, date) => {
        setDate(date);
    };
    const addClassToList = () =>{
        let minutes = date.getMinutes();
        minutes = minutes%10 == minutes ? `0${minutes}` : minutes//append 0 to single digit minutes.
        let hour = date.getHours();
        console.log(hour)
        const meridean = hour < 12 ? 'am' : 'pm'
        const time = `${hour}:${minutes} ${meridean}`
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
                placeholder="Add Class"
                value={className}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => profNameChange(text)}
                placeholder="Add Professor Name"
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

