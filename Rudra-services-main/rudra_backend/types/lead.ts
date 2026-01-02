/**
 * Type definitions for lead capture form data
 */

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  serviceCategory?: string;
  description: string;
}

export interface LeadSubmission extends LeadFormData {
  timestamp: string;
  id?: string;
}

export interface ApiSuccessResponse {
  success: true;
  message: string;
  data?: {
    timestamp: string;
    [key: string]: any;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;
