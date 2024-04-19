import React, {useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';

interface BalanceInfoProps {
    currentBalanceInCents: number;
    availableBalanceInCents: number;
}

export function BalanceInfo({currentBalanceInCents, availableBalanceInCents}: BalanceInfoProps) : React.ReactElement {
    const [currentBalance, setCurrentBalance] = useState<number>();
    const [availableBalance, setAvailableBalance] = useState<number>();
    useEffect(() => {
        if (currentBalanceInCents) {
            setCurrentBalance(currentBalanceInCents / 100);
        }
    }, [currentBalanceInCents]);
    useEffect(() => {
        if (availableBalanceInCents) {
            setAvailableBalance(availableBalanceInCents / 100);
        }
    }, [availableBalanceInCents]);
  return (
    <Stack style={{marginTop: '20px'}} direction="row" spacing={5}>
      <label>Current Balance: ${currentBalance}</label>
      <label>Available Balance: ${availableBalance}</label>
    </Stack>
  )
}