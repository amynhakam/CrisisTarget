/**
 * Crisis Map - Charity Data Module
 * Handles loading and managing charity data
 */
'use strict';

// Embedded mock data (works without server)
var MOCK_CHARITIES = [
  {
    "id": "charity-001",
    "name": "Doctors Without Borders (MSF)",
    "rating": 4,
    "score": 96.75,
    "category": "International Medical Relief",
    "crisisTypes": ["conflict", "disease", "refugee", "natural_disaster"],
    "donateUrl": "https://donate.doctorswithoutborders.org/",
    "websiteUrl": "https://www.doctorswithoutborders.org/",
    "description": "Delivers emergency medical care to people affected by conflict, epidemics, disasters, and exclusion from healthcare."
  },
  {
    "id": "charity-002",
    "name": "International Rescue Committee (IRC)",
    "rating": 4,
    "score": 94.21,
    "category": "International Relief & Development",
    "crisisTypes": ["conflict", "refugee", "natural_disaster", "famine"],
    "donateUrl": "https://www.rescue.org/donate",
    "websiteUrl": "https://www.rescue.org/",
    "description": "Responds to the world's worst humanitarian crises, helping people survive, recover, and rebuild their lives."
  },
  {
    "id": "charity-003",
    "name": "UNICEF USA",
    "rating": 4,
    "score": 93.89,
    "category": "Children's Welfare",
    "crisisTypes": ["conflict", "famine", "disease", "natural_disaster", "refugee"],
    "donateUrl": "https://www.unicefusa.org/donate",
    "websiteUrl": "https://www.unicefusa.org/",
    "description": "Works in 190+ countries to protect children's rights, help meet their basic needs, and expand opportunities."
  },
  {
    "id": "charity-004",
    "name": "All Hands and Hearts",
    "rating": 4,
    "score": 95.32,
    "category": "Disaster Relief",
    "crisisTypes": ["natural_disaster"],
    "donateUrl": "https://www.allhandsandhearts.org/donate/",
    "websiteUrl": "https://www.allhandsandhearts.org/",
    "description": "Addresses immediate and long-term needs of communities impacted by natural disasters."
  },
  {
    "id": "charity-005",
    "name": "World Food Programme USA",
    "rating": 4,
    "score": 91.45,
    "category": "Food & Hunger Relief",
    "crisisTypes": ["famine", "conflict", "natural_disaster", "refugee"],
    "donateUrl": "https://www.wfpusa.org/donate/",
    "websiteUrl": "https://www.wfpusa.org/",
    "description": "The world's largest humanitarian organization, saving lives in emergencies and building pathways to peace."
  },
  {
    "id": "charity-006",
    "name": "ShelterBox USA",
    "rating": 4,
    "score": 92.67,
    "category": "Emergency Shelter",
    "crisisTypes": ["natural_disaster", "conflict"],
    "donateUrl": "https://www.shelterboxusa.org/donate",
    "websiteUrl": "https://www.shelterboxusa.org/",
    "description": "Provides emergency shelter and essential supplies to families who have lost their homes."
  },
  {
    "id": "charity-007",
    "name": "CARE",
    "rating": 4,
    "score": 90.12,
    "category": "International Relief & Development",
    "crisisTypes": ["famine", "conflict", "refugee", "natural_disaster", "disease"],
    "donateUrl": "https://www.care.org/donate",
    "websiteUrl": "https://www.care.org/",
    "description": "Fights global poverty with special focus on working alongside women and girls."
  },
  {
    "id": "charity-008",
    "name": "Direct Relief",
    "rating": 4,
    "score": 99.47,
    "category": "Medical Supplies & Assistance",
    "crisisTypes": ["natural_disaster", "disease", "conflict"],
    "donateUrl": "https://www.directrelief.org/donate/",
    "websiteUrl": "https://www.directrelief.org/",
    "description": "Improves health and lives of people affected by poverty or emergencies with medical resources."
  },
  {
    "id": "charity-009",
    "name": "Refugees International",
    "rating": 4,
    "score": 89.34,
    "category": "Refugee Advocacy & Support",
    "crisisTypes": ["refugee", "conflict"],
    "donateUrl": "https://www.refugeesinternational.org/donate",
    "websiteUrl": "https://www.refugeesinternational.org/",
    "description": "Advocates for lifesaving assistance and protection for displaced people worldwide."
  },
  {
    "id": "charity-010",
    "name": "Mercy Corps",
    "rating": 4,
    "score": 88.92,
    "category": "International Relief & Development",
    "crisisTypes": ["conflict", "natural_disaster", "famine", "refugee"],
    "donateUrl": "https://www.mercycorps.org/donate",
    "websiteUrl": "https://www.mercycorps.org/",
    "description": "Empowers people to survive through crisis, build better lives, and transform their communities."
  },
  {
    "id": "charity-011",
    "name": "Action Against Hunger",
    "rating": 4,
    "score": 91.78,
    "category": "Hunger & Nutrition",
    "crisisTypes": ["famine", "conflict", "natural_disaster"],
    "donateUrl": "https://www.actionagainsthunger.org/donate/",
    "websiteUrl": "https://www.actionagainsthunger.org/",
    "description": "A global humanitarian organization committed to ending world hunger."
  },
  {
    "id": "charity-012",
    "name": "Catholic Relief Services",
    "rating": 4,
    "score": 89.56,
    "category": "International Relief & Development",
    "crisisTypes": ["conflict", "natural_disaster", "refugee", "famine"],
    "donateUrl": "https://support.crs.org/donate",
    "websiteUrl": "https://www.crs.org/",
    "description": "Assists the poor and vulnerable overseas, working in 100+ countries."
  }
];

