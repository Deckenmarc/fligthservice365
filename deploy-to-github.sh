#!/bin/bash

echo "🚀 Flight Service 365 - GitHub Pages Deployment"
echo "================================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
    echo ""
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
if [ -z "$CURRENT_BRANCH" ]; then
    echo "📝 Creating main branch..."
    git checkout -b main
fi

echo "📋 Current Status:"
git status --short
echo ""

# Add all files
echo "📦 Adding files to Git..."
git add .
echo "✅ Files added"
echo ""

# Commit
echo "💾 Creating commit..."
read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Complete website redesign - 28 pages ready for deployment"
fi
git commit -m "$COMMIT_MSG"
echo "✅ Commit created"
echo ""

# Check if remote exists
if ! git remote | grep -q origin; then
    echo "🔗 Setting up GitHub remote..."
    echo ""
    echo "Please enter your GitHub repository URL:"
    echo "Example: https://github.com/username/flightservice365.git"
    read -p "Repository URL: " REPO_URL
    
    if [ -n "$REPO_URL" ]; then
        git remote add origin "$REPO_URL"
        echo "✅ Remote added"
    else
        echo "❌ No repository URL provided"
        exit 1
    fi
fi

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main
echo ""

echo "✅ Deployment Complete!"
echo ""
echo "📍 Next Steps:"
echo "1. Go to your GitHub repository"
echo "2. Click 'Settings' → 'Pages'"
echo "3. Under 'Source', select 'main' branch"
echo "4. Select '/src/pages' as the folder (or root if that doesn't work)"
echo "5. Click 'Save'"
echo "6. Wait 2-3 minutes for deployment"
echo "7. Your site will be live at: https://username.github.io/repository-name/"
echo ""
echo "🎉 Done!"
