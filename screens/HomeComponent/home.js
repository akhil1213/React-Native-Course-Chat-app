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
                            <View style={styles.container}><Text>{data.userInfo.college}</Text></View>
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