import { gql } from "@apollo/client";

export default gql`
    query classes($user_id: Int!) {
        classes(user_id: $user_id){
        course_name
        professor_name
        time
        }
    }
`