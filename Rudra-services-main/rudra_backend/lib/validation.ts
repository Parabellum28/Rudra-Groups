/**
 * Form validation schemas using Zod
 */

import { z } from 'zod';

// Phone number regex - flexible to accept various international formats
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim()
    .refine((val) => val.length > 0, 'Name is required'),
    
  email: z
    .string()
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
    
  phone: z
    .string()
    .trim()
    .refine(
      (val) => phoneRegex.test(val.replace(/\s/g, '')),
      'Please provide a valid phone number'
    ),
    
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must not exceed 200 characters')
    .trim(),
    
  serviceCategory: z
    .string()
    .max(100, 'Service category must not exceed 100 characters')
    .trim()
    .optional()
    .default(''),
    
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must not exceed 2000 characters')
    .trim(),
});

export type ValidatedLeadFormData = z.infer<typeof leadFormSchema>;

/**
 * Helper function to format validation errors for API response
 */
export function formatValidationErrors(error: z.ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  
  for (const issue of error.issues) {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(issue.message);
  }
  
  return errors;
}
