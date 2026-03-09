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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const url = req.url || '';
  
  // Don't handle API routes - Next.js handles them before this catch-all
  if (url.startsWith('/api/')) {
    return { notFound: true };
  }
  
  // Handle static assets from frontend public folder
  const publicPath = path.join(process.cwd(), '..', 'frontend', 'rudra-growth-platform-main2', 'public');
  const assetPath = path.join(publicPath, url);
  
  if (url.startsWith('/favicon.ico') || 
      url.startsWith('/robots.txt') ||
      url.startsWith('/placeholder.svg') ||
      url.startsWith('/sitemap.xml')) {
    try {
      if (fs.existsSync(assetPath)) {
        const asset = fs.readFileSync(assetPath);
        const ext = path.extname(url);
        const contentType = ext === '.ico' ? 'image/x-icon' : 
                           ext === '.txt' ? 'text/plain' :
                           ext === '.xml' ? 'application/xml' :
                           ext === '.svg' ? 'image/svg+xml' : 'text/plain';
        
        res.setHeader('Content-Type', contentType);
        res.write(asset);
        res.end();
        return { props: {} };
      }
    } catch (error) {
      console.error('Error serving static asset:', error);
    }
  }
  
  // Handle built assets from dist folder (if exists)
  const distPath = path.join(process.cwd(), '..', 'frontend', 'rudra-growth-platform-main2', 'dist');
  if (url.startsWith('/assets/')) {
    const distAssetPath = path.join(distPath, url);
    try {
      if (fs.existsSync(distAssetPath)) {
        const asset = fs.readFileSync(distAssetPath);
        const ext = path.extname(url);
        const contentType = ext === '.js' ? 'application/javascript' :
                           ext === '.css' ? 'text/css' :
                           ext === '.png' ? 'image/png' :
                           ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
                           ext === '.svg' ? 'image/svg+xml' :
                           'application/octet-stream';
        
        res.setHeader('Content-Type', contentType);
        res.write(asset);
        res.end();
        return { props: {} };
      }
    } catch (error) {
      console.error('Error serving built asset:', error);
    }
  }

  // Serve index.html for all other routes (SPA routing)
  const indexPath = path.join(process.cwd(), '..', 'frontend', 'rudra-growth-platform-main2', 'index.html');
  
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

