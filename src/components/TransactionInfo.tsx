import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Transaction, TransactionType } from "../hooks/useBankAccounts";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";

interface TransactionInfoProps {
  transactions: Array<Transaction>;
}

interface TransactionRow {
  id: string;
  type: string;
  date: string;
  description: string;
  amount_in_dollars: string;
}

export function TransactionInfo({
  transactions,
}: TransactionInfoProps): React.ReactElement {
  const [rows, setRows] = useState<Array<TransactionRow>>([]);

  const theme = createTheme({
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
  });

  useEffect(() => {
    if (transactions) {
      const newRows = transactions.map((transaction) => {
        let type = "";
        switch (transaction.type) {
          case TransactionType.HOLD:
            type = "Hold";
            break;
          case TransactionType.HOLD_RELEASE:
            type = "Hold Release";
            break;
          case TransactionType.WITHDRAWAL:
            type = "Withdrawal";
            break;
          case TransactionType.DEPOSIT:
            type = "Deposit";
            break;
        }
        return {
          id: transaction.id,
          type: type,
          date: transaction.date.toDateString(),
          description: transaction.description,
          amount_in_dollars: (transaction.amount_in_cents / 100).toFixed(2),
        };
      });
      setRows(newRows);
    }
  }, [transactions]);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 175,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      width: 175,
      editable: false,
    },
    {
      field: "type",
      headerName: "Type",
      type: "string",
      width: 175,
      editable: false,
    },
    {
      field: "amount_in_dollars",
      headerName: "Amount",
      type: "number",
      width: 175,
      editable: false,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <h3>Transaction Information</h3>
      <Box sx={{ height: 400, width: 700 }}>
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
    </ThemeProvider>
  );
}
