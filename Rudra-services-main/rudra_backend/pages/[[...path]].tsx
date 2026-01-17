import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';

/**
 * Catch-all route to serve the React SPA
 * This handles all non-API routes and serves the index.html file
 */
export default function CatchAll() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const url = req.url || '';
  
  // Don't handle API routes - Next.js handles them before this catch-all
  if (url.startsWith('/api/')) {
    return { notFound: true };
  }
  
  // Don't handle static assets - Next.js serves them automatically from public folder
  // This includes /assets/, /favicon.ico, /robots.txt, etc.
  if (url.startsWith('/assets/') || 
      url.startsWith('/favicon.ico') || 
      url.startsWith('/robots.txt') ||
      url.startsWith('/placeholder.svg') ||
      url.includes('.')) {
    // Let Next.js serve static files - don't interfere
    return { notFound: true };
  }

  // Serve index.html for all other routes (SPA routing)
  const indexPath = path.join(process.cwd(), 'public', 'index.html');
  
  try {
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.write(html);
      res.end();
      return { props: {} };
    } else {
      console.error('index.html not found at:', indexPath);
    }
  } catch (error) {
    console.error('Error serving index.html:', error);
  }

  return { notFound: true };
};

