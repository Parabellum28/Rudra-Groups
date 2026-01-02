/**
 * Setup Verification Script
 * Run this script to verify your Google Sheets configuration
 * Usage: npx ts-node scripts/verify-setup.ts
 */

import { googleSheetsService } from '../lib/googleSheets';

async function verifySetup() {
  console.log('🔍 Verifying Rudra Groups Backend Setup...\n');

  // Check environment variables
  const requiredEnvVars = [
    'GOOGLE_SHEETS_SPREADSHEET_ID',
    'GOOGLE_PROJECT_ID',
    'GOOGLE_PRIVATE_KEY_ID',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_CLIENT_EMAIL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_X509_CERT_URL',
  ];

  console.log('📋 Checking environment variables...');
  const missingVars: string[] = [];

  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
      console.log(`  ❌ ${varName} - Missing`);
    } else {
      console.log(`  ✅ ${varName} - Set`);
    }
  }

  if (missingVars.length > 0) {
    console.log(`\n⚠️  Missing ${missingVars.length} environment variable(s).`);
    console.log('Please set all required variables in your .env file.\n');
    process.exit(1);
  }

  // Test Google Sheets connection
  console.log('\n🔗 Testing Google Sheets connection...');
  try {
    const isConnected = await googleSheetsService.testConnection();
    if (isConnected) {
      console.log('  ✅ Successfully connected to Google Sheets');
    } else {
      console.log('  ❌ Failed to connect to Google Sheets');
      console.log('  Please verify:');
      console.log('    - Spreadsheet ID is correct');
      console.log('    - Service account has access to the spreadsheet');
      console.log('    - Google Sheets API is enabled\n');
      process.exit(1);
    }
  } catch (error: any) {
    console.log('  ❌ Error connecting to Google Sheets:', error.message);
    process.exit(1);
  }

  // Test sheet initialization
  console.log('\n📊 Testing sheet initialization...');
  try {
    await googleSheetsService.initializeSheet();
    console.log('  ✅ Sheet initialized successfully');
  } catch (error: any) {
    console.log('  ❌ Error initializing sheet:', error.message);
    process.exit(1);
  }

  console.log('\n✨ Setup verification complete! Your backend is ready to use.\n');
}

// Run verification
verifySetup().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

