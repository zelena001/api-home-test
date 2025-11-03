//import { test, expect, db } from "../fixtures/dbFixture.js";
import { test,expect } from "../fixtures/dbFixture.js";

import { getTransactionRecordById } from "../utils/dbUtil.js";
import { apiPost } from "../helpers/apiTestHelper.js";
import { apiPath } from "../config/apiPath.js";
import { errorMessage } from "../constant/errorMessage.js";
import  testData  from "../data/testData.js";

// Playwright test cases
test.describe("Transfer API Tests", () => {
  test("Valid transfer from active account to active bank account.", async ({
    request,
    db
  }) => {
    const response = await apiPost(request, apiPath.transfer, testData.transfer.success);
    expect(response.status, "API response code error").toBe(200);
    expect(
      response.body.data.sendingAccountNo,
      "API response is incorrect"
    ).toBe(testData.transfer.success.sendingAccount);
    expect(
      response.body.data.receivingAccountNo,
      "API response is incorrect"
    ).toBe(testData.transfer.success.receivingAccount);
    expect(
      response.body.data.receivingBankCode,
      "API response is incorrect"
    ).toBe(testData.transfer.success.receivingBankCode);

    const transactionRecord = await getTransactionRecordById(
      db,
      response.body.data.transferReferenceID
    );
    expect(
      transactionRecord.sending_account,
      "Sending Account is not save correctly to database"
    ).toBe(testData.transfer.success.sendingAccount);
    expect(
      transactionRecord.sending_account,
      "Receiveing account does not save correctly to db"
    ).toBe(testData.transfer.success.receivingAccount);
    expect(
      transactionRecord.sending_account,
      "Amount does not save correctly to db"
    ).toBe(testData.transfer.success.amount);
  });

  test("Invalid transfer - Missing amount parameter.", async ({
    request,
    
  }) => {
    const response = await apiPost(request, apiPath.transfer, testData.transfer.noAmount);
    expect(response.status, "API response code error").toBe(400);
    expect(response.body.error.message, "Message error is incorrect").toBe(
      errorMessage.BAD_REQUEST
    ); //Guessing the error message for missing parameter is BAD_REQUEST
    //for checking that record is not generated in DB would consider few thing such as test data is isolated and DB is clean before test run, 
    // not sure how the db is looks like, but if needed we can do count(*) using sender_id and date before and afte run. But need to consider test data for pararell run as well.
    // So for now just checking the error message, usually that would be enough to confirm that request is not processed further.
  });

  test("Invalid transfer - amount is less than 0.01.", async ({
    request,
    
  }) => {
    const response = await apiPost(request, apiPath.transfer, testData.transfer.minimumAmount);
    expect(response.status, "API response code error").toBe(500);
    expect(response.body.error.message, "Message error is incorrect").toBe(
      errorMessage.TRANSACTION_LIMIT_DAILY
    ); //for checking that record is not generated in DB would consider few thing such as test data is isolated and DB is clean before test run, 
    // not sure how the db is looks like, but if needed we can do count(*) using sender_id and date before and afte run. But need to consider test data for pararell run as well.
    // So for now just checking the error message, usually that would be enough to confirm that request is not processed further.

  });

});
