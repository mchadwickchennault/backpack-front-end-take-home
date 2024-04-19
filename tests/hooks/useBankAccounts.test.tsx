import { renderHook, waitFor } from "@testing-library/react";
import { useBankAccounts } from "../../src/hooks/useBankAccounts";
import { testBankAccounts, testBalance, testTransactions, testBanckAccountsWithActivity } from "../testData";

describe('useBankAccounts', () => {
    
    it('should return an array of bank accounts with activity', async () => {
        global.fetch = jest.fn().mockImplementation((url: string) => {
            if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/') {
                return Promise.resolve({ status: 200, json: () => Promise.resolve({
                    data: {
                        bank_accounts: testBankAccounts,
                    }
                }) });
            } else if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/1/balance/') {
                return Promise.resolve({ status: 200, json: () => Promise.resolve({
                    data: {
                        bank_account_balance: testBalance,
                    }
                }) });
            } else if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/transactions/') {
                return Promise.resolve({ status: 200, json: () => Promise.resolve({
                    status: 200,
                    data: {
                        transactions: testTransactions,
                    }
                }) });
            } else {
                return Promise.resolve({
                    status: 404,
                    body: 'Not Found'
                });
            }
        }) as jest.Mock;
        const { result } = renderHook(() => useBankAccounts());
        await waitFor(() => expect(result.current.banckAccountsWithActivity).toHaveLength(1));
        
        expect(result.current.banckAccountsWithActivity).toEqual(testBanckAccountsWithActivity);
    });
    it('should return an array of errors if there is an error fetching bank accounts', async () => {
        global.fetch = jest.fn().mockImplementation((url: string) => {
            if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/') {
                return Promise.resolve({
                    status: 404,
                    body: 'Not Found'
                });
            } else {
                return Promise.resolve({
                    status: 404,
                    body: 'Not Found'
                });
            }
        }) as jest.Mock;
        const { result } = renderHook(() => useBankAccounts());
        await waitFor(() => expect(result.current.errors).toContain('Error fetching bank accounts'));
    }
    );
    it('should return an array of errors if there is an error fetching transactions', async () => {
        global.fetch = jest.fn().mockImplementation((url: string) => {
            if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/') {
                return Promise.resolve({ status: 200, json: () => Promise.resolve({
                    data: {
                        bank_accounts: testBankAccounts,
                    }
                }) });
            } else if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/1/balance/') {
                return Promise.resolve({ status: 200, json: () => Promise.resolve({
                    data: {
                        bank_account_balance: testBalance,
                    }
                }) });
            } else if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/transactions/') {
                return Promise.resolve({
                    status: 404,
                    body: 'Not Found'
                });
            } else {
                return Promise.resolve({
                    status: 404,
                    body: 'Not Found'
                });
            }
        }) as jest.Mock;
        const { result } = renderHook(() => useBankAccounts());
        await waitFor(() => expect(result.current.errors).toContain('Error fetching transactions'));
    });
    it('should return an array of errors if there is an error fetching bank account balance', async () => {
        global.fetch = jest.fn().mockImplementation((url: string) => {
            if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/') {
                return Promise.resolve({ status: 200, json: () => Promise.resolve({
                    data: {
                        bank_accounts: testBankAccounts,
                    }
                }) });
            } else if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/1/balance/') {
                return Promise.resolve({
                    status: 404,
                    body: 'Not Found'
                });
            } else if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/transactions/') {
                return Promise.resolve({ status: 200, json: () => Promise.resolve({
                    data: {
                        transactions: testTransactions,
                    }
                }) });
            } else {
                return Promise.resolve({
                    status: 404,
                    body: 'Not Found'
                });
            }
        }) as jest.Mock;
        const { result } = renderHook(() => useBankAccounts());
        await waitFor(() => expect(result.current.errors).toContain('Error fetching balance for bank account 1'));
    });
});
