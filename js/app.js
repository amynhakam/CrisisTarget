/**
 * Crisis Map - Main Application Entry Point
 */
'use strict';

var App = (function() {
  var allCrises = [];
  var filteredCrises = [];
  
  /**
   * Initialize the application
   */
  function init() {
    console.log('Crisis Map initializing...');
    
    // Initialize map
    CrisisMap.init();
    
    // Initialize modal
    Modal.init();
    
    // Initialize filters with callback
    Filters.init(handleFilterChange);
    
    // Load data
    loadData();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('Crisis Map ready!');
  }
  
  /**
   * Load all data
   */
  function loadData() {
    // Load crises and charities in parallel
    Promise.all([
      CrisisData.load(),
      CharityData.load()
    ])
    .then(function(results) {
      allCrises = results[0];
      
      // Apply initial filters and render
      applyFiltersAndRender();
      
      Utils.showToast('Data loaded successfully', 'success');
    })
    .catch(function(error) {
      console.error('Error loading data:', error);
      Utils.showToast('Error loading data', 'error');
    });
  }
  
  /**
   * Handle filter changes
   */
  function handleFilterChange(filterState) {
    applyFiltersAndRender();
  }
  
  /**
   * Apply filters and render map
   */
  function applyFiltersAndRender() {
    // Apply filters to crises
    filteredCrises = Filters.applyFilters(allCrises);
    
    // Update crisis count
    Filters.updateCount(filteredCrises.length);
    
    // Get top crisis IDs for highlighting
    var topIds = CrisisData.getTopCrisisIds().filter(function(id) {
      return filteredCrises.some(function(c) {
        return c.id === id;
      });
    });
    
    // Update map markers and heat layer
    CrisisMap.updateMarkers(filteredCrises, topIds);
  }
  
  /**
   * Setup event listeners
   */
  function setupEventListeners() {
    // Refresh button
    var refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', handleRefresh);
    }
  }
  
  /**
   * Handle refresh button click
   */
  function handleRefresh() {
    Utils.showLoading('Refreshing data...');
    
    Promise.all([
      CrisisData.refresh(),
      CharityData.load()
    ])
    .then(function(results) {
      allCrises = results[0];
      applyFiltersAndRender();
      Utils.showToast('Data refreshed', 'success');
    })
    .catch(function(error) {
      console.error('Error refreshing data:', error);
      Utils.showToast('Error refreshing data', 'error');
    });
  }
  
  /**
   * Get filtered crises
   */
  function getFilteredCrises() {
    return filteredCrises;
  }
  
  /**
   * Get all crises
   */
  function getAllCrises() {
    return allCrises;
  }
  
  // Public API
  return {
    init: init,
    getFilteredCrises: getFilteredCrises,
    getAllCrises: getAllCrises,
    refresh: handleRefresh
  };
})();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  App.init();
});
