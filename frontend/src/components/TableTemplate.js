import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    Paper,
    Tooltip,
    IconButton
} from '@mui/material';
import {
    StyledTableCell,
    StyledTableRow
} from './styles';

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: '16px' }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <StyledTableRow hover key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                        </StyledTableCell>
                                    );
                                })}
                                <StyledTableCell align="center">
                                    <Tooltip title="View/Edit Actions">
                                        <IconButton>
                                            <ButtonHaver row={row} />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ marginTop: '10px' }}
            />
        </Paper>
    );
};

export default TableTemplate;
