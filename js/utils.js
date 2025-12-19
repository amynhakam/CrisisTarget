/**
 * Crisis Map - Utility Functions
 */
'use strict';

var Utils = (function() {
  
  /**
   * Format a number with commas (e.g., 1000000 -> 1,000,000)
   */
  function formatNumber(num) {
    if (num === null || num === undefined) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  /**
   * Format a date string to readable format
   */
  function formatDate(dateString) {
    if (!dateString) return '-';
    try {
      var date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  }
  
  /**
   * Debounce function to limit rapid calls
   */
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }
  
  /**
   * Generate star rating HTML
   */
  function generateStars(rating) {
    var fullStars = Math.floor(rating);
    var stars = '';
    for (var i = 0; i < fullStars; i++) {
      stars += '⭐';
    }
    return stars;
  }
  
  /**
   * Truncate text with ellipsis
   */
  function truncate(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }
  
  /**
   * Get crisis type info from config
   */
  function getCrisisTypeInfo(type) {
    return Config.CRISIS_TYPES[type] || {
      label: type,
      icon: '❓',
      color: '#888888'
    };
  }
  
  /**
   * Get urgency level info from config
   */
  function getUrgencyInfo(level) {
    return Config.URGENCY_LEVELS[level] || {
      label: 'Unknown',
      color: '#888888'
    };
  }
  
  /**
   * Get region info from config
   */
  function getRegionInfo(region) {
    return Config.REGIONS[region] || {
      label: region,
      bounds: null
    };
  }
  
  /**
   * Simple local storage cache
   */
  var Cache = {
    set: function(key, data) {
      try {
        var item = {
          data: data,
          timestamp: Date.now()
        };
        localStorage.setItem('crisismap_' + key, JSON.stringify(item));
      } catch (e) {
        console.warn('Cache set failed:', e);
      }
    },
    
    get: function(key) {
      try {
        var item = localStorage.getItem('crisismap_' + key);
        if (!item) return null;
        
        var parsed = JSON.parse(item);
        var age = Date.now() - parsed.timestamp;
        
        if (age > Config.CACHE_TTL) {
          localStorage.removeItem('crisismap_' + key);
          return null;
        }
        
        return parsed.data;
      } catch (e) {
        console.warn('Cache get failed:', e);
        return null;
      }
    },
    
    clear: function() {
      try {
        Object.keys(localStorage).forEach(function(key) {
          if (key.startsWith('crisismap_')) {
            localStorage.removeItem(key);
          }
        });
      } catch (e) {
        console.warn('Cache clear failed:', e);
      }
    }
  };
  
  /**
   * Show toast notification
   */
  function showToast(message, type) {
    type = type || 'success';
    var container = document.getElementById('toast-container');
    if (!container) return;
    
    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(function() {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, Config.TOAST_DURATION);
  }
  
  /**
   * Show loading overlay
   */
  function showLoading(message) {
    var overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    
    var textEl = overlay.querySelector('.loading__text');
    if (textEl) {
      textEl.textContent = message || 'Loading...';
    }
    
    overlay.classList.remove('hidden');
  }
  
  /**
   * Hide loading overlay
   */
  function hideLoading() {
    var overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }
  
  /**
   * Show/hide data status indicator
   */
  function showDataStatus(message) {
    var status = document.getElementById('data-status');
    if (!status) return;
    
    var textEl = status.querySelector('.data-status__text');
    if (textEl) {
      textEl.textContent = message;
    }
    
    status.classList.remove('hidden');
  }
  
  function hideDataStatus() {
    var status = document.getElementById('data-status');
    if (status) {
      status.classList.add('hidden');
    }
  }
  
  // Public API
  return {
    formatNumber: formatNumber,
    formatDate: formatDate,
    debounce: debounce,
    generateStars: generateStars,
    truncate: truncate,
    getCrisisTypeInfo: getCrisisTypeInfo,
    getUrgencyInfo: getUrgencyInfo,
    getRegionInfo: getRegionInfo,
    Cache: Cache,
    showToast: showToast,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showDataStatus: showDataStatus,
    hideDataStatus: hideDataStatus
  };
})();
