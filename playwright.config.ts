import { defineConfig, devices } from '@playwright/test';
import config from './config/config';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  retries: 2,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' , open: 'always' }],
    ['allure-playwright'],
  ],
  use: {
    baseURL: config.baseUrl,
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    trace: 'on',
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  outputDir: './reports/',
  workers: 4, // Set the number of workers for parallel execution
});
