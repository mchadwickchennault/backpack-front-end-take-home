import { renderHook, waitFor } from "@testing-library/react";
import { useBankAccounts } from "../../src/hooks/useBankAccounts";
import { testBankAccounts, testBalance, testTransactions, testBanckAccountsWithActivity } from "../testData";

describe('useBankAccounts', () => {
    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation((url: string) => {
            if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/') {
                return Promise.resolve({ json: () => Promise.resolve({
                    data: {
                        bank_accounts: testBankAccounts,
                    }
                }) });
            } else if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/1/balance/') {
                return Promise.resolve({ json: () => Promise.resolve({
                    data: {
                        bank_account_balance: testBalance,
                    }
                }) });
            } else if (url === 'https://api.dev.backpackpay.com/api/v1/mocks/transactions/') {
                return Promise.resolve({ json: () => Promise.resolve({
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
    });
    it('should return an array of bank accounts with activity', async () => {
        const { result } = renderHook(() => useBankAccounts());
        await waitFor(() => expect(result.current).toHaveLength(1));
        expect(result.current).toEqual(testBanckAccountsWithActivity);
    });
});