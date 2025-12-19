/**
 * CrisisTarget - Configuration
 * API keys and settings
 */
'use strict';

var Config = {
  // ============================================
  // API Configuration
  // ============================================
  
  // Set to true to use live GDACS API data
  // NOTE: Requires serving from http:// (not file://) due to CORS
  USE_LIVE_APIS: true,
  
  // API Keys and App Names
  CHARITY_NAV_KEY: 'YOUR_CHARITY_NAVIGATOR_KEY',
  RELIEFWEB_APPNAME: 'AmynHakam-crisistarget-S2EAF',
  
  // API Endpoints
  RELIEFWEB_API: 'https://api.reliefweb.int/v2',
  GDACS_API: 'https://www.gdacs.org/gdacsapi/api',
  CHARITY_NAV_API: 'https://api.charitynavigator.org/v2',
  
  // ============================================
  // Data Settings
  // ============================================
  
  // Cache duration (milliseconds) - 5 minutes
  CACHE_TTL: 5 * 60 * 1000,
  
  // Maximum crises to display per region for "Top" highlighting
  TOP_CRISES_PER_REGION: 10,
  
  // Charity display settings
  MIN_CHARITY_RATING: 3,  // Only show 3+ star charities
  MAX_CHARITIES_PER_CRISIS: 5,
  
  // ============================================
  // Map Settings
  // ============================================
  
  MAP_CENTER: [20, 0],
  MAP_ZOOM: 2,
  MAP_MIN_ZOOM: 2,
  MAP_MAX_ZOOM: 10,
  
  // Tile layer (CartoDB Voyager - English labels)
  TILE_URL: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  TILE_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  
  // Heat layer settings
  HEAT_RADIUS: 35,
  HEAT_BLUR: 20,
  HEAT_MAX_ZOOM: 8,
  HEAT_GRADIENT: {
    0.2: '#FFEB3B',
    0.4: '#FFC107',
    0.6: '#FF9800',
    0.8: '#FF5722',
    1.0: '#F44336'
  },
  
  // ============================================
  // UI Settings
  // ============================================
  
  // Debounce delay for filter changes (ms)
  FILTER_DEBOUNCE: 300,
  
  // Toast notification duration (ms)
  TOAST_DURATION: 5000,
  
  // ============================================
  // Crisis Types
  // ============================================
  
  CRISIS_TYPES: {
    conflict: { label: 'Armed Conflict', icon: '⚔️', color: '#E53935' },
    natural_disaster: { label: 'Natural Disaster', icon: '💧', color: '#FF9800' },
    famine: { label: 'Famine', icon: '🍽️', color: '#795548' },
    disease: { label: 'Disease Outbreak', icon: '🦠', color: '#9C27B0' },
    refugee: { label: 'Refugee Crisis', icon: '🧳', color: '#2196F3' }
  },
  
  // ============================================
  // Urgency Levels
  // ============================================
  
  URGENCY_LEVELS: {
    1: { label: 'Monitoring', color: '#FFEB3B' },
    2: { label: 'Elevated', color: '#FFC107' },
    3: { label: 'High', color: '#FF9800' },
    4: { label: 'Severe', color: '#FF5722' },
    5: { label: 'Critical', color: '#F44336' }
  },
  
  // ============================================
  // Regions
  // ============================================
  
  REGIONS: {
    africa: { label: 'Africa', bounds: [[-35, -20], [37, 55]] },
    asia: { label: 'Asia', bounds: [[-10, 25], [55, 180]] },
    europe: { label: 'Europe', bounds: [[35, -25], [72, 65]] },
    middle_east: { label: 'Middle East', bounds: [[12, 25], [45, 65]] },
    americas: { label: 'Americas', bounds: [[-55, -170], [70, -30]] },
    oceania: { label: 'Oceania', bounds: [[-50, 110], [0, 180]] },
    global: { label: 'Global', bounds: [[-90, -180], [90, 180]] }
  }
};
