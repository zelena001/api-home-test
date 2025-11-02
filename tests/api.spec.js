import { test, expect, db } from "../fixtures/dbFixture.js";
import { getTransactionRecordById } from "../utils/dbUtil.js";
import { apiPost } from "../helpers/apiTestHelper.js";
import { apiPath } from "../config/apiPath.js";
import { errorMessage } from "../test-data/errorMessage.js";

// Playwright test cases
test.describe("Transfer API Tests", () => {
  test("Valid transfer from active account to active bank account.", async ({
    request,
    
  }) => {
    const payload = {
      amount: 100.0,
      sendingAccount: "1234567890",
      receivingAccount: "0123456789",
      receivingBankCode: "123",
    };

    const response = await apiPost(request, apiPath.transfer, payload);
    expect(response.status, "API response code error").toBe(200);
    expect(
      response.body.data.sendingAccountNo,
      "API response is incorrect"
    ).toBe(payload.sendingAccount);
    expect(
      response.body.data.receivingAccountNo,
      "API response is incorrect"
    ).toBe(payload.receivingAccount);
    expect(
      response.body.data.receivingBankCode,
      "API response is incorrect"
    ).toBe(payload.receivingBankCode);

    const transactionRecord = await getTransactionRecordById(
      db,
      response.body.data.transferReferenceID
    );
    expect(
      transactionRecord.sending_account,
      "Sending Account is not save correctly to database"
    ).toBe(payload.sendingAccount);
    expect(
      transactionRecord.sending_account,
      "Receiveing account does not save correctly to db"
    ).toBe(payload.receivingAccount);
    expect(
      transactionRecord.sending_account,
      "Amount does not save correctly to db"
    ).toBe(payload.amount);
  });

  test("Invalid transfer - Missing amount parameter.", async ({
    request,
    
  }) => {
    const payload = {
      sendingAccount: "1234567890",
      receivingAccount: "0123456789",
      receivingBankCode: "123",
    };
    const response = await apiPost(request, apiPath.transfer, payload);
    expect(response.status, "API response code error").toBe(400);
    expect(response.body.error.message, "Message error is incorrect").toBe(
      errorMessage.BAD_REQUEST
    ); //Guessing the error message for missing parameter is BAD_REQUEST
  });

  test("Invalid transfer - amount is less than 0.01.", async ({
    request,
    
  }) => {
    const payload = {
      amount: 0.0,
      sendingAccount: "1111111111",
      receivingAccount: "0123456789",
      receivingBankCode: "123",
    };
    const response = await apiPost(request, apiPath.transfer, payload);
    expect(response.status, "API response code error").toBe(500);
    expect(response.body.error.message, "Message error is incorrect").toBe(
      errorMessage.TRANSACTION_LIMIT_DAILY
    ); //Guessing the error message for missing parameter is BAD_REQUEST
  });

});
