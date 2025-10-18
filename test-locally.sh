#!/bin/bash

echo "🚀 Starting Flight Service 365 Local Test Server..."
echo ""
echo "📍 Access the website at:"
echo "   English: http://localhost:8000/en/index.html"
echo "   German:  http://localhost:8000/de/index.html"
echo ""
echo "🧪 Test Checklist:"
echo "   [ ] Homepage loads correctly"
echo "   [ ] Navigation menus work"
echo "   [ ] Language switcher works"
echo "   [ ] All service pages load"
echo "   [ ] Fleet page shows all aircraft"
echo "   [ ] Forms are functional"
echo "   [ ] Footer links work"
echo "   [ ] Responsive design (resize browser)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd src/pages
python3 -m http.server 8000
