# 🚀 Coolify VPS Deployment Guide

## Prerequisites

✅ Coolify installed on your VPS  
✅ Domain name (e.g., flightservice365.com)  
✅ Private GitHub repository  
✅ SSH access to your VPS  

---

## Step 1: Prepare Your VPS

### Install Coolify (if not already installed)

```bash
curl -fsSL https://get.coolify.io | bash
```

Access Coolify at: `http://your-vps-ip:8000`

---

## Step 2: Make Repository Private

1. Go to: https://github.com/Deckenmarc/fligthservice365/settings
2. Scroll to "Danger Zone"
3. Click "Change visibility" → "Make private"
4. Confirm

---

## Step 3: Set Up in Coolify

### 3.1 Create New Project

1. Log into Coolify dashboard
2. Click "New Project"
3. Name: `Flight Service 365`

### 3.2 Add Application

1. Click "New Resource" → "Application"
2. Choose "Docker Compose" or "Dockerfile"
3. Select "GitHub" as source

### 3.3 Connect GitHub Repository

1. Click "Connect GitHub"
2. Authorize Coolify
3. Select repository: `Deckenmarc/fligthservice365`
4. Branch: `main`

### 3.4 Configure Build

**Build Method:** Dockerfile  
**Dockerfile Path:** `./Dockerfile`  
**Port:** 80  
**Health Check:** Enabled  

### 3.5 Set Environment Variables (if needed)

```env
NODE_ENV=production
```

### 3.6 Configure Domain

1. In Coolify, go to "Domains"
2. Add your domain: `flightservice365.com`
3. Add www subdomain: `www.flightservice365.com`
4. Enable "Force HTTPS"
5. Enable "Auto SSL" (Let's Encrypt)

---

## Step 4: DNS Configuration

Point your domain to your VPS:

### A Records
```
Type: A
Name: @
Value: YOUR_VPS_IP
TTL: 3600
```

```
Type: A
Name: www
Value: YOUR_VPS_IP
TTL: 3600
```

### Wait 5-60 minutes for DNS propagation

---

## Step 5: Deploy

1. In Coolify, click "Deploy"
2. Watch the build logs
3. Wait for "Deployment successful"
4. Access your site at: `https://flightservice365.com`

---

## Step 6: Set Up Auto-Deploy

### Enable Webhook

1. In Coolify, go to "Settings" → "Webhooks"
2. Copy the webhook URL
3. Go to GitHub: https://github.com/Deckenmarc/fligthservice365/settings/hooks
4. Click "Add webhook"
5. Paste Coolify webhook URL
6. Content type: `application/json`
7. Events: "Just the push event"
8. Click "Add webhook"

**Now every push to main branch auto-deploys!**

---

## Step 7: Verify Deployment

### Check These URLs:

✅ `https://flightservice365.com` → Redirects to English homepage  
✅ `https://flightservice365.com/en/index.html` → English homepage  
✅ `https://flightservice365.com/de/index.html` → German homepage  
✅ `https://flightservice365.com/en/fleet.html` → Fleet page  
✅ `https://www.flightservice365.com` → Works with www  

### Check SSL:

✅ Green padlock in browser  
✅ Certificate valid  
✅ HTTPS enforced  

---

## Workflow After Setup

### Making Updates

```bash
# Make changes locally
git add .
git commit -m "Update website"
git push

# Coolify automatically:
# 1. Detects push via webhook
# 2. Pulls latest code
# 3. Builds Docker image
# 4. Deploys new version
# 5. Site updated in 1-2 minutes!
```

---

## Troubleshooting

### Build Fails

**Check Coolify logs:**
1. Go to deployment in Coolify
2. Click "Logs"
3. Look for errors

**Common issues:**
- Dockerfile syntax error
- Missing files
- Port conflicts

**Solution:**
```bash
# Test build locally first
docker build -t flightservice365-test .
docker run -p 8080:80 flightservice365-test
# Visit http://localhost:8080
```

### Site Not Accessible

**Check DNS:**
```bash
dig flightservice365.com
# Should show your VPS IP
```

**Check Coolify:**
1. Verify deployment status is "Running"
2. Check container logs
3. Verify port 80 is exposed

### SSL Issues

**In Coolify:**
1. Go to "Domains"
2. Click "Regenerate SSL"
3. Wait 2-3 minutes

---

## Monitoring

### Coolify Dashboard

Monitor:
- ✅ Deployment status
- ✅ Container health
- ✅ Resource usage (CPU, RAM)
- ✅ Logs
- ✅ SSL certificate expiry

### Set Up Alerts

1. In Coolify, go to "Notifications"
2. Add email or Slack webhook
3. Enable alerts for:
   - Deployment failures
   - Container crashes
   - High resource usage

---

## Backup Strategy

### Automatic Backups

Coolify can backup:
- Container volumes
- Database (if added later)
- Configuration

**Enable in:** Coolify → Settings → Backups

### Manual Backup

```bash
# Backup website files
docker exec coolify-flightservice365 tar -czf /tmp/backup.tar.gz /usr/share/nginx/html
docker cp coolify-flightservice365:/tmp/backup.tar.gz ./backup-$(date +%Y%m%d).tar.gz
```

---

## Scaling (Future)

### Add More Resources

If traffic increases:

1. **Vertical Scaling:**
   - Upgrade VPS (more CPU/RAM)
   - Restart Coolify

2. **Horizontal Scaling:**
   - Add load balancer
   - Deploy to multiple servers
   - Use Coolify's clustering

3. **CDN:**
   - Add Cloudflare
   - Cache static assets
   - DDoS protection

---

## Cost Comparison

### GitHub Pages (Current)
- **Cost:** $0/month
- **Limitations:** Public repo only

### Coolify VPS (Production)
- **VPS:** $5-20/month (Hetzner, DigitalOcean, etc.)
- **Domain:** $10-15/year
- **SSL:** Free (Let's Encrypt)
- **Total:** ~$5-20/month

**Benefits:**
- ✅ Private repository
- ✅ Full control
- ✅ Can add backend/database
- ✅ Custom configurations
- ✅ Better performance

---

## Security Best Practices

### 1. Keep System Updated

```bash
# On your VPS
apt update && apt upgrade -y
```

### 2. Firewall Rules

```bash
# Allow only necessary ports
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw enable
```

### 3. Regular Backups

- Enable automatic backups in Coolify
- Store backups off-site
- Test restore process

### 4. Monitor Logs

- Check Coolify logs regularly
- Set up log alerts
- Monitor for suspicious activity

---

## Support

### Coolify Documentation
https://coolify.io/docs

### Community
- Discord: https://coolify.io/discord
- GitHub: https://github.com/coollabsio/coolify

### Your VPS Provider
- Hetzner: https://docs.hetzner.com
- DigitalOcean: https://docs.digitalocean.com

---

## Summary

### Current Setup (Phase 1)
✅ GitHub Pages (public repo)  
✅ Free hosting  
✅ Good for testing  

### Future Setup (Phase 2)
✅ Coolify VPS (private repo)  
✅ Your own server  
✅ Production ready  
✅ Full control  

**Both setups are configured and ready!**

---

**When you're ready to switch to Coolify, just follow this guide!** 🚀

All configuration files are already in your repository:
- ✅ Dockerfile
- ✅ nginx.conf
- ✅ docker-compose.yml (if needed)

Just deploy in Coolify and you're live!
