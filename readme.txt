Playwright API + DB Testing Project

This project contains automated tests for APIs using Playwright in JavaScript, with optional database verification via MySQL. It is designed for environment-based configuration and supports structured API paths.

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run tests for a specific file
npx playwright test tests/api.spec.js

# Run tests with a specific environment
$env:NODE_ENV="test"; npx playwright test // if NODE_ENV env doesn't set it should use development config
