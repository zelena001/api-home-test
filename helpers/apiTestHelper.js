// utils/apiTest.js
import config from '../config/env.js';
const { BASE_URL } = config;

/**
 * Run API POST request and always return response details
 * @param {import('@playwright/test').APIRequestContext} request - Playwright request fixture
 * @param {string} path - API path, e.g., '/qa-exam/transfer'
 * @param {object} payload - request payload
 * @returns {object} - { status, body, headers }
 */
export async function apiPost(request, path, payload) {
  let response;
  let body;
  const url = `${BASE_URL}${path}`;

  try {
    console.log('➡️ POST Request URL:', url);
    console.log('➡️ Request Body:', JSON.stringify(payload, null, 2));

    response = await request.post(url, {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    });

    body = await response.json();
  } catch (err) {
    body = { error: err.message };
  }

  return {
    status: response?.status() || 0,
    body,
    headers: response?.headers() || {},
  };
}