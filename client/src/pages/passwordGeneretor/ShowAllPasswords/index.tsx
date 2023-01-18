import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}

const rows = [
    {
        site: 'amazon',
        username: 'ritik patidar',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63a094d0f99a032c88fc22d6',
    },
    {
        site: 'Email',
        username: 'UserName',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c64f41c947f34294188c04',
    },
    {
        site: 'Email',
        username: 'UserName',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c65060c947f34294188c07',
    },
    {
        site: 'erghdtrh',
        username: 'UserName',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c650a8c947f34294188c0b',
    },
    {
        site: 'erghdtrh',
        username: 'UserName',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c6528cc947f34294188c0e',
    },
    {
        site: 'ergsergsr',
        username: 'zsegsrg',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c6529fc947f34294188c12',
    },
    {
        site: 'aergfserg',
        username: 'sergsegs',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c67b6ec947f34294188c40',
    },
    {
        site: 'aergfserg',
        username: 'sergsegs',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c67b71c947f34294188c43',
    },
    {
        site: 'aergfserg',
        username: 'sergsegs',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c67b73c947f34294188c46',
    },
    {
        site: 'aergfserg',
        username: 'sergsegs',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c67b76c947f34294188c49',
    },
    {
        site: 'aergfserg',
        username: 'sergsegs',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c67b79c947f34294188c4c',
    },
    {
        site: 'aergfserg',
        username: 'sergsegs',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c67b7cc947f34294188c4f',
    },
    {
        site: 'aergfserg',
        username: 'sergsegs',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c67b80c947f34294188c52',
    },
    {
        site: 'aergfserg',
        username: 'sergsegs',
        userId: '639df5fdd7bff93660c2a5ae',
        id: '63c67b83c947f34294188c55',
    },
];

const headCells: readonly HeadCell[] = [
    {
        id: 'sno',
        numeric: false,
        disablePadding: true,
        label: 'S. No.',
    },
    {
        id: 'site',
        numeric: true,
        disablePadding: false,
        label: 'Site',
    },
    {
        id: 'username',
        numeric: true,
        disablePadding: false,
        label: 'Username',
    },
    {
        id: 'password',
        numeric: true,
        disablePadding: false,
        label: 'Password',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

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
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        <TableSortLabel>{headCell.label}</TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const ShowAllPasswords = () => {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
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

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '70%', margin: '0 auto' }}>
            <Paper sx={{px: 3, mb: 0, borderRadius: '24px' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
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
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
        </Box>
    );
}

export default ShowAllPasswords ;
