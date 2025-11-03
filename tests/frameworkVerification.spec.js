//import { test, expect, db } from "../fixtures/dbFixture.js";
import { test, expect  } from "../fixtures/dbFixture.js";
import { getTransactionRecordById } from "../utils/dbUtil.js";
import { apiPost } from "../helpers/apiTestHelper.js";
import { apiPath } from "../config/apiPath.js";
import  testData  from "../data/testData.js";

// Playwright test cases this is not related to assignment, use public api to verify framework works
// need to run with env= test
test.describe.skip("Transfer API Tests", () => {
  test("Test framework with public API.", async ({ request }) => {
    const response = await apiPost(request, apiPath.post, testData.framework.success);
    console.log(response.body);
    expect(response.status, "API response code error").toBe(201);
    expect(response.body.title, "API response is incorrect").toBe(
      testData.framework.success.title
    );
    expect(response.body.body, "API response is incorrect").toBe(testData.framework.success.body);
    expect(response.body.userId, "API response is incorrect").toBe(
      testData.framework.success.userId
    );
    expect(response.body.id, "API response is incorrect").toBe(101);
  });
});
