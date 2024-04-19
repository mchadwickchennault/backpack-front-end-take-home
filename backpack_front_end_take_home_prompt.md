# Introduction

As part of Backpack’s application process we would like to see a sample of your work. This prompt should take between 10 - 15 hours to complete.

## Prompt

Backpack is a financial institution that at its core deals with bank accounts, balances, and transactions. In this prompt you will build a UI that displays a customer’s bank account and routing numbers, available and pending balances, and transactions.

Please create a separate repository named **backpack-front-end-take-home** for this prompt and commit your work as you go. When you are ready for us to review your work, give us access to your repository.

If you have any questions please ask!

## Tech Stack

The web application must be build using React. The rest is up to you.

## Requirements

- [ ]  UI for displaying, concealing, and copying account and routing numbers
- [ ]  UI for displaying the current and available balance
- [ ]  UI for displaying transactions
- [ ]  `README` explaining your design choices and how to run the application

## Extras

- [ ]  Reusable components
- [ ]  Polished UI and styling
- [ ]  Filter and search for transactions
- [ ]  Mobile friendly
- [ ]  Tests

## API

💡 The base path for the API is [**https://api.dev.backpackpay.com/api/v1/mocks**](https://api.dev.backpackpay.com/api/v1/mocks)

### `GET /bank-accounts`

Get an account owner’s bank accounts.

**Response Body**

```json
{
    data: {
        bank_accounts: [
            {
                id,
                created_at,
                updated_at,
                status,
                name,
                account_number,
                routing_number
            }
        ],
    },
    request_id
}
```

### `GET /bank-accounts/:bank_account_id/balance`

Get a bank account’s balance.

**Response Body**

```json
{
    data: {
        balance: {
            bank_account_id,
            available_balance_in_cents,
            pending_balance_in_cents
        }
    },
    request_id
}
```

### `GET /transactions`

Get an account owner’s transactions.

**Response Body**

```json
{
    data: {
        transactions: [
            {
                id,
                created_at,
                updated_at,
                type,
                date,
                description,
                amount_in_cents,
            }
        ]
    },
    request_id
}
```

💡 All debits have `amount_in_cents < 0` and credits have `amount_in_cents >= 0`

## Design System

### Core

| Name | HEX |
| --- | --- |
| Primary | #033AFC |
| Secondary | #24305B |

### Shades

| Name | HEX |
| --- | --- |
| White | #FFFFFF |
| Black | #000000 |
| Dark Grey | #5E5E5E |
| Light Grey | #CFCFCF |

### Warning Colors

| Name | HEX |
| --- | --- |
| Red | #C44E42 |
| Yellow | #FFCF20 |
| Green | #608D64 |

### Fonts

| Type | Size | Weight |
| --- | --- | --- |
| H1 | 48 | Bold |
| H2 | 38 | Bold |
| H3 | 30 | Bold |
| Body | 16 | Regular |
| Label | 14 | Light |
| Info | 12 | Light |

*font-family: Montserrat*

