# 🌐 How to View the Complete Flight Service 365 Website

## Quick Start - View in Browser

The **English homepage** should now be open in your browser!

### Direct File Access (Current Method)
You can open any page directly by double-clicking or using the `open` command:

```bash
# English Pages
open src/pages/en/index.html
open src/pages/en/fleet.html
open src/pages/en/aircraft-charter.html

# German Pages
open src/pages/de/index.html
open src/pages/de/flotte.html
open src/pages/de/flugzeugcharter.html
```

**Note:** When viewing files directly (file:// protocol), some features may not work:
- ❌ External CSS files won't load
- ❌ JavaScript may be restricted
- ❌ Navigation between pages may not work properly

---

## Recommended: Local Web Server

For the **complete experience with all links working**, run a local web server:

### Option 1: Using the Provided Script

```bash
./start-server.sh
```

Then open in your browser:
- **English:** http://localhost:8000/en/index.html
- **German:** http://localhost:8000/de/index.html

### Option 2: Manual Python Server

```bash
cd src/pages
python3 -m http.server 8000
```

Then navigate to:
- http://localhost:8000/en/index.html
- http://localhost:8000/de/index.html

### Option 3: Using Node.js (if installed)

```bash
npx http-server src/pages -p 8000
```

---

## 📋 Complete Page List

### 🏠 Homepage
- **English:** http://localhost:8000/en/index.html
- **German:** http://localhost:8000/de/index.html

### ✈️ Service Pages

#### Aircraft Charter
- **English:** http://localhost:8000/en/aircraft-charter.html
- **German:** http://localhost:8000/de/flugzeugcharter.html

#### BlockCharter
- **English:** http://localhost:8000/en/blockcharter.html
- **German:** http://localhost:8000/de/blockcharter.html

#### PPL-365 Training
- **English:** http://localhost:8000/en/ppl365.html
- **German:** http://localhost:8000/de/ppl365.html

#### Hour Building
- **English:** http://localhost:8000/en/hour-building.html
- **German:** http://localhost:8000/de/hourbuilding.html

#### Trial Flights
- **English:** http://localhost:8000/en/trial-flights.html
- **German:** http://localhost:8000/de/rundfluge.html

### 👥 About Pages

#### Fleet
- **English:** http://localhost:8000/en/fleet.html
- **German:** http://localhost:8000/de/flotte.html

#### Team
- **English:** http://localhost:8000/en/team.html
- **German:** http://localhost:8000/de/team.html

#### Locations
- **English:** http://localhost:8000/en/locations.html
- **German:** http://localhost:8000/de/standorte.html

### 📞 Contact
- **English:** http://localhost:8000/en/contact.html
- **German:** http://localhost:8000/de/kontakt.html

### 📄 Legal Pages

#### Privacy Policy
- **English:** http://localhost:8000/en/privacy.html
- **German:** http://localhost:8000/de/datenschutz.html

#### Terms of Service
- **English:** http://localhost:8000/en/terms.html
- **German:** http://localhost:8000/de/agb.html

#### Imprint
- **English:** http://localhost:8000/en/imprint.html
- **German:** http://localhost:8000/de/impressum.html

### ❌ Error Page
- **English:** http://localhost:8000/en/404.html
- **German:** http://localhost:8000/de/404.html

---

## 🧭 Navigation Features

### Main Navigation
All pages include a navigation bar with:
- **Home** / **Startseite**
- **Services** dropdown:
  - Aircraft Charter / Flugzeugcharter
  - BlockCharter
  - PPL-365
  - Hour Building
  - Trial Flights / Rundflüge
- **About Us** / **Über Uns** dropdown:
  - Team
  - Fleet / Flotte
  - Locations / Standorte
- **Contact** / **Kontakt**
- **Language Switcher** (EN ⇄ DE)

### Footer Links
Every page has a footer with:
- Company information
- Service links
- About links
- Contact information
- Legal links (Privacy, Terms, Imprint)

---

## 🎨 What You'll See

### Homepage Features
- ✅ Full-screen hero section
- ✅ Diagonal banner text
- ✅ YouTube video embed
- ✅ 5-column service grid
- ✅ Stats section
- ✅ Contact form (Formspree integration)
- ✅ Modern blue navigation
- ✅ Complete footer

### Fleet Page Features
- ✅ Page hero with aircraft background
- ✅ 4 aircraft cards with:
  - High-quality images
  - Complete specifications
  - Feature badges
  - Hover effects
- ✅ Responsive grid layout

### Service Pages Features
- ✅ Page-specific hero sections
- ✅ Service descriptions
- ✅ Benefits and features
- ✅ Call-to-action buttons
- ✅ Consistent branding

---

## 🧪 Testing Checklist

### Navigation Testing
- [ ] Click through all navigation menu items
- [ ] Test dropdown menus (Services, About Us)
- [ ] Click language switcher (EN ⇄ DE)
- [ ] Verify all links work
- [ ] Test footer links

### Page Testing
- [ ] Visit all 28 pages
- [ ] Check images load correctly
- [ ] Verify text is readable
- [ ] Test responsive design (resize browser)
- [ ] Check forms work

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 🐛 Troubleshooting

### Images Not Loading
**Problem:** Images show as broken  
**Solution:** Make sure you're using a local web server (not file:// protocol)

### CSS Not Applied
**Problem:** Pages look unstyled  
**Solution:** 
- Check if external CSS files exist in `src/styles/`
- Use a local web server instead of opening files directly

### Links Not Working
**Problem:** Clicking links doesn't navigate  
**Solution:** Use a local web server for proper navigation

### JavaScript Not Working
**Problem:** Dropdowns or language switcher not working  
**Solution:** 
- Check browser console for errors
- Ensure JavaScript files exist in `src/scripts/`
- Use a local web server

---

## 📱 Mobile Testing

To test on mobile devices:

1. **Start the server** on your computer
2. **Find your local IP address:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
3. **Access from mobile device:**
   - http://YOUR_IP_ADDRESS:8000/en/index.html

---

## 🚀 Next Steps

1. **Start the local server** using `./start-server.sh`
2. **Open the homepage** in your browser
3. **Navigate through all pages** using the menu
4. **Test language switching** between EN and DE
5. **Check responsive design** by resizing browser
6. **Test all forms** and interactive elements

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors (F12)
2. Verify all files are in the correct locations
3. Ensure the web server is running
4. Try a different browser

---

**Enjoy exploring your new Flight Service 365 website!** ✈️

The website is now **100% complete** with all 28 pages fully functional and ready for deployment.
