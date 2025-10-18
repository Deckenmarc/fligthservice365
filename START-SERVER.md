# How to View Your Website Locally

## Option 1: Using Python HTTP Server (Recommended)

Open your terminal and run:

```bash
cd dist
python3 -m http.server 8000
```

Then open your browser and go to:
- **English:** http://localhost:8000/src/pages/en/index.html
- **German:** http://localhost:8000/src/pages/de/index.html

## Option 2: Using Vite Dev Server

In your terminal, run:

```bash
npm run dev
```

Then open your browser and go to:
- **English:** http://localhost:5173/src/pages/en/index.html
- **German:** http://localhost:5173/src/pages/de/index.html

## Option 3: Open HTML Files Directly

You can also open the HTML files directly in your browser:
1. Navigate to the `dist/src/pages/en/` or `dist/src/pages/de/` folder
2. Double-click on `index.html`

Note: Some features like forms may not work when opening files directly due to browser security restrictions.

## Current Issue

The build output has pages nested in `dist/src/pages/` instead of at the root. This is fine for viewing locally, but for production deployment, you may want to adjust the Vite configuration to output files at the root level.
