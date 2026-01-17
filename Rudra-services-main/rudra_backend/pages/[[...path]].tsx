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
  // Don't handle API routes - Next.js handles them before this catch-all
  if (req.url?.startsWith('/api/')) {
    return { notFound: true };
  }

  // Try multiple possible paths for index.html
  const possiblePaths = [
    path.join(process.cwd(), 'public', 'index.html'),
    path.join(process.cwd(), 'rudra_backend', 'public', 'index.html'),
    path.join(__dirname, '..', '..', 'public', 'index.html'),
  ];

  let html: string | null = null;
  let usedPath: string | null = null;

  // Try each path until we find the file
  for (const indexPath of possiblePaths) {
    try {
      if (fs.existsSync(indexPath)) {
        html = fs.readFileSync(indexPath, 'utf8');
        usedPath = indexPath;
        break;
      }
    } catch (error) {
      console.error(`Error reading ${indexPath}:`, error);
    }
  }

  // Always serve HTML - either the actual index.html or a fallback
  if (!html) {
    console.error('index.html not found. Tried paths:', possiblePaths);
    console.error('Current working directory:', process.cwd());
    console.error('__dirname:', __dirname);
    
    // Return a simple HTML page as fallback with error message
    html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rudra Groups - Setup Required</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              min-height: 100vh; 
              margin: 0; 
              background: #000; 
              color: #fff; 
            }
            .container { text-align: center; padding: 2rem; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Setup Required</h1>
            <p>index.html not found. Please check build logs.</p>
            <p>Expected paths:</p>
            <ul style="text-align: left; display: inline-block;">
              ${possiblePaths.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        </body>
      </html>
    `;
  }

  // Serve the HTML
  try {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.write(html);
    res.end();
    // Return empty props to prevent Next.js from trying to render the component
    return { props: {} };
  } catch (error) {
    console.error('Error writing response:', error);
    // Even on error, try to send something
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error serving page');
    return { props: {} };
  }
};

