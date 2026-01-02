/**
 * API Route: GET /api/health
 * Health check endpoint for monitoring and testing
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { googleSheetsService } from '@/lib/googleSheets';

interface HealthResponse {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  services: {
    api: 'operational' | 'down';
    googleSheets: 'operational' | 'down' | 'not_configured';
  };
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'down',
        googleSheets: 'not_configured',
      },
      message: 'Method not allowed',
    });
  }

  try {
    // Check if Google Sheets is configured
    const isConfigured = !!(
      process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_PROJECT_ID &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_CLIENT_EMAIL
    );

    let sheetsConnected = false;
    let sheetsStatus: 'operational' | 'down' | 'not_configured' = 'not_configured';

    if (isConfigured) {
      try {
        sheetsConnected = await googleSheetsService.testConnection();
        sheetsStatus = sheetsConnected ? 'operational' : 'down';
      } catch {
        sheetsStatus = 'down';
      }
    }

    const healthStatus: HealthResponse = {
      status: sheetsConnected ? 'healthy' : isConfigured ? 'degraded' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        api: 'operational',
        googleSheets: sheetsStatus,
      },
    };

    if (!isConfigured) {
      healthStatus.message = 'Google Sheets not configured. Check environment variables.';
    } else if (!sheetsConnected) {
      healthStatus.message = 'Google Sheets connection failed. Check credentials and spreadsheet access.';
    }

    const statusCode = sheetsConnected ? 200 : 503;
    return res.status(statusCode).json(healthStatus);
  } catch (error: any) {
    console.error('[Health] Check failed:', error);
    return res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'operational',
        googleSheets: 'down',
      },
      message: error.message || 'Health check failed',
    });
  }
}
