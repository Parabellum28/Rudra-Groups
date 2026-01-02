/**
 * Google Sheets API integration service
 * Handles authentication and data storage operations
 * Uses lazy initialization to avoid errors when credentials are not configured
 */

import { google, sheets_v4 } from 'googleapis';
import { LeadSubmission } from '@/types/lead';
import * as fs from 'fs';
import * as path from 'path';

class GoogleSheetsService {
  private sheets: sheets_v4.Sheets | null = null;
  private spreadsheetId: string = '';
  private range: string = '';
  private initialized: boolean = false;
  private initError: string | null = null;

  /**
   * Lazy initialization of Google Sheets client
   * Only creates the client when first needed
   */
  private async initialize(): Promise<void> {
    if (this.initialized) {
      if (this.initError) {
        throw new Error(this.initError);
      }
      return;
    }

    try {
      // Check for spreadsheet ID
      if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
        this.initError = 'Missing GOOGLE_SHEETS_SPREADSHEET_ID environment variable';
        this.initialized = true;
        throw new Error(this.initError);
      }

      this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
      this.range = process.env.GOOGLE_SHEETS_RANGE || 'Leads!A:G';

      let auth;

      // Method 1: Try to load from JSON credentials file
      const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
        path.join(process.cwd(), 'credentials.json');
      
      // Also check for the specific file the user has
      const possiblePaths = [
        credentialsPath,
        path.join(process.cwd(), 'credentials.json'),
        path.join(process.cwd(), 'rudra-web-482512-be66e4bb387c.json'),
      ];

      let credentialsFile: string | null = null;
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          credentialsFile = p;
          console.log('[GoogleSheets] Found credentials file:', p);
          break;
        }
      }

      if (credentialsFile) {
        // Use keyFile approach - most reliable
        auth = new google.auth.GoogleAuth({
          keyFile: credentialsFile,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        console.log('[GoogleSheets] Using credentials file authentication');
      } else {
        // Method 2: Try environment variables
        const requiredVars = [
          'GOOGLE_PROJECT_ID',
          'GOOGLE_PRIVATE_KEY',
          'GOOGLE_CLIENT_EMAIL',
        ];

        const missingVars = requiredVars.filter((v) => !process.env[v]);
        if (missingVars.length > 0) {
          this.initError = `No credentials file found and missing environment variables: ${missingVars.join(', ')}`;
          this.initialized = true;
          throw new Error(this.initError);
        }

        // Parse the private key - handle different formats
        let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
        
        // Remove surrounding quotes if present
        if ((privateKey.startsWith('"') && privateKey.endsWith('"')) ||
            (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
          privateKey = privateKey.slice(1, -1);
        }
        
        // Replace escaped newlines with actual newlines
        privateKey = privateKey.replace(/\\n/g, '\n');

        auth = new google.auth.GoogleAuth({
          credentials: {
            type: 'service_account',
            project_id: process.env.GOOGLE_PROJECT_ID,
            private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID || '',
            private_key: privateKey,
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CLIENT_ID || '',
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL || '',
          } as any,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        console.log('[GoogleSheets] Using environment variables authentication');
      }

      this.sheets = google.sheets({ version: 'v4', auth });
      this.initialized = true;
      this.initError = null;

      console.log('[GoogleSheets] Service initialized successfully');
    } catch (error: any) {
      this.initialized = true;
      this.initError = error.message || 'Failed to initialize Google Sheets service';
      console.error('[GoogleSheets] Initialization error:', this.initError);
      throw new Error(this.initError || 'Unknown error');
    }
  }

  /**
   * Ensure the sheets client is ready
   */
  private async getClient(): Promise<sheets_v4.Sheets> {
    await this.initialize();
    if (!this.sheets) {
      throw new Error('Google Sheets client not initialized');
    }
    return this.sheets;
  }

  /**
   * Initialize the Google Sheet with headers if they don't exist
   */
  async initializeSheet(): Promise<void> {
    const sheets = await this.getClient();

    try {
      // First, verify we can access the spreadsheet
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });

      console.log('[GoogleSheets] Connected to spreadsheet:', spreadsheet.data.properties?.title);

      // Check if "Leads" sheet exists
      const sheetExists = spreadsheet.data.sheets?.some(
        (sheet) => sheet.properties?.title === 'Leads'
      );

      if (!sheetExists) {
        console.log('[GoogleSheets] Creating "Leads" sheet...');
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: 'Leads',
                  },
                },
              },
            ],
          },
        });
        console.log('[GoogleSheets] "Leads" sheet created');
      }

      // Check if headers exist
      let existingHeaders: string[] | undefined;
      try {
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: 'Leads!A1:G1',
        });
        existingHeaders = response.data.values?.[0] as string[] | undefined;
      } catch {
        existingHeaders = undefined;
      }

      // Expected headers
      const expectedHeaders = [
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Company Name',
        'Service Category',
        'Description',
      ];

      // Add headers if they don't exist
      if (!existingHeaders || existingHeaders.length === 0) {
        console.log('[GoogleSheets] Adding headers...');
        await sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'Leads!A1:G1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [expectedHeaders],
          },
        });
        console.log('[GoogleSheets] Headers added successfully');
      }
    } catch (error: any) {
      console.error('[GoogleSheets] Error initializing sheet:', error.message);
      
      // Provide helpful error messages
      if (error.code === 404) {
        throw new Error(
          `Spreadsheet not found. Please check that GOOGLE_SHEETS_SPREADSHEET_ID is correct and the spreadsheet exists.`
        );
      }
      if (error.code === 403) {
        throw new Error(
          `Access denied to spreadsheet. Please share the spreadsheet with your service account email with Editor permissions.`
        );
      }
      throw new Error(`Failed to initialize Google Sheet: ${error.message}`);
    }
  }

  /**
   * Append a new lead submission to the Google Sheet
   */
  async appendLead(lead: LeadSubmission): Promise<void> {
    const sheets = await this.getClient();

    try {
      // Ensure sheet is initialized with headers
      await this.initializeSheet();

      // Prepare the row data (matching header order)
      const rowData = [
        lead.timestamp || new Date().toISOString(),
        lead.name || '',
        lead.email || '',
        lead.phone || '',
        lead.companyName || '',
        lead.serviceCategory || '',
        lead.description || '',
      ];

      console.log('[GoogleSheets] Appending lead:', { name: lead.name, email: lead.email });

      // Append the row to the sheet
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Leads!A:G',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [rowData],
        },
      });

      console.log('[GoogleSheets] Lead appended successfully:', response.data.updates?.updatedRange);
    } catch (error: any) {
      console.error('[GoogleSheets] Error appending lead:', error.message);
      
      if (error.code === 403) {
        throw new Error(
          `Cannot write to spreadsheet. Please ensure the service account has Editor permissions on the spreadsheet.`
        );
      }
      throw new Error(`Failed to save lead: ${error.message}`);
    }
  }

  /**
   * Test the connection to Google Sheets
   */
  async testConnection(): Promise<boolean> {
    try {
      const sheets = await this.getClient();
      await sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });
      console.log('[GoogleSheets] Connection test successful');
      return true;
    } catch (error: any) {
      console.error('[GoogleSheets] Connection test failed:', error.message);
      return false;
    }
  }

  /**
   * Reset the service (useful for testing or reconfiguration)
   */
  reset(): void {
    this.sheets = null;
    this.initialized = false;
    this.initError = null;
  }
}

// Export a singleton instance
export const googleSheetsService = new GoogleSheetsService();
