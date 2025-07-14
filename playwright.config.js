const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  timeout: 60000,
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'], 
    ['json', { outputFile: 'test-results.json' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
});
