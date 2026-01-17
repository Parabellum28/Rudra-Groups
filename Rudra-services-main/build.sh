#!/bin/bash
set -e

# Find frontend directory (try different possible paths)
if [ -d "frontend/rudra-growth-platform-main2" ]; then
  FRONTEND_DIR="frontend/rudra-growth-platform-main2"
elif [ -d "Rudra-services-main/frontend/rudra-growth-platform-main2" ]; then
  FRONTEND_DIR="Rudra-services-main/frontend/rudra-growth-platform-main2"
else
  echo "Error: Frontend directory not found"
  exit 1
fi

# Find backend directory (try different possible paths)
if [ -d "rudra_backend" ]; then
  BACKEND_DIR="rudra_backend"
elif [ -d "Rudra-services-main/rudra_backend" ]; then
  BACKEND_DIR="Rudra-services-main/rudra_backend"
else
  echo "Error: Backend directory not found"
  exit 1
fi

# Store the root directory
ROOT_DIR=$(pwd)

echo "Building frontend from: $FRONTEND_DIR"
cd "$ROOT_DIR/$FRONTEND_DIR"
npm install --legacy-peer-deps
npm run build

echo "Copying frontend build to backend public folder"
cd "$ROOT_DIR"
mkdir -p "$BACKEND_DIR/public"
# Remove old files if they exist
rm -rf "$BACKEND_DIR/public"/*

# Copy all files from dist to public, handling hidden files
if [ -d "$FRONTEND_DIR/dist" ]; then
  # Try copying with dot files first
  if ! cp -r "$FRONTEND_DIR/dist"/. "$BACKEND_DIR/public/" 2>/dev/null; then
    # Fallback to copying without dot
    cp -r "$FRONTEND_DIR/dist"/* "$BACKEND_DIR/public/" 2>/dev/null || true
  fi
  
  # Verify index.html was copied
  if [ ! -f "$BACKEND_DIR/public/index.html" ]; then
    echo "ERROR: index.html was not copied to public folder!"
    echo "Dist directory contents:"
    ls -la "$FRONTEND_DIR/dist" || true
    echo "Public directory contents:"
    ls -la "$BACKEND_DIR/public" || true
    exit 1
  fi
  
  # Verify assets directory was copied
  if [ ! -d "$BACKEND_DIR/public/assets" ]; then
    echo "ERROR: assets directory was not copied to public folder!"
    exit 1
  fi
  
  # Count files to verify copy was successful
  DIST_FILE_COUNT=$(find "$FRONTEND_DIR/dist" -type f | wc -l)
  PUBLIC_FILE_COUNT=$(find "$BACKEND_DIR/public" -type f | wc -l)
  
  echo "✓ Frontend files copied successfully"
  echo "✓ index.html found at: $BACKEND_DIR/public/index.html"
  echo "✓ Assets directory found at: $BACKEND_DIR/public/assets"
  echo "✓ Files copied: $PUBLIC_FILE_COUNT files (dist had $DIST_FILE_COUNT files)"
else
  echo "ERROR: Frontend dist directory not found at: $FRONTEND_DIR/dist"
  exit 1
fi

echo "Building backend from: $BACKEND_DIR"
cd "$ROOT_DIR/$BACKEND_DIR"
npm install --legacy-peer-deps
npm run build

echo "Build completed successfully!"

