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

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Please use POST.',
    });
  }

  try {
    console.log('[API] Received lead submission request');
    console.log('[API] Request body:', JSON.stringify(req.body, null, 2));

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
    await googleSheetsService.appendLead(leadSubmission);
    console.log('[API] Lead saved successfully');

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your information has been submitted successfully.',
      data: {
        timestamp: leadSubmission.timestamp,
      },
    });
  } catch (error: any) {
    console.error('[API] Error processing lead submission:', error);

    // Determine the appropriate error message
    let userMessage = 'We encountered an issue processing your request. Please try again.';
    
    if (error.message?.includes('environment variables')) {
      userMessage = 'Service configuration error. Please contact support.';
    } else if (error.message?.includes('Access denied') || error.message?.includes('403')) {
      userMessage = 'Service configuration error. Please contact support.';
    } else if (error.message?.includes('not found') || error.message?.includes('404')) {
      userMessage = 'Service configuration error. Please contact support.';
    }

    return res.status(500).json({
      success: false,
      message: userMessage,
    });
  }
}
