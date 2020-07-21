import * as React  from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import Constants from "expo-constants";
import { Query } from 'react-apollo';

const GET_COLLEGE = gql`
  query GetCollege {
    college 
  }
`;
export default function HomeScreen({navigation}) {
    // const { loading, error, data } = useQuery(GET_COLLEGE);
    // return (
    //     //no need to check if its loading or error, if component is reached, we can get user info.
    //     <View style={styles.container}><Text>{data.loginUser.college}</Text></View>
    // );
    return(
        <Query query={GET_COLLEGE}>
                {({ loading, error, data }) => {
                    if(data){//DATA SHOULD ALWAYS BE HERE
                        return (
                            <View style={styles.container}><Text>{data.college}</Text></View>
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
});