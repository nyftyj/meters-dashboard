import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import AddMeterModal from './AddMeterModal';

import {
    APIKEY,
    URL,
    UPDATE_METER_FORM,
    DELETE_METER_FORM,
  } from "../constants.js";

const TableHeaders = ({ tableHeaders, sortOrder, orderBy, handleHeadersSort }) => {
    return (
        <TableHead>
            <TableRow>
                {tableHeaders.map((header) => (
                    <TableCell key={header} sortDirection={orderBy === header ? sortOrder : false}>
                        <TableSortLabel
                            active={orderBy === header}
                            direction={orderBy === header ? sortOrder : 'asc'}
                            onClick={() => handleHeadersSort(header) }
                        >
                            {header}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const MetersTable = ({ data }) => {
    const [table, setTable] = useState(data || []);
    const [sortOrder, setSortOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    // const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleHeadersSort = (property) => {
        const isAsc = orderBy === property && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };

    // per requirement, fitler out id, updated_time, and created_time to not render in table data
    const tableHeaders = Object.keys(table?.[0] ?? {}).filter(key => key !== 'updated_time' && key !== 'created_time' && key !== 'id');

    const sortedTable = useMemo(() => {
        return table.sort((a, b) => {
            if (typeof a[orderBy] === 'string') {
                // handle sorting strings in alphabetical order
                if (sortOrder === 'asc') {
                    if (a[orderBy] < b[orderBy]) return - 1;
                    if (a[orderBy] > b[orderBy]) return 1;
                    return 0;
                } else if (sortOrder === 'desc') {
                    if (a[orderBy] > b[orderBy]) return - 1;
                    if (a[orderBy] < b[orderBy]) return 1;
                    return 0;
                }
            } else {
                // handle sorting non-string types
                if (sortOrder === 'asc') {
                    return b[orderBy] - a[orderBy];
                } else {
                    return a[orderBy] - b[orderBy];
                }
            }
        });
    }, [sortOrder, orderBy, table]);

    const handleRowClick = (id, row) => {
        navigate(`/meters/${id}`, {
            state: {
                meterDetails: row
            }
        })
    }

    // useEffect(() => {
    //     const fetchData = () => {
    //       fetch(URL, {
    //         method: "GET",
    //         headers: {
    //           "API-KEY": APIKEY,
    //           "Accept": 'application/json',
    //           "Content-Type": "application/json",
    //         },
    //       })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log('wtf is this', data)
    //             setTable(data)
    //         });
    //     };
    //     fetchData();
    //   }, []);


    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10, mb: 5 }}>
          <Typography variant="h3">Meter Dashboard</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            py: 2,
          }}
        >
          <Button variant="contained" onClick={() => setShowModal(true)}>
            Add Meter
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, borderRadius: 2 }} aria-label="table of meters">
            <TableHeaders
              tableHeaders={tableHeaders}
              sortOrder={sortOrder}
              orderBy={orderBy}
              handleHeadersSort={handleHeadersSort}
            />
            <TableBody>
              {sortedTable.map((row) => {
                const {
                  id,
                  api_name,
                  display_name,
                  active,
                  used_for_billing,
                  type,
                  updated_time,
                  created_time,
                } = row;
                return (
                  <TableRow
                    hover
                    key={id + created_time + updated_time}
                    sx={{ cursor: "pointer" }}
                    // to={`/meters/${id}`}
                    onClick={() => handleRowClick(id, row)}
                  >
                    <TableCell>{display_name}</TableCell>
                    <TableCell>{api_name}</TableCell>
                    <TableCell>{active ? "active" : "inactive"}</TableCell>
                    <TableCell>{used_for_billing ? "true" : "false"}</TableCell>
                    <TableCell>{type}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <AddMeterModal
          showModal={showModal}
          setShowModal={setShowModal}
          setTable={setTable}
        />
      </Box>
    );
}

export default MetersTable;