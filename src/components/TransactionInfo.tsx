import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export function TransactionInfo() : React.ReactElement {
    const columns: GridColDef[] = [
        {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: false,
        },
        {
        field: 'description',
        headerName: 'Description',
        width: 150,
        editable: false,
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 150,
            editable: false,
        },
        {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 150,
        editable: false,
        },
    ];
    
    const rows = [
        { id: 1, date: '2021-10-01', type: 'Withdrawl', description: 'Groceries', amount: 100 },
        { id: 2, date: '2021-10-02',  type: 'Withdrawl', description: 'Gas', amount: 50 },
        { id: 3, date: '2021-10-03',  type: 'Withdrawl', description: 'Dinner', amount: 75 },
        { id: 4, date: '2021-10-04',  type: 'Withdrawl', description: 'Movies', amount: 40 },
        { id: 5, date: '2021-10-05',  type: 'Withdrawl', description: 'Books', amount: 25 },
        { id: 6, date: '2021-10-06',  type: 'Withdrawl', description: 'Coffee', amount: 5 },
        { id: 7, date: '2021-10-07',  type: 'Withdrawl', description: 'Lunch', amount: 15 },
        { id: 8, date: '2021-10-08',  type: 'Withdrawl', description: 'Clothes', amount: 200 },
        { id: 9, date: '2021-10-09',  type: 'Withdrawl', description: 'Electronics', amount: 300 },
        { id: 10, date: '2021-10-10',  type: 'Withdrawl', description: 'Shoes', amount: 150 },
    ];
    
    return (
        <>
        <h3>Transaction Information</h3>
        <Box sx={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      
    </Box>
    </>
    );

}