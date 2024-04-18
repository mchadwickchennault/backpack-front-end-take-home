import {useState, useEffect} from 'react';


export enum TransactionType {
    'HOLD',
    'HOLD_RELEASE',
    'WITHDRAWAL',
    'DEPOSIT',
}

export enum BankAccountStatus {
    'ACTIVE',
    'INACTIVE',
}

export interface Balance {
    bank_account_id: string,
    available_balance_in_cents: string,
    pending_balance_in_cents: number,
}

export interface Balances {
    [bank_account_id: string]: Balance,
}

export interface Transaction {
    id: string,
    created_at: Date,
    updated_at: Date,
    type: TransactionType,
    date: Date,
    description: string,
    amount_in_cents: number,
}

export interface BankAccount {
    id: string,
    created_at: Date,
    updated_at: Date,
    status: BankAccountStatus,
    name: string,
    account_number: number,
    routing_number: number,
    
}

export interface BankAccountWithActivity extends BankAccount {
    balance: Balance,
    transactions: Array<Transaction>,
}


export function useBankAccounts() : Array<BankAccountWithActivity> {
    const [bankAccounts, setBankAccounts] = useState<Array<BankAccount>>();
    const [bankAccountBalances, setBankAccountBalances] = useState<Balances>({});
    const [transactions, setTransactions] = useState<Array<Transaction>>();
    const [banckAccountsWithActivity, setBankAccountsWithActivity] = useState<Array<BankAccountWithActivity>>([]);

    useEffect( () => {
        const fetchBankAccounts = async () => {
            const response = await fetch('https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/');
            const body = await response.json();
            const bankAccounts = body.data.bank_accounts.map( (bankAccount: BankAccount) => {
                return {
                    ...bankAccount,
                    created_at: new Date(bankAccount.created_at),
                    updated_at: new Date(bankAccount.updated_at),
                    status: BankAccountStatus[bankAccount.status],
                };
            });
            setBankAccounts(bankAccounts);
        };
        fetchBankAccounts();
        const fetchTransactions = async () => {
            const response = await fetch('https://api.dev.backpackpay.com/api/v1/mocks/transactions/')
            const body = await response.json();
            const transactions = body.data.transactions.map( (transaction: Transaction) => {
                return {
                    ...transaction,
                    date: new Date(transaction.date),
                    created_at: new Date(transaction.created_at),
                    updated_at: new Date(transaction.updated_at),
                    type: TransactionType[transaction.type],
                };
            });
            setTransactions(transactions);
        };
        fetchTransactions();
    }, []);

    useEffect( () => {
        if (bankAccounts && Object.keys(bankAccountBalances).length === 0 ) {
            for (const bankAccount of bankAccounts) {
                const fetchBalance = async () => {
                    const response = await fetch(`https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/${bankAccount.id}/balance/`);
                    const body = await response.json();
                    bankAccountBalances[bankAccount.id] = body.data.bank_account_balance;
                    setBankAccountBalances({...bankAccountBalances});
                };
                if (bankAccount.status === BankAccountStatus.ACTIVE) fetchBalance();
            }
        }
    }, [bankAccounts]);

    useEffect( () => {
        const accountsWithActivity = [];
        if (bankAccountBalances && transactions && bankAccounts) {
            for (const bankAccount of bankAccounts) {
                // In the current API revesion, there is no way to get transactions for a specific bank account.
                // For the purposes of this exercise, we will assume that all transactions are for all bank accounts.
                if (bankAccount.status === BankAccountStatus.ACTIVE) accountsWithActivity.push({...bankAccount, balance: bankAccountBalances[bankAccount.id], transactions: transactions});
            }
            setBankAccountsWithActivity(accountsWithActivity);
        }
    }, [bankAccountBalances, transactions, bankAccounts]);

    return banckAccountsWithActivity;
}
