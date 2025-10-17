# Deployment Guide

This document provides comprehensive instructions for deploying the Flight Service 365 website to various hosting platforms.

## Table of Contents

1. [GitHub Pages Deployment](#github-pages-deployment)
2. [Docker/VPS Deployment](#dockervps-deployment)
3. [Coolify Deployment](#coolify-deployment)
4. [Updating Content](#updating-content)
5. [Troubleshooting](#troubleshooting)

---

## GitHub Pages Deployment

GitHub Pages provides free static site hosting with automatic deployments via GitHub Actions.

### Prerequisites

- GitHub account
- Repository with the website code
- Node.js 20+ installed locally for testing

### Initial Setup

1. **Enable GitHub Pages in Repository Settings**
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**
   - Save the settings

2. **Configure the Workflow**
   
   The GitHub Actions workflow is already configured in `.github/workflows/deploy.yml`. It will:
   - Trigger on every push to the `main` branch
   - Install dependencies using `npm ci`
   - Build the site using `npm run build`
   - Deploy the `dist` folder to GitHub Pages

3. **Verify the Workflow**
   
   After pushing to the `main` branch:
   - Go to the **Actions** tab in your repository
   - You should see the "Deploy to GitHub Pages" workflow running
   - Wait for it to complete (usually 2-3 minutes)

4. **Access Your Site**
   
   Once deployed, your site will be available at:
   ```
   https://<username>.github.io/<repository-name>/
   ```

### Automatic Deployment Process

Every time you push to the `main` branch:

1. GitHub Actions automatically triggers the workflow
2. Dependencies are installed
3. The site is built
4. The `dist` folder is deployed to GitHub Pages
5. Your site is updated within minutes

### Custom Domain Setup (Optional)

1. In repository **Settings** > **Pages**:
   - Enter your custom domain (e.g., `www.flightservice365.com`)
   - Add a CNAME record in your DNS settings pointing to `<username>.github.io`
   - Enable "Enforce HTTPS"

2. DNS Configuration:
   ```
   Type: CNAME
   Name: www
   Value: <username>.github.io
   ```

### 404 Page Configuration

GitHub Pages automatically serves custom 404 pages. The site includes bilingual 404 pages:
- German: `src/pages/de/404.html`
- English: `src/pages/en/404.html`

These pages will be automatically served when a user navigates to a non-existent page. The 404 pages include:
- Full header and footer for consistent navigation
- Language switcher to try the other language
- Links to popular pages
- Friendly error message

---

## Docker/VPS Deployment

Deploy the website using Docker on any VPS (Virtual Private Server) or cloud provider.

### Prerequisites

- VPS with Docker and Docker Compose installed
- SSH access to the server
- Domain name (optional but recommended)

### Installation Steps

1. **Install Docker on Your VPS**

   For Ubuntu/Debian:
   ```bash
   # Update package index
   sudo apt update
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   # Install Docker Compose
   sudo apt install docker-compose-plugin
   
   # Add your user to docker group
   sudo usermod -aG docker $USER
   ```

2. **Clone the Repository**
   ```bash
   git clone https://github.com/<username>/<repository>.git
   cd <repository>
   ```

3. **Build and Run with Docker Compose**
   ```bash
   # Build the Docker image
   docker-compose build
   
   # Start the container
   docker-compose up -d
   ```

4. **Verify the Deployment**
   ```bash
   # Check if container is running
   docker-compose ps
   
   # View logs
   docker-compose logs -f web
   ```

5. **Access Your Site**
   
   The site will be available at:
   ```
   http://<your-server-ip>:8080
   ```

### Production Configuration

For production, you'll want to:

1. **Use a Reverse Proxy (Nginx or Caddy)**
   
   Install Nginx on the host:
   ```bash
   sudo apt install nginx
   ```

   Create a configuration file `/etc/nginx/sites-available/flightservice365`:
   ```nginx
   server {
       listen 80;
       server_name flightservice365.com www.flightservice365.com;
       
       location / {
           proxy_pass http://localhost:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
       
       # Custom 404 error pages
       error_page 404 /404.html;
   }
   ```

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/flightservice365 /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

2. **Enable HTTPS with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d flightservice365.com -d www.flightservice365.com
   ```

### Updating the Deployment

To update the site with new changes:

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

---

## Coolify Deployment

Coolify is a self-hosted platform that simplifies Docker deployments with a user-friendly interface.

### Prerequisites

- Coolify installed on your server
- Access to Coolify dashboard
- Git repository URL

### Deployment Steps

1. **Log in to Coolify Dashboard**
   
   Access your Coolify instance at `https://<your-coolify-domain>`

2. **Create a New Application**
   
   - Click **"+ New Resource"**
   - Select **"Application"**
   - Choose **"Public Repository"** or connect your GitHub account

3. **Configure the Application**
   
   - **Repository URL**: `https://github.com/<username>/<repository>.git`
   - **Branch**: `main`
   - **Build Pack**: Select **"Dockerfile"**
   - **Port**: `80`
   - **Domain**: Enter your domain (e.g., `flightservice365.com`)

4. **Environment Variables** (if needed)
   
   Add any environment variables in the "Environment Variables" section:
   ```
   NODE_ENV=production
   ```

5. **Deploy**
   
   - Click **"Deploy"**
   - Coolify will:
     - Clone the repository
     - Build the Docker image
     - Start the container
     - Configure SSL automatically (if domain is configured)

6. **Monitor Deployment**
   
   - View build logs in real-time
   - Check deployment status
   - Access your site once deployment is complete

### Automatic Deployments

Enable automatic deployments on git push:

1. In your application settings, enable **"Auto Deploy"**
2. Coolify will automatically deploy when you push to the `main` branch
3. Webhooks are automatically configured

### Domain Configuration

1. In Coolify, add your domain under **"Domains"**
2. Update your DNS records:
   ```
   Type: A
   Name: @
   Value: <your-server-ip>
   
   Type: A
   Name: www
   Value: <your-server-ip>
   ```
3. Coolify will automatically provision SSL certificates

---

## Updating Content

### Updating Text Content

1. **Edit HTML Files**
   
   Content is located in:
   - German pages: `src/pages/de/`
   - English pages: `src/pages/en/`

2. **Update Translations**
   
   Bilingual content is stored in `src/assets/data/content.json`

3. **Test Locally**
   ```bash
   npm run dev
   ```

4. **Deploy Changes**
   
   Commit and push to trigger automatic deployment:
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

### Adding New Images

1. Place images in appropriate directories:
   - Team photos: `src/assets/images/team/`
   - Fleet photos: `src/assets/images/fleet/`
   - Service images: `src/assets/images/services/`

2. Optimize images before adding:
   ```bash
   npm run optimize-images
   ```

3. Reference images in HTML using the responsive image template

### Updating Styles

1. Edit CSS files in `src/styles/`
2. Test changes locally
3. Commit and push to deploy

---

## Troubleshooting

### GitHub Pages Issues

**Problem**: Workflow fails with "Permission denied"

**Solution**:
- Go to **Settings** > **Actions** > **General**
- Under "Workflow permissions", select **"Read and write permissions"**
- Save and re-run the workflow

**Problem**: Site shows 404 after deployment

**Solution**:
- Verify the `dist` folder is being generated correctly
- Check that `index.html` exists in the `dist` folder
- Ensure the base path in `vite.config.js` matches your repository name

**Problem**: CSS/JS files not loading

**Solution**:
- Check asset paths in HTML files
- Verify `base` configuration in `vite.config.js`:
  ```javascript
  export default {
    base: '/<repository-name>/'
  }
  ```

### Docker Deployment Issues

**Problem**: Container fails to start

**Solution**:
```bash
# Check logs
docker-compose logs web

# Rebuild without cache
docker-compose build --no-cache

# Restart container
docker-compose restart web
```

**Problem**: Port 8080 already in use

**Solution**:
- Change the port mapping in `docker-compose.yml`:
  ```yaml
  ports:
    - "8081:80"  # Use a different port
  ```

**Problem**: Build fails during npm install

**Solution**:
- Ensure `package-lock.json` is committed
- Try building locally first to verify dependencies
- Check Node.js version in Dockerfile matches your local version

### Coolify Issues

**Problem**: Build fails in Coolify

**Solution**:
- Check build logs in Coolify dashboard
- Verify Dockerfile is in repository root
- Ensure all dependencies are in `package.json`

**Problem**: Domain not accessible

**Solution**:
- Verify DNS records are correctly configured
- Wait for DNS propagation (can take up to 48 hours)
- Check that port 80 and 443 are open on your server:
  ```bash
  sudo ufw allow 80
  sudo ufw allow 443
  ```

**Problem**: SSL certificate not provisioning

**Solution**:
- Ensure domain points to correct IP
- Check Coolify logs for certificate errors
- Manually trigger certificate renewal in Coolify

### General Issues

**Problem**: Images not displaying

**Solution**:
- Verify image paths are correct
- Check that images exist in `src/assets/images/`
- Ensure images are being copied to `dist` during build

**Problem**: Forms not submitting

**Solution**:
- Check Netlify Functions are deployed (if using Netlify)
- Verify form action URLs are correct
- Check browser console for JavaScript errors

**Problem**: Language switching not working

**Solution**:
- Verify `language-switcher.js` is loaded
- Check that corresponding pages exist in both languages
- Ensure URL mapping in `language-switcher.js` is correct

**Problem**: 404 pages not displaying correctly

**Solution**:
- Verify 404.html files exist in both `/de/` and `/en/` directories
- For GitHub Pages: Custom 404 pages are automatically served
- For Nginx: Check that `error_page` directive is configured in nginx.conf
- Test by navigating to a non-existent page (e.g., `/de/nonexistent.html`)
- Ensure 404 pages include proper navigation and language switcher

---

## Support

For additional help:

- Check the [README.md](README.md) for project overview
- Review build logs for specific error messages
- Ensure all prerequisites are met for your chosen deployment method

---

## Quick Reference

### Common Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Docker commands
docker-compose up -d          # Start containers
docker-compose down           # Stop containers
docker-compose logs -f web    # View logs
docker-compose restart web    # Restart container

# Git deployment
git add .
git commit -m "Your message"
git push origin main
```

### Important Files

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `Dockerfile` - Docker build configuration
- `docker-compose.yml` - Docker Compose configuration
- `nginx.conf` - Nginx server configuration
- `vite.config.js` - Build configuration
