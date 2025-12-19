/**
 * Crisis Map - Modal Module
 * Handles crisis detail modal popup
 */
'use strict';

var Modal = (function() {
  var modalEl = null;
  var overlayEl = null;
  var currentCrisis = null;
  
  /**
   * Initialize modal module
   */
  function init() {
    modalEl = document.getElementById('crisis-modal');
    overlayEl = modalEl.querySelector('.modal__overlay');
    
    // Close button click
    var closeBtn = modalEl.querySelector('.modal__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }
    
    // Overlay click
    if (overlayEl) {
      overlayEl.addEventListener('click', close);
    }
    
    // Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen()) {
        close();
      }
    });
  }
  
  /**
   * Check if modal is open
   */
  function isOpen() {
    return modalEl && !modalEl.classList.contains('hidden');
  }
  
  /**
   * Open modal with crisis data
   */
  function open(crisis) {
    if (!modalEl || !crisis) return;
    
    currentCrisis = crisis;
    
    // Populate modal content
    populateModal(crisis);
    
    // Load charities for this crisis
    loadCharities(crisis);
    
    // Show modal
    modalEl.classList.remove('hidden');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus trap (accessibility)
    var closeBtn = modalEl.querySelector('.modal__close');
    if (closeBtn) {
      closeBtn.focus();
    }
  }
  
  /**
   * Close modal
   */
  function close() {
    if (!modalEl) return;
    
    // Add closing animation
    var content = modalEl.querySelector('.modal__content');
    if (content) {
      content.classList.add('closing');
      
      setTimeout(function() {
        modalEl.classList.add('hidden');
        content.classList.remove('closing');
        document.body.style.overflow = '';
        currentCrisis = null;
      }, 200);
    } else {
      modalEl.classList.add('hidden');
      document.body.style.overflow = '';
      currentCrisis = null;
    }
  }
  
  /**
   * Populate modal with crisis data
   */
  function populateModal(crisis) {
    var typeInfo = Utils.getCrisisTypeInfo(crisis.type);
    var urgencyInfo = Utils.getUrgencyInfo(crisis.urgencyLevel);
    var regionInfo = Utils.getRegionInfo(crisis.region);
    
    // Icon
    var iconEl = document.getElementById('modal-icon');
    if (iconEl) {
      iconEl.textContent = typeInfo.icon;
    }
    
    // Title
    var titleEl = document.getElementById('modal-title');
    if (titleEl) {
      titleEl.textContent = crisis.name;
    }
    
    // Location
    var locationEl = document.getElementById('modal-location');
    if (locationEl) {
      locationEl.textContent = crisis.country + ', ' + regionInfo.label;
    }
    
    // Urgency badge
    var urgencyEl = document.getElementById('modal-urgency');
    if (urgencyEl) {
      urgencyEl.textContent = urgencyInfo.label;
      urgencyEl.className = 'urgency-badge urgency-' + crisis.urgencyLevel;
    }
    
    // Type badge
    var typeEl = document.getElementById('modal-type');
    if (typeEl) {
      typeEl.textContent = typeInfo.label;
    }
    
    // Affected count
    var affectedEl = document.getElementById('modal-affected-count');
    if (affectedEl) {
      affectedEl.textContent = Utils.formatNumber(crisis.affectedPopulation);
    }
    
    // Description
    var descEl = document.getElementById('modal-description');
    if (descEl) {
      descEl.textContent = crisis.description;
    }
    
    // Dates
    var startDateEl = document.getElementById('modal-start-date');
    if (startDateEl) {
      startDateEl.textContent = Utils.formatDate(crisis.startDate);
    }
    
    var updatedDateEl = document.getElementById('modal-updated-date');
    if (updatedDateEl) {
      updatedDateEl.textContent = Utils.formatDate(crisis.lastUpdated);
    }
  }
  
  /**
   * Load and display charities for crisis
   */
  function loadCharities(crisis) {
    var listEl = document.getElementById('charity-list');
    var noCharitiesEl = document.getElementById('no-charities');
    
    if (!listEl) return;
    
    // Clear existing charities
    listEl.innerHTML = '';
    
    // Get charities for this crisis
    var charities = CharityData.getCharitiesForCrisis(crisis);
    
    if (charities.length === 0) {
      if (noCharitiesEl) {
        noCharitiesEl.classList.remove('hidden');
      }
      return;
    }
    
    if (noCharitiesEl) {
      noCharitiesEl.classList.add('hidden');
    }
    
    // Render charity cards
    charities.forEach(function(charity) {
      var card = createCharityCard(charity);
      listEl.appendChild(card);
    });
  }
  
  /**
   * Create a charity card element
   */
  function createCharityCard(charity) {
    var card = document.createElement('div');
    card.className = 'charity-card';
    
    card.innerHTML = 
      '<div class="charity-card__header">' +
        '<h4 class="charity-card__name">' + escapeHtml(charity.name) + '</h4>' +
        '<div class="charity-card__rating">' +
          '<span class="stars">' + Utils.generateStars(charity.rating) + '</span>' +
          '<span class="score">' + charity.score.toFixed(1) + '</span>' +
        '</div>' +
      '</div>' +
      '<p class="charity-card__category">' + escapeHtml(charity.category) + '</p>' +
      '<p class="charity-card__description">' + escapeHtml(charity.description) + '</p>' +
      '<div class="charity-card__actions">' +
        '<a href="' + escapeHtml(charity.websiteUrl) + '" ' +
          'target="_blank" rel="noopener noreferrer" ' +
          'class="btn btn--secondary">Website</a>' +
        '<a href="' + escapeHtml(charity.donateUrl) + '" ' +
          'target="_blank" rel="noopener noreferrer" ' +
          'class="btn btn--primary">Donate →</a>' +
      '</div>';
    
    return card;
  }
  
  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  /**
   * Get current crisis
   */
  function getCurrentCrisis() {
    return currentCrisis;
  }
  
  // Public API
  return {
    init: init,
    open: open,
    close: close,
    isOpen: isOpen,
    getCurrentCrisis: getCurrentCrisis
  };
})();
