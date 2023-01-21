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
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSavedPassword } from '../../../modules/reducers/passwordReducer';
import { allSavedPasswords, isSavedPasswordLoading, totalSavedPasswords } from '../../../modules/selectors/passwords';
import ShowPasswordModal from './showPasswordModal';
interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
}
interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
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
function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
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
    const totalPasswords = useSelector(totalSavedPasswords);

    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [showPass, setShowPass] = useState({
        isOpen: false,
        data: {},
    });

    const handleCloseShowPassModal = () => {
        setShowPass({
            isOpen: false,
            data: {},
        });
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = allPasswords.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allPasswords.length) : 0;

    useEffect(() => {
        dispatch(getAllSavedPassword({}));
    }, []);

    return (
        <Box sx={{ width: '70%', margin: '0 auto' }}>
            <Paper sx={{ px: 3, mb: 0, borderRadius: '24px' }}>
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
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    rowCount={allPasswords.length}
                                />
                                <TableBody>
                                    {allPasswords
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            onClick={(event) => handleClick(event, row.id)}
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell component="th" id={labelId} scope="row" padding="none">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>{row.site}</TableCell>
                                                    <TableCell>{row.username}</TableCell>
                                                    <TableCell>********</TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            onClick={() => setShowPass({ isOpen: true, data: row })}
                                                        >
                                                            <Visibility />
                                                        </IconButton>
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
