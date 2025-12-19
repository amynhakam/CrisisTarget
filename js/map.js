/**
 * Crisis Map - Map Module
 * Handles Leaflet map initialization, markers, and heat layer
 */
'use strict';

var CrisisMap = (function() {
  var map = null;
  var markersLayer = null;
  var heatLayer = null;
  var markers = {};
  
  /**
   * Initialize the Leaflet map
   */
  function init() {
    // Create map instance
    map = L.map('crisis-map', {
      center: Config.MAP_CENTER,
      zoom: Config.MAP_ZOOM,
      minZoom: Config.MAP_MIN_ZOOM,
      maxZoom: Config.MAP_MAX_ZOOM,
      worldCopyJump: true,
      zoomControl: true
    });
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer(Config.TILE_URL, {
      attribution: Config.TILE_ATTRIBUTION,
      maxZoom: 19
    }).addTo(map);
    
    // Create layer group for markers
    markersLayer = L.layerGroup().addTo(map);
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (map) {
        map.invalidateSize();
      }
    });
    
    return map;
  }
  
  /**
   * Get the map instance
   */
  function getMap() {
    return map;
  }
  
  /**
   * Add heat layer to map
   */
  function addHeatLayer(crises) {
    // Remove existing heat layer if present
    if (heatLayer && map.hasLayer(heatLayer)) {
      map.removeLayer(heatLayer);
    }
    
    // Create heat data array: [lat, lng, intensity]
    var heatData = crises.map(function(crisis) {
      return [
        crisis.coordinates.lat,
        crisis.coordinates.lng,
        crisis.urgencyLevel / 5  // Normalize to 0-1
      ];
    });
    
    // Create and add heat layer
    heatLayer = L.heatLayer(heatData, {
      radius: Config.HEAT_RADIUS,
      blur: Config.HEAT_BLUR,
      maxZoom: Config.HEAT_MAX_ZOOM,
      gradient: Config.HEAT_GRADIENT
    });
    
    heatLayer.addTo(map);
    
    return heatLayer;
  }
  
  /**
   * Create a marker for a crisis
   */
  function createMarker(crisis, isTopCrisis) {
    var typeInfo = Utils.getCrisisTypeInfo(crisis.type);
    
    // Build marker HTML
    var markerClasses = [
      'crisis-marker',
      'crisis-' + crisis.type,
      'urgency-' + crisis.urgencyLevel
    ];
    
    if (isTopCrisis) {
      markerClasses.push('top-crisis');
    }
    
    var iconHtml = '<span class="' + markerClasses.join(' ') + '">' + 
                   typeInfo.icon + '</span>';
    
    // Create custom icon
    var icon = L.divIcon({
      className: 'crisis-marker-container',
      html: iconHtml,
      iconSize: isTopCrisis ? [44, 44] : [36, 36],
      iconAnchor: isTopCrisis ? [22, 22] : [18, 18]
    });
    
    // Create marker
    var marker = L.marker(
      [crisis.coordinates.lat, crisis.coordinates.lng],
      { icon: icon }
    );
    
    // Add click handler
    marker.on('click', function() {
      Modal.open(crisis);
    });
    
    // Add tooltip on hover
    var tooltipContent = '<div class="crisis-popup">' +
      '<div class="crisis-popup__title">' + crisis.name + '</div>' +
      '<div class="crisis-popup__meta">' +
        '<span>' + typeInfo.icon + ' ' + typeInfo.label + '</span>' +
        '<span>Urgency: ' + crisis.urgencyLevel + '/5</span>' +
      '</div>' +
      '<div class="crisis-popup__action">Click for details</div>' +
    '</div>';
    
    marker.bindTooltip(tooltipContent, {
      direction: 'top',
      offset: [0, -20],
      className: 'crisis-tooltip'
    });
    
    return marker;
  }
  
  /**
   * Add markers for all crises
   */
  function addMarkers(crises, topCrisisIds) {
    // Clear existing markers
    clearMarkers();
    
    topCrisisIds = topCrisisIds || [];
    
    // Add new markers
    crises.forEach(function(crisis) {
      var isTop = topCrisisIds.indexOf(crisis.id) !== -1;
      var marker = createMarker(crisis, isTop);
      marker.addTo(markersLayer);
      markers[crisis.id] = marker;
    });
  }
  
  /**
   * Clear all markers from map
   */
  function clearMarkers() {
    if (markersLayer) {
      markersLayer.clearLayers();
    }
    markers = {};
  }
  
  /**
   * Update markers based on filtered crises
   */
  function updateMarkers(crises, topCrisisIds) {
    addMarkers(crises, topCrisisIds);
    updateHeatLayer(crises);
  }
  
  /**
   * Update heat layer with new data
   */
  function updateHeatLayer(crises) {
    if (!heatLayer) {
      addHeatLayer(crises);
      return;
    }
    
    // Update heat layer data
    var heatData = crises.map(function(crisis) {
      return [
        crisis.coordinates.lat,
        crisis.coordinates.lng,
        crisis.urgencyLevel / 5
      ];
    });
    
    heatLayer.setLatLngs(heatData);
  }
  
  /**
   * Fly to a specific region
   */
  function flyToRegion(regionKey) {
    var regionInfo = Utils.getRegionInfo(regionKey);
    if (regionInfo && regionInfo.bounds) {
      map.flyToBounds(regionInfo.bounds, {
        padding: [50, 50],
        maxZoom: 5
      });
    }
  }
  
  /**
   * Reset map to world view
   */
  function resetView() {
    if (map) {
      map.flyTo(Config.MAP_CENTER, Config.MAP_ZOOM);
    }
  }
  
  /**
   * Invalidate map size (call after container resize)
   */
  function invalidateSize() {
    if (map) {
      map.invalidateSize();
    }
  }
  
  // Public API
  return {
    init: init,
    getMap: getMap,
    addHeatLayer: addHeatLayer,
    addMarkers: addMarkers,
    clearMarkers: clearMarkers,
    updateMarkers: updateMarkers,
    updateHeatLayer: updateHeatLayer,
    flyToRegion: flyToRegion,
    resetView: resetView,
    invalidateSize: invalidateSize
  };
})();
