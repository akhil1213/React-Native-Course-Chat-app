import * as React  from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import Constants from "expo-constants";
import { Query } from 'react-apollo';

const GET_COLLEGE = gql`
  query GetCollege {
      userInfo{
          college
      }
  }
`;
export default function HomeScreen({navigation}) {
    return(
        <Query query={GET_COLLEGE}>
                {({ loading, error, data }) => {
                    if(data){
                        return (
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.name}>College:</Text>
                                <Text style={styles.name}>{data.userInfo.college}</Text>
                                <Text style={styles.description}>
                                    More Additions later!
                                </Text>
                            </View>
                        );
                    }else{
                        return <View><Text>Akhil</Text></View>
                    }
                }}
        </Query>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
    descriptionContainer:{
        marginTop:40,
        textAlign:'center'
    },
    description:{
        color:'#2a5d96',
        fontWeight:'900',
        fontSize:20,
        marginTop:15
    },
    name:{
        color:'#2a5d96',
        fontWeight:'900',
        fontSize:30
    },
});