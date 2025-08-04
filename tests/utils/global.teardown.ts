import { test as teardown } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Global teardown for Playwright tests
 * 
 * Cleans up test artifacts and temporary files
 */

teardown('cleanup', async () => {
  console.log('Running global teardown...');
  
  // Clean up authentication files
  const authDir = path.join(process.cwd(), 'playwright', '.auth');
  if (fs.existsSync(authDir)) {
    const authFiles = fs.readdirSync(authDir);
    for (const file of authFiles) {
      if (file.endsWith('.json')) {
        const filePath = path.join(authDir, file);
        try {
          fs.unlinkSync(filePath);
          console.log(`Cleaned up auth file: ${file}`);
        } catch (error) {
          console.warn(`Failed to clean up auth file ${file}:`, error);
        }
      }
    }
  }
  
  // Clean up any temporary test data files
  const tempDir = path.join(process.cwd(), 'temp');
  if (fs.existsSync(tempDir)) {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log('Cleaned up temporary directory');
    } catch (error) {
      console.warn('Failed to clean up temporary directory:', error);
    }
  }
  
  // Log test completion
  console.log('Global teardown completed successfully');
});