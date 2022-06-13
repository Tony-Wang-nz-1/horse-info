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

export const ADD_HORSE = gql`
  mutation addHorse($addHorseInput: any) {
    addHorse(addHorseInput: $addHorseInput)
    @rest(
      type: "addHorse"
      method: "PUT"
      path: "horse"
      bodyKey: "addHorseInput"
    ) {
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

export const EDIT_HORSE = gql`
  mutation editHorse($editHorseInput: any) {
    editHorse(editHorseInput: $editHorseInput)
    @rest(
      type: "editHorse"
      method: "PUT"
      path: "horse/{args.editHorseInput.id}"
      bodyKey: "editHorseInput"
    ) {
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
