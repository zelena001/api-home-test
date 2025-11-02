import { test, expect, db } from "../fixtures/dbFixture.js";
import { getTransactionRecordById } from "../utils/dbUtil.js";
import { apiPost } from "../helpers/apiTestHelper.js";
import { apiPath } from "../config/apiPath.js";
import { errorMessage } from "../test-data/errorMessage.js";

// Playwright test cases
test.describe("Transfer API Tests", () => {
  test("Test framework with public API.", async ({ request }) => {
    const payload = {
      title: "foo",
      body: "bar",
      userId: 1,
    };
    const response = await apiPost(request, apiPath.post, payload);
    console.log(response.body);
    expect(response.status, "API response code error").toBe(201);
    expect(response.body.title, "API response is incorrect").toBe(
      payload.title
    );
    expect(response.body.body, "API response is incorrect").toBe(payload.body);
    expect(response.body.userId, "API response is incorrect").toBe(
      payload.userId
    );
    expect(response.body.id, "API response is incorrect").toBe(101);
  });
});
