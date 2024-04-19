import {
  TransactionType,
  BankAccountStatus,
} from "../src/hooks/useBankAccounts";

export const testBankAccounts = [
  {
    id: "1",
    created_at: "2024-01-18T20:45:00.000Z",
    updated_at: "2024-04-18T20:45:00.000Z",
    status: "ACTIVE",
    name: "Bank Account 1",
    account_number: 1234,
    routing_number: 5678,
    balance: {
      bank_account_id: "1",
      available_balance_in_cents: 1973408,
      pending_balance_in_cents: 2040245,
    },
    transactions: [[Object], [Object]],
  },
  {
    id: "2",
    created_at: "2024-04-18T20:45:00.000Z",
    updated_at: "2024-04-18T20:45:00.000Z",
    status: "INACTIVE",
    name: "Bank Account 2",
    account_number: 4321,
    routing_number: 8765,
  },
];

export const testTransactions = [
  {
    id: "1",
    created_at: "2024-03-18T20:45:00.000Z",
    updated_at: "2024-03-18T20:45:00.000Z",
    type: "DEPOSIT",
    date: "2024-03-18T20:45:00.000Z",
    description: "Deposit",
    amount_in_cents: 10000,
  },
  {
    id: "2",
    created_at: "2024-02-18T20:45:00.000Z",
    updated_at: "2024-02-18T20:45:00.000Z",
    type: "WITHDRAWAL",
    date: "2024-02-18T20:45:00.000Z",
    description: "Withdrawal",
    amount_in_cents: 5000,
  },
];

export const testBalance = {
  bank_account_id: "1",
  available_balance_in_cents: 1973408,
  pending_balance_in_cents: 2040245,
};

const outputTransactions = [
  {
    ...testTransactions[0],
    created_at: new Date(testTransactions[0].created_at),
    updated_at: new Date(testTransactions[0].updated_at),
    date: new Date(testTransactions[0].date),
    type: TransactionType.DEPOSIT,
  },
  {
    ...testTransactions[1],
    created_at: new Date(testTransactions[1].created_at),
    updated_at: new Date(testTransactions[1].updated_at),
    date: new Date(testTransactions[1].date),
    type: TransactionType.WITHDRAWAL,
  },
];

const outputBankAccount = {
  ...testBankAccounts[0],
  status: BankAccountStatus.ACTIVE,
  created_at: new Date(testBankAccounts[0].created_at),
  updated_at: new Date(testBankAccounts[0].updated_at),
  balance: testBalance,
  transactions: outputTransactions,
};

export const testBanckAccountsWithActivity = [
  {
    ...outputBankAccount,
    transactions: outputTransactions,
    balance: testBalance,
  },
];
