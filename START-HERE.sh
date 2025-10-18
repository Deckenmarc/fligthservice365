#!/bin/bash

echo "🚀 Flight Service 365 - Starting Web Server..."
echo ""
echo "⚠️  IMPORTANT: You MUST use a web server to view the site correctly!"
echo ""
echo "Opening browser in 3 seconds..."
echo ""

# Start server in background
cd src/pages
python3 -m http.server 8000 > /dev/null 2>&1 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Open browser
open "http://localhost:8000/en/index.html"

echo "✅ Server started!"
echo ""
echo "📍 Access the website at:"
echo "   English: http://localhost:8000/en/index.html"
echo "   German:  http://localhost:8000/de/index.html"
echo ""
echo "🔗 All links and images will now work correctly!"
echo ""
echo "To stop the server, run: kill $SERVER_PID"
echo "Or press Ctrl+C and run: pkill -f 'python3 -m http.server'"
echo ""
