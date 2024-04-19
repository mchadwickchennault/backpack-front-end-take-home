import React from "react";
import { SensitiveInfo } from "./SensitiveInfo";
import Container from "@mui/material/Container";
import { BalanceInfo } from "./BalanceInfo";
import Stack from "@mui/material/Stack";
import { TransactionInfo } from "./TransactionInfo";
import { UseBankAccountInterface } from "../hooks/useBankAccounts";
import Alert from "@mui/material/Alert";

import "./AccountInfo.scss";

interface AccountInfoProps {
  useBankAccounts: UseBankAccountInterface;
}

// Injecting the useBankAccounts hook into the AccountInfo component greatly simplifies testing.
export function AccountInfo({
  useBankAccounts,
}: AccountInfoProps): React.ReactElement {
  const { banckAccountsWithActivity, errors } = useBankAccounts();
  return (
    <Container className="accountInfo">
      <h2>Account Information</h2>
      <Stack direction="column" spacing={5}>
        {errors.map((error) => {
          return (
            <Alert severity="error" key={error}>
              {error}
            </Alert>
          );
        })}
      </Stack>
      {banckAccountsWithActivity.map((bankAccountWithActivity) => {
        return (
          <div key={bankAccountWithActivity?.id}>
            <h3>{bankAccountWithActivity?.name || ""}</h3>
            <Stack direction="row" spacing={1}>
              <label>Routing #:</label>
              <SensitiveInfo
                value={bankAccountWithActivity?.routing_number || 0}
              />
              <label>Account #:</label>
              <SensitiveInfo
                value={bankAccountWithActivity?.account_number || 0}
              />
            </Stack>
            <BalanceInfo
              currentBalanceInCents={
                bankAccountWithActivity?.balance?.pending_balance_in_cents || 0
              }
              availableBalanceInCents={
                bankAccountWithActivity?.balance?.available_balance_in_cents ||
                0
              }
            />
            <TransactionInfo
              transactions={bankAccountWithActivity.transactions}
            />
          </div>
        );
      })}
    </Container>
  );
}
