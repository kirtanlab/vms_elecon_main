import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Tooltip,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { Searchbar } from 'src/layouts/_common';
import Scrollbar from 'src/components/scrollbar';
// import { Tab } from '@mui/base';
import TableHeadCustom from 'src/components/table/table-head-custom';
import {
  TableEmptyRows,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  getComparator,
  useTable,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
   
import CustomDialog from 'src/components/Dialog/dialog';
import AddSecurity from './addSecurity';
import SecurityDetailsTableRow from './securityDetailsTableRow';

export default function SecurityDetailsTable({ title, tableLabels, Categories_Data, subheader }) {
  const defaultFilters = {
    first_name: '',
  };
  const [filters, setFilters] = useState(defaultFilters);
  const table = useTable({ defaultOrderBy: 'createDate' });
  const confirm = useBoolean();
  const [tableData, setTableData] = useState(Categories_Data);
  const [addSecurity, setAddSecurity] = useState(false);
  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters,
      })
    : {};
  const denseHeight = table.dense ? 56 : 76;
  const canReset =
    !!filters.name ||
    !!filters.service?.length ||
    filters.status !== 'all' ||
    (!!filters.startDate && !!filters.endDate);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;
  const onFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );
  const handleFilterName = useCallback(
    (event) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );
  return (
    <Card>
      <Grid container alignItems="center" flexDirection="row">
        <CardHeader title={title} subheader={subheader} sx={{ flex: 1 }} />
        <Stack sx={{ paddingTop: 3, flexDirection: 'row', flex: 1, marginRight: 3 }}>
          <Stack sx={{ width: '150%' }}>
            <TextField
              value={filters.name}
              onChange={handleFilterName}
              placeholder="Search first, last name / comapny / phone ..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{}} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '100%' }}
            />
          </Stack>

          <Button
            sx={{ pt: 2, width: 200 }}
            size="medium"
            color="inherit"
            onClick={() => {
              setAddSecurity(true);
            }}
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          >
            Add Security
          </Button>
        </Stack>
      </Grid>
      <Grid sx={{ mt: 3 }}>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData.map((row) => row.id)
              )
            }
            action={
              <Stack sx={{ mr: 1 }}>
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              </Stack>
            }
          />
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                headLabel={tableLabels}
                order={table.order}
                orderBy={table.orderBy}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <SecurityDetailsTableRow
                      key={row.id}
                      row={row}
                      table={table}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      confirm={confirm}
                    />
                  ))}
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ borderStyle: 'dotted' }} />
        <CustomDialog
          openFlag={addSecurity}
          setonClose={() => setAddSecurity(false)}
          placeHolder="Add New Security"
          component={<AddSecurity />}
        />
        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          dense={table.dense}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          onChangeDense={table.onChangeDense}
        />
      </Grid>
    </Card>
  );
}

SecurityDetailsTable.propTypes = {
  title: PropTypes.string,
  tableLabels: PropTypes.array,
  subheader: PropTypes.string,
  Categories_Data: PropTypes.array,
};
function applyFilter({ inputData, comparator, filters }) {
  const { name } = filters;
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // console.log('inputData' , inputData)
  if (name) {
    inputData = inputData.filter(
      (Security) =>
      Security.First_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      Security.phone_no.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      Security.shift.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  } 

  return inputData; 
}
