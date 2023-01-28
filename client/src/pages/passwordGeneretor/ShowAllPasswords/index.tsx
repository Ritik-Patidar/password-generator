import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Visibility } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSavedPassword } from '../../../modules/reducers/passwordReducer';
import { allSavedPasswords, isSavedPasswordLoading } from '../../../modules/selectors/passwords';
import ShowPasswordModal from './showPasswordModal';
interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
}
const headCells: readonly HeadCell[] = [
    {
        id: 'sno',
        disablePadding: true,
        label: 'S. No.',
    },
    {
        id: 'site',
        disablePadding: false,
        label: 'Site',
    },
    {
        id: 'username',
        disablePadding: false,
        label: 'Username',
    },
    {
        id: 'password',
        disablePadding: false,
        label: 'Password',
    },
    {
        id: 'visibility',
        disablePadding: false,
        label: '',
    },
];
function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} padding={headCell.disablePadding ? 'none' : 'normal'}>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
const ShowAllPasswords = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(isSavedPasswordLoading);
    const allPasswords = useSelector(allSavedPasswords);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [showPass, setShowPass] = useState({
        isOpen: false,
        data: {},
        isEdit: false,
    });

    const [anchorEl, setAnchorEl] = React.useState<any>({
        data: {},
        El: null,
    });

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, rowData: any) => {
        setAnchorEl({
            data: rowData,
            El: event.currentTarget,
        });
    };
    const handleClose = () => {
        setAnchorEl({
            data: {},
            El: null,
        });
    };

    const handleCloseShowPassModal = () => {
        setShowPass({
            isOpen: false,
            data: {},
            isEdit: false,
        });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allPasswords.length) : 0;

    useEffect(() => {
        dispatch(getAllSavedPassword({}));
    }, []);

    return (
        <Box sx={{ width: '70%', margin: '0 auto' }}>
            <Paper sx={{ px: 4, mb: 0, borderRadius: '24px' }}>
                {isLoading ? (
                    <p className="text-center text-xl p-10">Loading...</p>
                ) : allPasswords.length ? (
                    <>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead />
                                <TableBody>
                                    {allPasswords
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={row.id}
                                                >
                                                    <TableCell component="th" id={labelId} scope="row" padding="none">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>{row.site}</TableCell>
                                                    <TableCell>{row.username}</TableCell>
                                                    <TableCell>********</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() =>
                                                                setShowPass({ isOpen: true, data: row, isEdit: false })
                                                            }
                                                        >
                                                            <Visibility />
                                                        </IconButton>
                                                        <IconButton onClick={(e) => handleMenuClick(e, row)}>
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        <Menu
                                                            id="basic-menu"
                                                            anchorEl={anchorEl.El}
                                                            open={Boolean(anchorEl.El)}
                                                            onClose={handleClose}
                                                            sx={{
                                                                '& .MuiPaper-root': {
                                                                    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
                                                                    border: '1px solid gray',
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem
                                                                onClick={() => {
                                                                    setShowPass({
                                                                        isOpen: true,
                                                                        data: anchorEl.data,
                                                                        isEdit: true,
                                                                    });
                                                                    handleClose();
                                                                }}
                                                            >
                                                                Edit
                                                            </MenuItem>
                                                            <MenuItem onClick={handleClose}>Delete</MenuItem>
                                                        </Menu>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={allPasswords.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                ) : (
                    <p className="text-center text-xl p-10">No Data Found</p>
                )}
            </Paper>
            {showPass.isOpen ? <ShowPasswordModal modalData={showPass} handleClose={handleCloseShowPassModal} /> : null}
            {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
        </Box>
    );
};

export default ShowAllPasswords;
