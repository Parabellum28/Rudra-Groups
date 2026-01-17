/**
 * API Route: POST /api/leads/submit
 * Handles lead form submissions and stores them in Google Sheets
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { leadFormSchema, formatValidationErrors } from '@/lib/validation';
import { googleSheetsService } from '@/lib/googleSheets';
import { LeadSubmission, ApiResponse } from '@/types/lead';

// Disable body parsing to handle it manually if needed
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      message: 'Method not allowed. Please use POST.',
    });
    return;
  }

  try {
    console.log('[API] Received lead submission request');
    console.log('[API] Request body:', JSON.stringify(req.body, null, 2));
    
    // Check if Google Sheets is configured
    const hasSpreadsheetId = !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const hasCredentials = !!(
      process.env.GOOGLE_PROJECT_ID &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_CLIENT_EMAIL
    );
    
    console.log('[API] Configuration check:', {
      hasSpreadsheetId,
      hasCredentials,
      spreadsheetId: hasSpreadsheetId ? 'Set' : 'Missing',
    });

    // Validate request body
    const validationResult = leadFormSchema.safeParse(req.body);

    if (!validationResult.success) {
      const formattedErrors = formatValidationErrors(validationResult.error);
      console.log('[API] Validation failed:', formattedErrors);
      
      return res.status(400).json({
        success: false,
        message: 'Please check your input and try again.',
        errors: formattedErrors,
      });
    }

    const validatedData = validationResult.data;
    console.log('[API] Validation passed:', { name: validatedData.name, email: validatedData.email });

    // Create lead submission with timestamp
    const leadSubmission: LeadSubmission = {
      ...validatedData,
      timestamp: new Date().toISOString(),
    };

    // Store in Google Sheets
    console.log('[API] Attempting to save lead to Google Sheets...');
    try {
      await googleSheetsService.appendLead(leadSubmission);
      console.log('[API] Lead saved successfully to Google Sheets');
    } catch (sheetsError: any) {
      console.error('[API] Google Sheets error:', sheetsError);
      console.error('[API] Google Sheets error message:', sheetsError.message);
      console.error('[API] Google Sheets error stack:', sheetsError.stack);
      // Re-throw to be caught by outer catch block
      throw sheetsError;
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Thank you! Your information has been submitted successfully.',
      data: {
        timestamp: leadSubmission.timestamp,
      },
    });
    return;
  } catch (error: any) {
    console.error('[API] Error processing lead submission:', error);
    console.error('[API] Error stack:', error.stack);
    console.error('[API] Error message:', error.message);

    // Determine the appropriate error message based on error type
    let userMessage = 'We encountered an issue processing your request. Please try again.';
    let statusCode = 500;
    
    // Check for specific error types
    if (error.message?.includes('environment variables') || error.message?.includes('Missing')) {
      userMessage = 'Server configuration error: Missing Google Sheets credentials. Please contact support.';
      statusCode = 500;
    } else if (error.message?.includes('Access denied') || error.message?.includes('403') || error.message?.includes('permissions')) {
      userMessage = 'Server configuration error: Google Sheets access denied. Please contact support.';
      statusCode = 500;
    } else if (error.message?.includes('not found') || error.message?.includes('404') || error.message?.includes('Spreadsheet')) {
      userMessage = 'Server configuration error: Google Spreadsheet not found. Please contact support.';
      statusCode = 500;
    } else if (error.message?.includes('Failed to save') || error.message?.includes('append')) {
      userMessage = 'Failed to save your information. Please try again or contact us directly.';
      statusCode = 500;
    } else {
      // For debugging - include error message in development
      if (process.env.NODE_ENV === 'development') {
        userMessage = `Error: ${error.message || 'Unknown error'}`;
      }
    }

    // Ensure we always send a response
    if (!res.headersSent) {
      res.status(statusCode).json({
        success: false,
        message: userMessage,
        // Include error details in development
        ...(process.env.NODE_ENV === 'development' && {
          error: error.message,
          stack: error.stack,
        }),
      });
    }
    return;
  }
}
