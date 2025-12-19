# CrisisTarget 🎯

An interactive world map visualizing global humanitarian crises and connecting donors with verified charities providing relief.

![CrisisTarget Preview](assets/images/preview.png)

## Features

- 🗺️ **Interactive World Map** - Explore crises on a fully interactive Leaflet map with zoom and pan controls
- 🔥 **Heat Map Visualization** - See urgency hotspots with color-coded heat layer (yellow to red)
- 🏷️ **Crisis Markers** - Type-specific icons show crisis location and urgency level
- ⭐ **Top 10 Highlighting** - Most urgent crises in each region are highlighted
- 🔍 **Smart Filtering** - Filter by crisis type, region, and urgency level
- 💝 **Verified Charities** - Only 3+ star rated charities are shown
- 📱 **Mobile Responsive** - Works on desktop and mobile devices
- 🔄 **Manual Refresh** - Update data with the refresh button

## Getting Started

### Quick Start

1. Clone or download this repository
2. Open `index.html` directly in your browser
3. Explore the map!

No build process or server required - it's a static site that works right out of the box.

### Project Structure

```
/CrisisTarget
├── index.html          # Main HTML file
├── README.md           # This file
├── AGENTS.md           # Project conventions
├── PRODUCT-REQUIREMENTS.md
├── IMPLEMENTATION-PLAN.md
├── /css
│   ├── styles.css      # Global styles
│   ├── map.css         # Map & marker styles
│   ├── filters.css     # Filter panel styles
│   └── modal.css       # Modal popup styles
├── /js
│   ├── config.js       # Configuration & settings
│   ├── utils.js        # Utility functions
│   ├── crisisData.js   # Crisis data management
│   ├── charityData.js  # Charity data management
│   ├── map.js          # Leaflet map module
│   ├── modal.js        # Modal popup module
│   ├── filters.js      # Filter functionality
│   └── app.js          # Main application
├── /data
│   ├── crises.json     # Crisis mock data
│   └── charities.json  # Charity mock data
└── /assets
    ├── /icons
    └── /images
```

## Usage

### Exploring Crises

- **Pan & Zoom** - Click and drag to pan, scroll to zoom
- **Click Markers** - Click any crisis marker to see details
- **Hover** - Hover over markers for quick info

### Filtering

Use the filter panel on the left to narrow down crises:

- **Crisis Type** - Toggle checkboxes to show/hide crisis types
- **Region** - Select specific regions
- **Urgency** - Use the slider to filter by urgency level
- **Reset** - Click "Reset All" to clear filters

### Understanding the Map

**Urgency Levels:**
| Level | Color | Meaning |
|-------|-------|---------|
| 1 | 🟡 Yellow | Monitoring |
| 2 | 🟠 Amber | Elevated |
| 3 | 🟠 Orange | High |
| 4 | 🔴 Deep Orange | Severe |
| 5 | 🔴 Red | Critical |

**Crisis Types:**
- ⚔️ Armed Conflict
- 🌪️ Natural Disaster
- 🍽️ Famine
- 🦠 Disease Outbreak
- 🏃 Refugee Crisis

## Data Sources

Currently using mock data. The app is designed to integrate with:

- **ReliefWeb API** - UN humanitarian information
- **GDACS** - Global Disaster Alert and Coordination System
- **Charity Navigator API** - Charity ratings and information

To enable live APIs, update `js/config.js`:
```javascript
Config.USE_LIVE_APIS = true;
Config.CHARITY_NAV_KEY = 'your-api-key';
```

## Technologies

- **HTML5 / CSS3 / JavaScript (ES5+)**
- **Leaflet.js** - Interactive maps
- **Leaflet.heat** - Heat map layer
- No build tools required

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## Deployment

This is a static site that can be hosted anywhere:

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Your site is live at `https://username.github.io/crisistarget`

### Other Hosting
Simply upload all files to any web host (Netlify, Vercel, AWS S3, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please follow the conventions in [AGENTS.md](AGENTS.md).

## License

MIT License - See LICENSE file for details.

## Acknowledgments

- Map tiles by [OpenStreetMap](https://www.openstreetmap.org/)
- Crisis data inspired by [ReliefWeb](https://reliefweb.int/)
- Charity ratings concept from [Charity Navigator](https://www.charitynavigator.org/)

---

**CrisisTarget - Built with ❤️ to help raise awareness for humanitarian crises worldwide**
