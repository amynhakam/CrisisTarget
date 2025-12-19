/**
 * Crisis Map - Filters Module
 * Handles filter UI and state management
 */
'use strict';

var Filters = (function() {
  // Filter state
  var state = {
    types: ['conflict', 'natural_disaster', 'famine', 'disease', 'refugee'],
    regions: ['africa', 'asia', 'europe', 'middle_east', 'americas', 'oceania'],
    urgencyMin: 1,
    urgencyMax: 5
  };
  
  // Callback for when filters change
  var onChangeCallback = null;
  
  // Debounced update function
  var debouncedUpdate = null;
  
  /**
   * Initialize filters module
   */
  function init(onChange) {
    onChangeCallback = onChange;
    debouncedUpdate = Utils.debounce(triggerUpdate, Config.FILTER_DEBOUNCE);
    
    // Type checkboxes
    var typeCheckboxes = document.querySelectorAll('input[name="crisis-type"]');
    typeCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', handleTypeChange);
    });
    
    // Region checkboxes
    var regionCheckboxes = document.querySelectorAll('input[name="region"]');
    regionCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', handleRegionChange);
    });
    
    // Urgency slider
    var urgencySlider = document.getElementById('urgency-min');
    if (urgencySlider) {
      urgencySlider.addEventListener('input', handleUrgencyChange);
    }
    
    // Reset button
    var resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', reset);
    }
    
    // Toggle filters button (mobile)
    var toggleBtn = document.getElementById('toggle-filters-btn');
    var filterPanel = document.getElementById('filter-panel');
    if (toggleBtn && filterPanel) {
      toggleBtn.addEventListener('click', function() {
        filterPanel.classList.toggle('open');
        filterPanel.classList.toggle('collapsed');
      });
    }
  }
  
  /**
   * Handle crisis type checkbox change
   */
  function handleTypeChange(e) {
    var type = e.target.value;
    var checked = e.target.checked;
    
    if (checked) {
      if (state.types.indexOf(type) === -1) {
        state.types.push(type);
      }
    } else {
      var index = state.types.indexOf(type);
      if (index > -1) {
        state.types.splice(index, 1);
      }
    }
    
    debouncedUpdate();
  }
  
  /**
   * Handle region checkbox change
   */
  function handleRegionChange(e) {
    var region = e.target.value;
    var checked = e.target.checked;
    
    if (checked) {
      if (state.regions.indexOf(region) === -1) {
        state.regions.push(region);
      }
    } else {
      var index = state.regions.indexOf(region);
      if (index > -1) {
        state.regions.splice(index, 1);
      }
    }
    
    debouncedUpdate();
  }
  
  /**
   * Handle urgency slider change
   */
  function handleUrgencyChange(e) {
    state.urgencyMin = parseInt(e.target.value, 10);
    
    // Update display
    var display = document.getElementById('urgency-display');
    if (display) {
      display.textContent = state.urgencyMin + ' - 5';
    }
    
    debouncedUpdate();
  }
  
  /**
   * Trigger filter update callback
   */
  function triggerUpdate() {
    if (onChangeCallback) {
      onChangeCallback(state);
    }
  }
  
  /**
   * Apply filters to crisis array
   */
  function applyFilters(crises) {
    return crises.filter(function(crisis) {
      // Type filter
      var typeMatch = state.types.indexOf(crisis.type) !== -1;
      
      // Region filter
      var regionMatch = state.regions.indexOf(crisis.region) !== -1;
      
      // Urgency filter
      var urgencyMatch = crisis.urgencyLevel >= state.urgencyMin && 
                         crisis.urgencyLevel <= state.urgencyMax;
      
      return typeMatch && regionMatch && urgencyMatch;
    });
  }
  
  /**
   * Reset all filters to default
   */
  function reset() {
    // Reset state
    state.types = ['conflict', 'natural_disaster', 'famine', 'disease', 'refugee'];
    state.regions = ['africa', 'asia', 'europe', 'middle_east', 'americas', 'oceania'];
    state.urgencyMin = 1;
    state.urgencyMax = 5;
    
    // Reset type checkboxes
    var typeCheckboxes = document.querySelectorAll('input[name="crisis-type"]');
    typeCheckboxes.forEach(function(checkbox) {
      checkbox.checked = true;
    });
    
    // Reset region checkboxes
    var regionCheckboxes = document.querySelectorAll('input[name="region"]');
    regionCheckboxes.forEach(function(checkbox) {
      checkbox.checked = true;
    });
    
    // Reset urgency slider
    var urgencySlider = document.getElementById('urgency-min');
    if (urgencySlider) {
      urgencySlider.value = 1;
    }
    
    // Update display
    var display = document.getElementById('urgency-display');
    if (display) {
      display.textContent = '1 - 5';
    }
    
    // Reset map view
    CrisisMap.resetView();
    
    // Trigger update
    triggerUpdate();
    
    Utils.showToast('Filters reset', 'success');
  }
  
  /**
   * Get current filter state
   */
  function getState() {
    return Object.assign({}, state);
  }
  
  /**
   * Update crisis count display
   */
  function updateCount(count) {
    var countEl = document.getElementById('crisis-count');
    if (countEl) {
      countEl.textContent = count;
    }
  }
  
  // Public API
  return {
    init: init,
    applyFilters: applyFilters,
    reset: reset,
    getState: getState,
    updateCount: updateCount
  };
})();
