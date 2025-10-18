#!/bin/bash

# Flight Service 365 - Local Development Server
# This script starts a local web server to view the complete website

echo "🚀 Starting Flight Service 365 Website..."
echo ""
echo "📍 Server will be available at:"
echo "   English: http://localhost:8000/en/index.html"
echo "   German:  http://localhost:8000/de/index.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start Python HTTP server from src/pages directory
cd src/pages
python3 -m http.server 8000
