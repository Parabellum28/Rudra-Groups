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
npm install
npm run build

echo "Copying frontend build to backend public folder"
cd "$ROOT_DIR"
mkdir -p "$BACKEND_DIR/public"
# Copy all files from dist to public, handling hidden files
cp -r "$FRONTEND_DIR/dist"/. "$BACKEND_DIR/public/" 2>/dev/null || cp -r "$FRONTEND_DIR/dist"/* "$BACKEND_DIR/public/"

echo "Building backend from: $BACKEND_DIR"
cd "$ROOT_DIR/$BACKEND_DIR"
npm install
npm run build

echo "Build completed successfully!"

