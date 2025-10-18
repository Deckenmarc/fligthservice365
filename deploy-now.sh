#!/bin/bash

echo "🚀 Flight Service 365 - GitHub Pages Deployment"
echo "================================================"
echo ""
echo "Your code is ready to deploy!"
echo ""
echo "📋 What you need:"
echo "1. A GitHub account (free at https://github.com/signup)"
echo "2. A new repository created on GitHub"
echo ""
echo "Let's get started!"
echo ""

# Ask for GitHub username
read -p "Enter your GitHub username: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ No username provided. Exiting."
    exit 1
fi

# Ask for repository name
read -p "Enter repository name (default: flightservice365): " REPO_NAME
REPO_NAME=${REPO_NAME:-flightservice365}

echo ""
echo "📍 Your repository URL will be:"
echo "   https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
read -p "Is this correct? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "❌ Cancelled. Run the script again."
    exit 1
fi

echo ""
echo "🔗 Adding GitHub remote..."
git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git" 2>/dev/null || {
    echo "⚠️  Remote already exists. Updating..."
    git remote set-url origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
}

echo "✅ Remote configured"
echo ""

echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Code pushed to GitHub!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to: https://github.com/$GITHUB_USER/$REPO_NAME"
    echo "2. Click 'Settings' → 'Pages'"
    echo "3. Under 'Source', select 'main' branch and '/ (root)' folder"
    echo "4. Click 'Save'"
    echo "5. Wait 2-3 minutes"
    echo ""
    echo "🌐 Your site will be live at:"
    echo "   https://$GITHUB_USER.github.io/$REPO_NAME/src/pages/en/index.html"
    echo ""
    echo "✅ Done!"
else
    echo ""
    echo "❌ Push failed. Possible reasons:"
    echo "1. Repository doesn't exist on GitHub yet"
    echo "2. Wrong username or repository name"
    echo "3. Need to authenticate with GitHub"
    echo ""
    echo "📋 Manual steps:"
    echo "1. Create repository on GitHub: https://github.com/new"
    echo "2. Run: git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git"
    echo "3. Run: git push -u origin main"
fi
