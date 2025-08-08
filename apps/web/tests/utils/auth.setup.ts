import { test as setup, expect } from '@playwright/test';

/**
 * Authentication setup for Playwright tests
 * 
 * This file handles any authentication state setup needed for tests.
 * For Stratalace (a marketing site), this is minimal, but provides
 * a foundation for future admin area testing.
 */

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // For a marketing site like Stratalace, there's typically no authentication needed
  // This setup ensures a clean state for all tests
  
  await page.goto('/');
  
  // Verify the site is accessible
  await expect(page.locator('h1')).toBeVisible();
  
  // Store authentication state (even if empty for marketing site)
  await page.context().storageState({ path: authFile });
});

// Optional: Setup for admin area if it exists in the future
setup('admin authenticate', async ({ page }) => {
  // This would be used if there's an admin dashboard
  // await page.goto('/admin/login');
  // await page.fill('[name="email"]', process.env.ADMIN_EMAIL || '');
  // await page.fill('[name="password"]', process.env.ADMIN_PASSWORD || '');
  // await page.click('button[type="submit"]');
  // await expect(page).toHaveURL('/admin/dashboard');
  // await page.context().storageState({ path: 'playwright/.auth/admin.json' });
  
  // For now, just ensure clean state
  await page.goto('/');
  await page.context().storageState({ path: authFile });
});