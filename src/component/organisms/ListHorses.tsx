import React from "react";
import { useQuery } from "@apollo/client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import { GET_HORSE } from "../../api/queries/horse";

export type Horse = {
  id: string;
  name?: string;
  profile?: Profile;
};

type Profile = {
  favouriteFood?: string;
  physical?: Physical;
};

type Physical = {
  height?: number;
  weight?: number;
};

type ListHorsesProps = {
  list: Horse;
};

const ListHorses = () => {
  const { data } = useQuery(GET_HORSE);

  console.log("data: ", data);

  return (
    <List component="nav" aria-label="mailbox folders">
      {data &&
        data.horse.map((horse: Horse) => (
          <ListItem key={horse.id} button divider>
            <ListItemText primary={horse.name} />
          </ListItem>
        ))}
    </List>
  );
};

export default ListHorses;
