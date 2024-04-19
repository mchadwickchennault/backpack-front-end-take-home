import React from "react";
import { render, waitFor } from "@testing-library/react";

import { AccountInfo } from "../../src/components/AccountInfo";
import { UseBankAccountInterface } from "../../src/hooks/useBankAccounts";

describe("AccountInfo", () => {
  it("should display errors if there are errors", async () => {
    const useBankAccounts: UseBankAccountInterface = () => {
      return {
        banckAccountsWithActivity: [],
        errors: ["Error fetching bank accounts"],
      };
    };
    const { getByText } = render(
      <AccountInfo useBankAccounts={useBankAccounts} />,
    );
    await waitFor(() =>
      expect(getByText("Error fetching bank accounts")).toBeDefined(),
    );
  });
});
