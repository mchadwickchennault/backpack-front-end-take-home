import React from 'react';
import { SensitiveInfo } from './SensitiveInfo';
import Container from '@mui/material/Container';
import styles from './AccountInfo.module.scss';
import { BalanceInfo } from './BalanceInfo';
import Stack from '@mui/material/Stack';
import { TransactionInfo } from './TransactionInfo';


export function AccountInfo() : React.ReactElement {
  return (
    <Container className={styles.accountInfo}>
      <h2>Account Information</h2>
      <h3>Bank Account 1</h3>
      <Stack direction="row" spacing={5}>
            <label>Routing #:</label>
            <SensitiveInfo value={8765}/>
            <label>Account #:</label>
            <SensitiveInfo value={4321}/>
        </Stack>
        <BalanceInfo currentBalanceInCents={1973408} availableBalanceInCents={2040245}/>
        <TransactionInfo/>
    </Container>
  )
}