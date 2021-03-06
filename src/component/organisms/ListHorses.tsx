import React from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import TablePagination from "@mui/material/TablePagination";

import { GET_HORSE } from "../../api/queries/horse";
import EditHorse from "./EditHorse";

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
  horse: Horse;
};

const Row: React.FC<ListHorsesProps> = ({ horse }) => {
  const [open, setOpen] = React.useState(false);

  const handleCollapse = () => setOpen(!open);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleCollapse}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {horse.name}
        </TableCell>
        <TableCell>
          <EditHorse horse={horse} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>favouriteFood</TableCell>
                    <TableCell align="right">height</TableCell>
                    <TableCell align="right">weight</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{horse.profile?.favouriteFood}</TableCell>
                    <TableCell align="right">
                      {horse.profile?.physical?.height}
                    </TableCell>
                    <TableCell align="right">
                      {horse.profile?.physical?.weight}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ListHorses = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, loading, error } = useQuery(GET_HORSE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.horse &&
              data.horse
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((horse: Horse) => <Row key={horse.id} horse={horse} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={data?.horse ? data?.horse?.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ListHorses;
