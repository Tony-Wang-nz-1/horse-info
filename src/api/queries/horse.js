import { gql } from "@apollo/client";

export const GET_HORSE = gql`
  query getHorse {
    horse @rest(type: "Horse", path: "horse") {
      id
      name
      profile @type(name: "Profile") {
        favouriteFood
        physical @type(name: "Physical") {
          height
          weight
        }
      }
    }
  }
`;