var CharityData = (function() {
  var charities = [];
  
  /**
   * Load charity data
   */
  function load() {
    if (Config.USE_LIVE_APIS && Config.CHARITY_NAV_KEY !== 'YOUR_CHARITY_NAVIGATOR_KEY') {
      return loadFromAPI();
    } else {
      return loadMockData();
    }
  }
  
  /**
   * Load from Charity Navigator API (future implementation)
   */
  function loadFromAPI() {
    // Check cache first
    var cached = Utils.Cache.get('charities');
    if (cached) {
      charities = cached;
      return Promise.resolve(charities);
    }
    
    // TODO: Implement actual API call when key is available
    console.log('Charity Navigator API not configured, using mock data');
    return loadMockData();
  }
  
  /**
   * Load mock charity data - uses embedded data for file:// compatibility
   */
  function loadMockData() {
    return new Promise(function(resolve) {
      charities = MOCK_CHARITIES;
      Utils.Cache.set('charities', charities);
      resolve(charities);
    });
  }
  
  /**
   * Get all charities
   */
  function getAll() {
    return charities;
  }
  
  /**
   * Get charity by ID
   */
  function getById(id) {
    return charities.find(function(c) {
      return c.id === id;
    });
  }
  
  /**
   * Get charities for a specific crisis
   * Filters by rating and limits results
   */
  function getCharitiesForCrisis(crisis) {
    if (!crisis || !crisis.relatedCharities) {
      return [];
    }
    
    // Get charities by IDs
    var related = crisis.relatedCharities
      .map(function(id) {
        return getById(id);
      })
      .filter(function(charity) {
        return charity !== undefined;
      });
    
    // Filter by minimum rating
    var filtered = related.filter(function(charity) {
      return charity.rating >= Config.MIN_CHARITY_RATING;
    });
    
    // Sort by rating (descending), then by score
    filtered.sort(function(a, b) {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.score - a.score;
    });
    
    // Limit results
    return filtered.slice(0, Config.MAX_CHARITIES_PER_CRISIS);
  }
  
  /**
   * Get charities by crisis type
   */
  function getByType(crisisType) {
    return charities.filter(function(charity) {
      return charity.crisisTypes && 
             charity.crisisTypes.indexOf(crisisType) !== -1 &&
             charity.rating >= Config.MIN_CHARITY_RATING;
    });
  }
  
  /**
   * Search charities by name
   */
  function search(query) {
    if (!query) return [];
    
    var lowerQuery = query.toLowerCase();
    return charities.filter(function(charity) {
      return charity.name.toLowerCase().indexOf(lowerQuery) !== -1 ||
             charity.category.toLowerCase().indexOf(lowerQuery) !== -1;
    });
  }
  
  // Public API
  return {
    load: load,
    getAll: getAll,
    getById: getById,
    getCharitiesForCrisis: getCharitiesForCrisis,
    getByType: getByType,
    search: search
  };
})();
