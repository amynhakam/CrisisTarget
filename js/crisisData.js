/**
 * Crisis Map - Crisis Data Module
 * Handles loading and managing crisis data
 */
'use strict';

// Embedded mock data (works without server)
var MOCK_CRISES = [
  {
    "id": "crisis-001",
    "name": "Syria Humanitarian Crisis",
    "type": "conflict",
    "region": "middle_east",
    "country": "Syria",
    "countryCode": "SY",
    "coordinates": { "lat": 35.0, "lng": 38.0 },
    "urgencyLevel": 5,
    "description": "Over a decade of conflict has created one of the worst humanitarian crises of our time. More than 13 million people need humanitarian assistance, with millions displaced internally and as refugees in neighboring countries.",
    "affectedPopulation": 13400000,
    "startDate": "2011-03-15",
    "lastUpdated": "2024-12-15",
    "relatedCharities": ["charity-001", "charity-002", "charity-003", "charity-007", "charity-010"]
  },
  {
    "id": "crisis-002",
    "name": "Yemen Humanitarian Emergency",
    "type": "conflict",
    "region": "middle_east",
    "country": "Yemen",
    "countryCode": "YE",
    "coordinates": { "lat": 15.5, "lng": 48.0 },
    "urgencyLevel": 5,
    "description": "Yemen faces the world's worst humanitarian crisis with over 21 million people in need. Widespread famine, disease outbreaks, and ongoing conflict have devastated the country's infrastructure and healthcare system.",
    "affectedPopulation": 21600000,
    "startDate": "2014-09-21",
    "lastUpdated": "2024-12-14",
    "relatedCharities": ["charity-001", "charity-002", "charity-005", "charity-007", "charity-010"]
  },
  {
    "id": "crisis-003",
    "name": "Sudan Armed Conflict",
    "type": "conflict",
    "region": "africa",
    "country": "Sudan",
    "countryCode": "SD",
    "coordinates": { "lat": 15.5, "lng": 32.5 },
    "urgencyLevel": 5,
    "description": "Intense fighting between military factions has displaced millions and triggered a severe humanitarian emergency. Access to food, water, and medical care has become extremely limited for much of the population.",
    "affectedPopulation": 24800000,
    "startDate": "2023-04-15",
    "lastUpdated": "2024-12-17",
    "relatedCharities": ["charity-001", "charity-002", "charity-003", "charity-007", "charity-010"]
  },
  {
    "id": "crisis-004",
    "name": "Gaza Humanitarian Crisis",
    "type": "conflict",
    "region": "middle_east",
    "country": "Palestine",
    "countryCode": "PS",
    "coordinates": { "lat": 31.5, "lng": 34.47 },
    "urgencyLevel": 5,
    "description": "Ongoing conflict has created catastrophic humanitarian conditions with severe shortages of food, water, medical supplies, and fuel. The healthcare system has been overwhelmed and millions face displacement.",
    "affectedPopulation": 2300000,
    "startDate": "2023-10-07",
    "lastUpdated": "2024-12-17",
    "relatedCharities": ["charity-002", "charity-003", "charity-007", "charity-010", "charity-012"]
  },
  {
    "id": "crisis-005",
    "name": "Ukraine Humanitarian Emergency",
    "type": "conflict",
    "region": "europe",
    "country": "Ukraine",
    "countryCode": "UA",
    "coordinates": { "lat": 48.4, "lng": 31.2 },
    "urgencyLevel": 5,
    "description": "The ongoing conflict has created Europe's largest displacement crisis since World War II. Millions have fled the country while those remaining face destruction of infrastructure, energy shortages, and ongoing danger.",
    "affectedPopulation": 17600000,
    "startDate": "2022-02-24",
    "lastUpdated": "2024-12-16",
    "relatedCharities": ["charity-001", "charity-002", "charity-003", "charity-008", "charity-010"]
  },
  {
    "id": "crisis-006",
    "name": "Afghanistan Humanitarian Crisis",
    "type": "famine",
    "region": "asia",
    "country": "Afghanistan",
    "countryCode": "AF",
    "coordinates": { "lat": 33.9, "lng": 67.7 },
    "urgencyLevel": 5,
    "description": "Afghanistan faces one of the world's most severe humanitarian emergencies with over half the population requiring assistance. Economic collapse, drought, and restricted rights have exacerbated food insecurity.",
    "affectedPopulation": 28300000,
    "startDate": "2021-08-15",
    "lastUpdated": "2024-12-15",
    "relatedCharities": ["charity-001", "charity-002", "charity-005", "charity-007", "charity-011"]
  },
  {
    "id": "crisis-007",
    "name": "DRC Eastern Conflict",
    "type": "conflict",
    "region": "africa",
    "country": "Democratic Republic of Congo",
    "countryCode": "CD",
    "coordinates": { "lat": -1.5, "lng": 28.5 },
    "urgencyLevel": 5,
    "description": "Armed conflict in eastern DRC has displaced millions and created severe food insecurity. Violence against civilians continues while disease outbreaks compound the humanitarian emergency.",
    "affectedPopulation": 25900000,
    "startDate": "1996-10-24",
    "lastUpdated": "2024-12-15",
    "relatedCharities": ["charity-001", "charity-002", "charity-003", "charity-007", "charity-010"]
  },
  {
    "id": "crisis-008",
    "name": "Ethiopia Tigray Crisis",
    "type": "conflict",
    "region": "africa",
    "country": "Ethiopia",
    "countryCode": "ET",
    "coordinates": { "lat": 13.5, "lng": 39.5 },
    "urgencyLevel": 4,
    "description": "Though a peace agreement was signed, the humanitarian situation remains severe with millions in need of food assistance. Recovery efforts are underway but significant challenges persist.",
    "affectedPopulation": 20100000,
    "startDate": "2020-11-04",
    "lastUpdated": "2024-12-10",
    "relatedCharities": ["charity-001", "charity-002", "charity-005", "charity-007"]
  },
  {
    "id": "crisis-009",
    "name": "Somalia Drought & Famine",
    "type": "famine",
    "region": "africa",
    "country": "Somalia",
    "countryCode": "SO",
    "coordinates": { "lat": 5.2, "lng": 46.2 },
    "urgencyLevel": 5,
    "description": "Consecutive failed rainy seasons have pushed millions to the brink of famine. Combined with ongoing conflict and displacement, the humanitarian situation is extremely dire.",
    "affectedPopulation": 8300000,
    "startDate": "2021-01-01",
    "lastUpdated": "2024-12-16",
    "relatedCharities": ["charity-002", "charity-005", "charity-007", "charity-010", "charity-011"]
  },
  {
    "id": "crisis-010",
    "name": "Haiti Political Crisis",
    "type": "conflict",
    "region": "americas",
    "country": "Haiti",
    "countryCode": "HT",
    "coordinates": { "lat": 18.9, "lng": -72.3 },
    "urgencyLevel": 5,
    "description": "Gang violence and political instability have paralyzed the country, with millions facing food insecurity and lack of access to healthcare. Displacement within the country has reached record levels.",
    "affectedPopulation": 5500000,
    "startDate": "2021-07-07",
    "lastUpdated": "2024-12-17",
    "relatedCharities": ["charity-002", "charity-003", "charity-007", "charity-010", "charity-012"]
  },
  {
    "id": "crisis-011",
    "name": "Myanmar Conflict",
    "type": "conflict",
    "region": "asia",
    "country": "Myanmar",
    "countryCode": "MM",
    "coordinates": { "lat": 21.9, "lng": 96.0 },
    "urgencyLevel": 4,
    "description": "Ongoing conflict following the military coup has displaced hundreds of thousands. The Rohingya crisis continues with limited prospects for return, while fighting spreads across the country.",
    "affectedPopulation": 18600000,
    "startDate": "2021-02-01",
    "lastUpdated": "2024-12-14",
    "relatedCharities": ["charity-001", "charity-002", "charity-003", "charity-009"]
  },
  {
    "id": "crisis-012",
    "name": "Pakistan Floods Recovery",
    "type": "natural_disaster",
    "region": "asia",
    "country": "Pakistan",
    "countryCode": "PK",
    "coordinates": { "lat": 30.4, "lng": 69.3 },
    "urgencyLevel": 3,
    "description": "Recovery continues from the devastating 2022 floods that affected 33 million people. While waters have receded, millions remain displaced and infrastructure reconstruction is ongoing.",
    "affectedPopulation": 8200000,
    "startDate": "2022-06-14",
    "lastUpdated": "2024-12-01",
    "relatedCharities": ["charity-002", "charity-003", "charity-004", "charity-006"]
  },
  {
    "id": "crisis-013",
    "name": "Türkiye-Syria Earthquake Recovery",
    "type": "natural_disaster",
    "region": "middle_east",
    "country": "Türkiye",
    "countryCode": "TR",
    "coordinates": { "lat": 37.2, "lng": 37.0 },
    "urgencyLevel": 3,
    "description": "The devastating 2023 earthquakes killed over 50,000 people and left millions homeless. Long-term recovery efforts continue with ongoing needs for shelter, healthcare, and livelihood support.",
    "affectedPopulation": 15000000,
    "startDate": "2023-02-06",
    "lastUpdated": "2024-11-30",
    "relatedCharities": ["charity-002", "charity-003", "charity-004", "charity-006", "charity-010"]
  },
  {
    "id": "crisis-014",
    "name": "Venezuela Refugee Crisis",
    "type": "refugee",
    "region": "americas",
    "country": "Venezuela",
    "countryCode": "VE",
    "coordinates": { "lat": 7.0, "lng": -66.0 },
    "urgencyLevel": 4,
    "description": "Over 7 million Venezuelans have fled the country due to economic collapse and political instability. Those remaining face severe shortages of food, medicine, and basic services.",
    "affectedPopulation": 7700000,
    "startDate": "2014-02-12",
    "lastUpdated": "2024-12-10",
    "relatedCharities": ["charity-002", "charity-003", "charity-007", "charity-012"]
  },
  {
    "id": "crisis-015",
    "name": "Sahel Food Crisis",
    "type": "famine",
    "region": "africa",
    "country": "Burkina Faso",
    "countryCode": "BF",
    "coordinates": { "lat": 12.2, "lng": -1.5 },
    "urgencyLevel": 4,
    "description": "Conflict and climate change have pushed millions in the Sahel region into severe food insecurity. Displacement continues as violence spreads and agricultural production declines.",
    "affectedPopulation": 10200000,
    "startDate": "2019-01-01",
    "lastUpdated": "2024-12-15",
    "relatedCharities": ["charity-002", "charity-005", "charity-007", "charity-011"]
  },
  {
    "id": "crisis-016",
    "name": "Bangladesh Rohingya Refugees",
    "type": "refugee",
    "region": "asia",
    "country": "Bangladesh",
    "countryCode": "BD",
    "coordinates": { "lat": 21.4, "lng": 92.0 },
    "urgencyLevel": 4,
    "description": "Over 900,000 Rohingya refugees remain in camps in Cox's Bazar with no prospect of safe return. The protracted crisis strains resources while refugees face limited opportunities.",
    "affectedPopulation": 936000,
    "startDate": "2017-08-25",
    "lastUpdated": "2024-12-12",
    "relatedCharities": ["charity-001", "charity-002", "charity-003", "charity-009"]
  },
  {
    "id": "crisis-017",
    "name": "South Sudan Humanitarian Crisis",
    "type": "conflict",
    "region": "africa",
    "country": "South Sudan",
    "countryCode": "SS",
    "coordinates": { "lat": 7.9, "lng": 30.0 },
    "urgencyLevel": 4,
    "description": "Years of conflict have left South Sudan with one of the world's worst food crises. Flooding and economic instability compound the humanitarian emergency affecting millions.",
    "affectedPopulation": 9400000,
    "startDate": "2013-12-15",
    "lastUpdated": "2024-12-14",
    "relatedCharities": ["charity-001", "charity-002", "charity-005", "charity-007"]
  },
  {
    "id": "crisis-018",
    "name": "Morocco Earthquake Recovery",
    "type": "natural_disaster",
    "region": "africa",
    "country": "Morocco",
    "countryCode": "MA",
    "coordinates": { "lat": 31.1, "lng": -8.4 },
    "urgencyLevel": 2,
    "description": "The September 2023 earthquake in the Atlas Mountains killed nearly 3,000 people. Recovery efforts continue in remote villages with ongoing needs for shelter and infrastructure.",
    "affectedPopulation": 380000,
    "startDate": "2023-09-08",
    "lastUpdated": "2024-11-20",
    "relatedCharities": ["charity-002", "charity-004", "charity-006"]
  },
  {
    "id": "crisis-019",
    "name": "Libya Floods Recovery",
    "type": "natural_disaster",
    "region": "africa",
    "country": "Libya",
    "countryCode": "LY",
    "coordinates": { "lat": 32.9, "lng": 21.9 },
    "urgencyLevel": 3,
    "description": "The catastrophic flooding in Derna in September 2023 killed thousands and devastated the city. Recovery and reconstruction efforts continue with ongoing humanitarian needs.",
    "affectedPopulation": 884000,
    "startDate": "2023-09-10",
    "lastUpdated": "2024-11-15",
    "relatedCharities": ["charity-002", "charity-004", "charity-006", "charity-010"]
  },
  {
    "id": "crisis-020",
    "name": "Central African Republic Crisis",
    "type": "conflict",
    "region": "africa",
    "country": "Central African Republic",
    "countryCode": "CF",
    "coordinates": { "lat": 6.6, "lng": 20.9 },
    "urgencyLevel": 4,
    "description": "Ongoing armed conflict has displaced hundreds of thousands and left half the population in need of humanitarian assistance. Access to basic services remains severely limited.",
    "affectedPopulation": 3400000,
    "startDate": "2012-12-10",
    "lastUpdated": "2024-12-10",
    "relatedCharities": ["charity-001", "charity-002", "charity-003", "charity-007"]
  },
  {
    "id": "crisis-021",
    "name": "Malawi Cholera Outbreak",
    "type": "disease",
    "region": "africa",
    "country": "Malawi",
    "countryCode": "MW",
    "coordinates": { "lat": -13.3, "lng": 33.8 },
    "urgencyLevel": 3,
    "description": "One of Africa's worst cholera outbreaks in recent years has affected thousands. Response efforts continue with focus on water, sanitation, and healthcare access.",
    "affectedPopulation": 1600000,
    "startDate": "2022-03-03",
    "lastUpdated": "2024-12-01",
    "relatedCharities": ["charity-001", "charity-002", "charity-007"]
  },
  {
    "id": "crisis-022",
    "name": "Philippines Typhoon Response",
    "type": "natural_disaster",
    "region": "asia",
    "country": "Philippines",
    "countryCode": "PH",
    "coordinates": { "lat": 11.5, "lng": 124.0 },
    "urgencyLevel": 2,
    "description": "Regular typhoons continue to impact vulnerable communities. Ongoing recovery from recent storms while building resilience against future disasters remains a priority.",
    "affectedPopulation": 2100000,
    "startDate": "2024-10-25",
    "lastUpdated": "2024-12-05",
    "relatedCharities": ["charity-002", "charity-004", "charity-006"]
  },
  {
    "id": "crisis-023",
    "name": "Lebanon Economic Crisis",
    "type": "refugee",
    "region": "middle_east",
    "country": "Lebanon",
    "countryCode": "LB",
    "coordinates": { "lat": 33.9, "lng": 35.5 },
    "urgencyLevel": 4,
    "description": "Economic collapse combined with hosting 1.5 million Syrian refugees has created a severe humanitarian situation. Most of the population now lives below the poverty line.",
    "affectedPopulation": 4000000,
    "startDate": "2019-10-17",
    "lastUpdated": "2024-12-15",
    "relatedCharities": ["charity-002", "charity-003", "charity-007", "charity-010"]
  },
  {
    "id": "crisis-024",
    "name": "Nigeria Conflict & Food Crisis",
    "type": "conflict",
    "region": "africa",
    "country": "Nigeria",
    "countryCode": "NG",
    "coordinates": { "lat": 11.5, "lng": 13.5 },
    "urgencyLevel": 4,
    "description": "Conflict in the northeast and banditry in the northwest have displaced millions and created severe food insecurity. Economic challenges compound the humanitarian situation.",
    "affectedPopulation": 8300000,
    "startDate": "2009-07-26",
    "lastUpdated": "2024-12-16",
    "relatedCharities": ["charity-001", "charity-002", "charity-005", "charity-007"]
  },
  {
    "id": "crisis-025",
    "name": "Vanuatu Cyclone Recovery",
    "type": "natural_disaster",
    "region": "oceania",
    "country": "Vanuatu",
    "countryCode": "VU",
    "coordinates": { "lat": -17.7, "lng": 168.3 },
    "urgencyLevel": 2,
    "description": "Twin cyclones in 2023 devastated the Pacific island nation, affecting most of the population. Recovery efforts continue with focus on shelter, water, and food security.",
    "affectedPopulation": 250000,
    "startDate": "2023-03-01",
    "lastUpdated": "2024-10-15",
    "relatedCharities": ["charity-002", "charity-004", "charity-006"]
  },
  {
    "id": "crisis-026",
    "name": "Tonga Volcanic Eruption Recovery",
    "type": "natural_disaster",
    "region": "oceania",
    "country": "Tonga",
    "countryCode": "TO",
    "coordinates": { "lat": -21.2, "lng": -175.2 },
    "urgencyLevel": 1,
    "description": "Recovery continues from the 2022 volcanic eruption and tsunami. Long-term rebuilding efforts focus on infrastructure and community resilience.",
    "affectedPopulation": 84000,
    "startDate": "2022-01-15",
    "lastUpdated": "2024-09-01",
    "relatedCharities": ["charity-002", "charity-004", "charity-006"]
  },
  {
    "id": "crisis-027",
    "name": "Colombia Venezuelan Refugees",
    "type": "refugee",
    "region": "americas",
    "country": "Colombia",
    "countryCode": "CO",
    "coordinates": { "lat": 7.1, "lng": -73.1 },
    "urgencyLevel": 3,
    "description": "Colombia hosts over 2 million Venezuelan refugees, straining resources and services. Integration efforts continue while new arrivals persist.",
    "affectedPopulation": 2900000,
    "startDate": "2015-08-19",
    "lastUpdated": "2024-12-10",
    "relatedCharities": ["charity-002", "charity-003", "charity-009", "charity-012"]
  },
  {
    "id": "crisis-028",
    "name": "Mozambique Conflict & Cyclones",
    "type": "conflict",
    "region": "africa",
    "country": "Mozambique",
    "countryCode": "MZ",
    "coordinates": { "lat": -13.0, "lng": 40.0 },
    "urgencyLevel": 4,
    "description": "Insurgency in Cabo Delgado combined with recurring cyclones has displaced over a million people. Food insecurity and limited services affect millions more.",
    "affectedPopulation": 3200000,
    "startDate": "2017-10-05",
    "lastUpdated": "2024-12-12",
    "relatedCharities": ["charity-001", "charity-002", "charity-007", "charity-010"]
  },
  {
    "id": "crisis-029",
    "name": "Madagascar Food Crisis",
    "type": "famine",
    "region": "africa",
    "country": "Madagascar",
    "countryCode": "MG",
    "coordinates": { "lat": -25.0, "lng": 46.0 },
    "urgencyLevel": 3,
    "description": "Recurring droughts in southern Madagascar have created severe food insecurity. Climate change continues to threaten agricultural production and livelihoods.",
    "affectedPopulation": 2000000,
    "startDate": "2021-06-01",
    "lastUpdated": "2024-12-05",
    "relatedCharities": ["charity-002", "charity-005", "charity-007", "charity-011"]
  },
  {
    "id": "crisis-030",
    "name": "East Africa Mpox Outbreak",
    "type": "disease",
    "region": "africa",
    "country": "Democratic Republic of Congo",
    "countryCode": "CD",
    "coordinates": { "lat": -4.3, "lng": 22.0 },
    "urgencyLevel": 4,
    "description": "A new strain of mpox has been spreading rapidly in Central and East Africa. International response is scaling up to contain the outbreak and support affected communities.",
    "affectedPopulation": 500000,
    "startDate": "2024-07-01",
    "lastUpdated": "2024-12-17",
    "relatedCharities": ["charity-001", "charity-002", "charity-007"]
  }
];

var CrisisData = (function() {
  var crises = [];
  var topCrisisIds = [];
  
  /**
   * Calculate urgency level based on affected population (relative to all crises)
   * Uses percentile-based ranking to ensure relative urgency
   */
  function calculateRelativeUrgency(crisisData) {
    // Get all populations and sort them
    var populations = crisisData.map(function(c) { return c.affectedPopulation; });
    populations.sort(function(a, b) { return a - b; });
    
    // Calculate percentile thresholds
    var p20 = populations[Math.floor(populations.length * 0.2)];  // Level 1: bottom 20%
    var p40 = populations[Math.floor(populations.length * 0.4)];  // Level 2: 20-40%
    var p60 = populations[Math.floor(populations.length * 0.6)];  // Level 3: 40-60%
    var p80 = populations[Math.floor(populations.length * 0.8)];  // Level 4: 60-80%
    // Level 5: top 20%
    
    // Assign urgency levels based on percentiles
    return crisisData.map(function(crisis) {
      var pop = crisis.affectedPopulation;
      var urgency;
      
      if (pop >= p80) {
        urgency = 5;  // Critical - top 20%
      } else if (pop >= p60) {
        urgency = 4;  // Severe - 60-80%
      } else if (pop >= p40) {
        urgency = 3;  // High - 40-60%
      } else if (pop >= p20) {
        urgency = 2;  // Elevated - 20-40%
      } else {
        urgency = 1;  // Monitoring - bottom 20%
      }
      
      // Return new object with calculated urgency
      var updated = {};
      for (var key in crisis) {
        updated[key] = crisis[key];
      }
      updated.urgencyLevel = urgency;
      return updated;
    });
  }
  
  /**
   * Load crisis data (mock or API)
   */
  function load() {
    Utils.showLoading('Loading crisis data...');
    
    // Check if running from file:// protocol (CORS will block API)
    if (window.location.protocol === 'file:') {
      console.log('Running from file:// - using mock data (CORS blocks API calls)');
      Utils.showDataStatus('Local mode - using sample data');
      return loadMockData();
    }
    
    if (Config.USE_LIVE_APIS) {
      return loadFromAPI();
    } else {
      return loadMockData();
    }
  }
  
  /**
   * Load from live APIs (future implementation)
   */
  function loadFromAPI() {
    // Check cache first
    var cached = Utils.Cache.get('crises');
    if (cached) {
      crises = calculateRelativeUrgency(cached);
      calculateTopCrises();
      Utils.hideLoading();
      Utils.showDataStatus('Using cached data');
      return Promise.resolve(crises);
    }
    
    console.log('Fetching from GDACS and ReliefWeb APIs...');
    
    // Fetch from both APIs in parallel
    return Promise.all([
      fetchFromGDACS().catch(function(err) {
        console.warn('GDACS fetch failed:', err.message);
        return { features: [] };
      }),
      fetchFromReliefWeb().catch(function(err) {
        console.warn('ReliefWeb fetch failed:', err.message);
        return { data: [] };
      })
    ])
      .then(function(results) {
        var gdacsData = results[0];
        var reliefwebData = results[1];
        
        // Transform GDACS data (natural disasters)
        var gdacsCrises = transformGDACSData(gdacsData);
        console.log('GDACS crises:', gdacsCrises.length);
        
        // Transform ReliefWeb data (humanitarian crises)
        var reliefwebCrises = transformReliefWebData(reliefwebData);
        console.log('ReliefWeb crises:', reliefwebCrises.length);
        
        // Get IDs of crises already from APIs to avoid duplicates
        var apiCrisisNames = {};
        gdacsCrises.concat(reliefwebCrises).forEach(function(c) {
          apiCrisisNames[c.name.toLowerCase()] = true;
          apiCrisisNames[c.country.toLowerCase()] = true;
        });
        
        // Add sample data for crisis types not well covered by APIs
        // (conflicts, refugee crises, ongoing humanitarian emergencies)
        var sampleCrises = MOCK_CRISES.filter(function(c) {
          // Include conflicts and refugee crises (not covered by GDACS)
          // Skip if we already have a similar crisis from API
          var isDuplicate = apiCrisisNames[c.name.toLowerCase()] || 
                           (c.country && apiCrisisNames[c.country.toLowerCase()]);
          return !isDuplicate && (c.type === 'conflict' || c.type === 'refugee');
        });
        console.log('Sample crises (conflicts/refugees):', sampleCrises.length);
        
        // Combine all sources
        var combinedData = gdacsCrises.concat(reliefwebCrises).concat(sampleCrises);
        console.log('Combined total:', combinedData.length, 'crises');
        
        if (combinedData.length === 0) {
          console.log('No data received, falling back to mock data');
          return loadMockData();
        }
        
        crises = calculateRelativeUrgency(combinedData);
        calculateTopCrises();
        Utils.Cache.set('crises', combinedData);
        Utils.hideLoading();
        Utils.showDataStatus('Live + sample data (' + crises.length + ' crises)');
        return crises;
      })
      .catch(function(error) {
        console.error('API error:', error);
        Utils.showDataStatus('API error - using sample data');
        return loadMockData();
      });
  }
  
  /**
   * Fetch disasters from GDACS API
   */
  function fetchFromGDACS() {
    var gdacsUrl = Config.GDACS_API + '/Events/geteventlist/latest';
    
    // Try direct request first, then fallback to CORS proxy if needed
    console.log('Fetching GDACS data from:', gdacsUrl);
    
    return fetch(gdacsUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('GDACS API returned ' + response.status);
        }
        return response.json();
      })
      .catch(function(error) {
        console.log('Direct GDACS request failed, trying CORS proxy...', error.message);
        // Try with CORS proxy
        var proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(gdacsUrl);
        return fetch(proxyUrl)
          .then(function(response) {
            if (!response.ok) {
              throw new Error('CORS proxy returned ' + response.status);
            }
            return response.json();
          });
      });
  }
  
  /**
   * Fetch disasters from ReliefWeb API
   */
  function fetchFromReliefWeb() {
    // Use POST request with JSON body for better field control
    var reliefwebUrl = Config.RELIEFWEB_API + '/disasters?appname=' + Config.RELIEFWEB_APPNAME;
    
    var requestBody = {
      filter: {
        field: 'status',
        value: 'ongoing'
      },
      fields: {
        include: ['name', 'description', 'status', 'country', 'type', 'date', 'glide', 'primary_country']
      },
      limit: 50,
      sort: ['date.created:desc']
    };
    
    console.log('Fetching ReliefWeb data from:', reliefwebUrl);
    
    return fetch(reliefwebUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('ReliefWeb API returned ' + response.status);
        }
        return response.json();
      })
      .catch(function(error) {
        console.log('Direct ReliefWeb request failed, trying CORS proxy...', error.message);
        // Try with CORS proxy using GET with query params as fallback
        var getUrl = Config.RELIEFWEB_API + '/disasters?appname=' + Config.RELIEFWEB_APPNAME +
          '&filter[field]=status&filter[value]=ongoing&limit=50';
        var proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(getUrl);
        return fetch(proxyUrl)
          .then(function(response) {
            if (!response.ok) {
              throw new Error('CORS proxy returned ' + response.status);
            }
            return response.json();
          });
      });
  }
  
  /**
   * Transform ReliefWeb API response to our crisis format
   */
  function transformReliefWebData(data) {
    var items = data.data || [];
    
    if (!Array.isArray(items)) {
      return [];
    }
    
    return items.map(function(item, index) {
      var fields = item.fields || {};
      
      // Get primary country info
      var primaryCountry = fields.primary_country || {};
      var countries = fields.country || [];
      var countryName = primaryCountry.name || (countries[0] && countries[0].name) || 'Unknown';
      var countryIso = primaryCountry.iso3 || (countries[0] && countries[0].iso3) || '';
      
      // Get coordinates from primary country (approximate center)
      var coordsArray = getCountryCoordinates(countryIso || countryName);
      var coords = { lat: coordsArray[0], lng: coordsArray[1] };
      
      // Map ReliefWeb disaster type to our crisis type
      var disasterTypes = fields.type || [];
      var crisisType = mapReliefWebType(disasterTypes);
      
      // Estimate affected population based on disaster type
      var affectedPop = estimateReliefWebPopulation(disasterTypes, fields);
      
      // Determine region
      var region = mapCountryToRegion(countryName) || mapCountryToRegion(countryIso);
      
      return {
        id: 'reliefweb-' + (item.id || index),
        name: fields.name || 'Unknown Disaster',
        type: crisisType,
        region: region || 'global',
        country: countryName,
        coordinates: coords,
        urgencyLevel: 3, // Will be recalculated
        affectedPopulation: affectedPop,
        description: fields.description || buildReliefWebDescription(fields),
        startDate: fields.date && fields.date.created ? fields.date.created : null,
        lastUpdated: fields.date && fields.date.changed ? fields.date.changed : new Date().toISOString(),
        relatedCharities: getCharitiesForType(crisisType),
        source: 'ReliefWeb',
        sourceUrl: item.href || 'https://reliefweb.int/disaster/' + item.id,
        glide: fields.glide || null
      };
    }).filter(function(crisis) {
      // Filter out entries without valid coordinates
      return crisis.coordinates.lat !== 0 || crisis.coordinates.lng !== 0;
    });
  }
  
  /**
   * Map ReliefWeb disaster types to our crisis types
   */
  function mapReliefWebType(types) {
    if (!Array.isArray(types) || types.length === 0) {
      return 'natural_disaster';
    }
    
    var typeNames = types.map(function(t) { return (t.name || '').toLowerCase(); });
    
    // Check for conflict/complex emergency
    if (typeNames.some(function(t) { return t.includes('conflict') || t.includes('complex'); })) {
      return 'conflict';
    }
    // Check for epidemic/disease
    if (typeNames.some(function(t) { return t.includes('epidemic') || t.includes('disease'); })) {
      return 'disease';
    }
    // Check for famine/food
    if (typeNames.some(function(t) { return t.includes('famine') || t.includes('food'); })) {
      return 'famine';
    }
    // Check for refugee/displacement
    if (typeNames.some(function(t) { return t.includes('refugee') || t.includes('displacement'); })) {
      return 'refugee';
    }
    
    // Default to natural disaster for floods, earthquakes, etc.
    return 'natural_disaster';
  }
  
  /**
   * Estimate population affected for ReliefWeb disasters
   */
  function estimateReliefWebPopulation(types, fields) {
    // ReliefWeb doesn't always provide population data
    // Estimate based on disaster type and severity
    var typeNames = (types || []).map(function(t) { return (t.name || '').toLowerCase(); });
    
    if (typeNames.some(function(t) { return t.includes('complex') || t.includes('conflict'); })) {
      return 5000000; // Complex emergencies typically affect millions
    }
    if (typeNames.some(function(t) { return t.includes('drought') || t.includes('famine'); })) {
      return 3000000;
    }
    if (typeNames.some(function(t) { return t.includes('flood'); })) {
      return 500000;
    }
    if (typeNames.some(function(t) { return t.includes('earthquake'); })) {
      return 200000;
    }
    if (typeNames.some(function(t) { return t.includes('cyclone') || t.includes('hurricane') || t.includes('typhoon'); })) {
      return 300000;
    }
    
    return 100000; // Default estimate
  }
  
  /**
   * Build description for ReliefWeb disasters
   */
  function buildReliefWebDescription(fields) {
    var parts = [];
    
    var types = fields.type || [];
    if (types.length > 0) {
      var typeNames = types.map(function(t) { return t.name; }).join(', ');
      parts.push('Type: ' + typeNames);
    }
    
    if (fields.status) {
      parts.push('Status: ' + fields.status);
    }
    
    if (fields.glide) {
      parts.push('GLIDE: ' + fields.glide);
    }
    
    return parts.length > 0 ? parts.join('. ') + '.' : 'Humanitarian crisis tracked by ReliefWeb.';
  }
  
  /**
   * Get approximate coordinates for a country
   */
  function getCountryCoordinates(country) {
    var coordsMap = {
      // Africa
      'ETH': [9.145, 40.489], 'Ethiopia': [9.145, 40.489],
      'SDN': [15.5, 32.5], 'Sudan': [15.5, 32.5],
      'SSD': [6.877, 31.307], 'South Sudan': [6.877, 31.307],
      'SOM': [5.152, 46.199], 'Somalia': [5.152, 46.199],
      'NGA': [9.082, 8.675], 'Nigeria': [9.082, 8.675],
      'COD': [-4.038, 21.758], 'Democratic Republic of the Congo': [-4.038, 21.758], 'DRC': [-4.038, 21.758],
      'KEN': [-0.023, 37.906], 'Kenya': [-0.023, 37.906],
      'MLI': [17.570, -3.996], 'Mali': [17.570, -3.996],
      'NER': [17.607, 8.081], 'Niger': [17.607, 8.081],
      'BFA': [12.238, -1.561], 'Burkina Faso': [12.238, -1.561],
      'TCD': [15.454, 18.732], 'Chad': [15.454, 18.732],
      'CAF': [6.611, 20.939], 'Central African Republic': [6.611, 20.939],
      'MOZ': [-18.665, 35.529], 'Mozambique': [-18.665, 35.529],
      'MDG': [-18.766, 46.869], 'Madagascar': [-18.766, 46.869],
      'ZWE': [-19.015, 29.154], 'Zimbabwe': [-19.015, 29.154],
      'MWI': [-13.254, 34.301], 'Malawi': [-13.254, 34.301],
      'UGA': [1.373, 32.290], 'Uganda': [1.373, 32.290],
      'CMR': [7.370, 12.354], 'Cameroon': [7.370, 12.354],
      
      // Middle East
      'YEM': [15.552, 48.516], 'Yemen': [15.552, 48.516],
      'SYR': [34.802, 38.996], 'Syria': [34.802, 38.996], 'Syrian Arab Republic': [34.802, 38.996],
      'IRQ': [33.223, 43.679], 'Iraq': [33.223, 43.679],
      'LBN': [33.854, 35.862], 'Lebanon': [33.854, 35.862],
      'PSE': [31.952, 35.233], 'Palestine': [31.952, 35.233], 'occupied Palestinian territory': [31.952, 35.233],
      'JOR': [30.585, 36.238], 'Jordan': [30.585, 36.238],
      'TUR': [38.963, 35.243], 'Turkey': [38.963, 35.243], 'Türkiye': [38.963, 35.243],
      'IRN': [32.427, 53.688], 'Iran': [32.427, 53.688],
      
      // Asia
      'AFG': [33.939, 67.709], 'Afghanistan': [33.939, 67.709],
      'PAK': [30.375, 69.345], 'Pakistan': [30.375, 69.345],
      'BGD': [23.685, 90.356], 'Bangladesh': [23.685, 90.356],
      'MMR': [21.913, 95.956], 'Myanmar': [21.913, 95.956],
      'PHL': [12.879, 121.774], 'Philippines': [12.879, 121.774],
      'IDN': [-0.789, 113.921], 'Indonesia': [-0.789, 113.921],
      'NPL': [28.394, 84.124], 'Nepal': [28.394, 84.124],
      'IND': [20.593, 78.962], 'India': [20.593, 78.962],
      'LKA': [7.873, 80.771], 'Sri Lanka': [7.873, 80.771],
      'THA': [15.870, 100.992], 'Thailand': [15.870, 100.992],
      'VNM': [14.058, 108.277], 'Viet Nam': [14.058, 108.277], 'Vietnam': [14.058, 108.277],
      'CHN': [35.861, 104.195], 'China': [35.861, 104.195],
      'JPN': [36.204, 138.252], 'Japan': [36.204, 138.252],
      
      // Americas
      'HTI': [18.971, -72.285], 'Haiti': [18.971, -72.285],
      'VEN': [6.423, -66.589], 'Venezuela': [6.423, -66.589],
      'COL': [4.570, -74.297], 'Colombia': [4.570, -74.297],
      'GTM': [15.783, -90.230], 'Guatemala': [15.783, -90.230],
      'HND': [15.199, -86.241], 'Honduras': [15.199, -86.241],
      'SLV': [13.794, -88.896], 'El Salvador': [13.794, -88.896],
      'MEX': [23.634, -102.552], 'Mexico': [23.634, -102.552],
      'USA': [37.090, -95.712], 'United States': [37.090, -95.712], 'United States of America': [37.090, -95.712],
      'BRA': [-14.235, -51.925], 'Brazil': [-14.235, -51.925],
      'PER': [-9.189, -75.015], 'Peru': [-9.189, -75.015],
      'BOL': [-16.290, -63.588], 'Bolivia': [-16.290, -63.588],
      'ECU': [-1.831, -78.183], 'Ecuador': [-1.831, -78.183],
      'CHL': [-35.675, -71.543], 'Chile': [-35.675, -71.543],
      'ARG': [-38.416, -63.616], 'Argentina': [-38.416, -63.616],
      'CUB': [21.521, -77.781], 'Cuba': [21.521, -77.781],
      'JAM': [18.109, -77.297], 'Jamaica': [18.109, -77.297],
      'NIC': [12.865, -85.207], 'Nicaragua': [12.865, -85.207],
      
      // Europe
      'UKR': [48.379, 31.165], 'Ukraine': [48.379, 31.165],
      'GRC': [39.074, 21.824], 'Greece': [39.074, 21.824],
      'ITA': [41.871, 12.567], 'Italy': [41.871, 12.567],
      'ESP': [40.463, -3.749], 'Spain': [40.463, -3.749],
      'FRA': [46.227, 2.213], 'France': [46.227, 2.213],
      'DEU': [51.165, 10.451], 'Germany': [51.165, 10.451],
      'POL': [51.919, 19.145], 'Poland': [51.919, 19.145],
      'ROU': [45.943, 24.966], 'Romania': [45.943, 24.966],
      
      // Oceania
      'TON': [-21.178, -175.198], 'Tonga': [-21.178, -175.198],
      'VUT': [-15.376, 166.959], 'Vanuatu': [-15.376, 166.959],
      'FJI': [-17.713, 178.065], 'Fiji': [-17.713, 178.065],
      'PNG': [-6.314, 143.955], 'Papua New Guinea': [-6.314, 143.955],
      'AUS': [-25.274, 133.775], 'Australia': [-25.274, 133.775],
      'NZL': [-40.900, 174.886], 'New Zealand': [-40.900, 174.886]
    };
    
    return coordsMap[country] || [0, 0];
  }

  /**
   * Transform GDACS API response to our crisis format
   */
  function transformGDACSData(data) {
    // GDACS returns features array
    var features = data.features || data || [];
    
    if (!Array.isArray(features)) {
      features = [features];
    }
    
    return features.map(function(feature, index) {
      var props = feature.properties || feature;
      var geometry = feature.geometry || {};
      var coords = geometry.coordinates || [0, 0];
      
      // Map GDACS event type to our crisis type
      var crisisType = mapGDACSEventType(props.eventtype);
      
      // Map GDACS alert level to our urgency (will be recalculated based on population)
      var baseUrgency = mapGDACSAlertLevel(props.alertlevel);
      
      // Get affected population (GDACS provides various population estimates)
      var affectedPop = props.population || 
                        props.affectedpopulation || 
                        props.exposed_population ||
                        props.severity?.population ||
                        estimatePopulation(props.alertlevel);
      
      // Determine region from country
      var region = mapCountryToRegion(props.country || props.iso3 || '');
      
      // Build crisis object
      var lat = coords[1] || coords.lat || 0;
      var lng = coords[0] || coords.lng || 0;
      
      return {
        id: 'gdacs-' + (props.eventid || index),
        name: props.name || props.eventname || buildEventName(props),
        type: crisisType,
        region: region,
        country: props.country || props.iso3 || 'Unknown',
        coordinates: { lat: lat, lng: lng }, // Use object format
        urgencyLevel: baseUrgency,
        affectedPopulation: parseInt(affectedPop) || 10000,
        description: buildDescription(props),
        startDate: props.fromdate || props.eventdate || null,
        lastUpdated: props.todate || props.datemodified || new Date().toISOString(),
        relatedCharities: getCharitiesForType(crisisType),
        source: 'GDACS',
        sourceUrl: props.url || 'https://www.gdacs.org/report.aspx?eventid=' + props.eventid + '&eventtype=' + props.eventtype
      };
    }).filter(function(crisis) {
      // Filter out invalid entries
      return crisis.coordinates.lat !== 0 || crisis.coordinates.lng !== 0;
    });
  }
  
  /**
   * Map GDACS event type to our crisis types
   */
  function mapGDACSEventType(eventType) {
    var typeMap = {
      'EQ': 'natural_disaster',  // Earthquake
      'TC': 'natural_disaster',  // Tropical Cyclone
      'FL': 'natural_disaster',  // Flood
      'VO': 'natural_disaster',  // Volcano
      'DR': 'famine',            // Drought
      'WF': 'natural_disaster',  // Wildfire/Forest Fire
      'TS': 'natural_disaster'   // Tsunami
    };
    return typeMap[eventType] || 'natural_disaster';
  }
  
  /**
   * Map GDACS alert level to urgency
   */
  function mapGDACSAlertLevel(alertLevel) {
    var levelMap = {
      'Red': 5,
      'Orange': 3,
      'Green': 1
    };
    return levelMap[alertLevel] || 2;
  }
  
  /**
   * Estimate population if not provided
   */
  function estimatePopulation(alertLevel) {
    var estimates = {
      'Red': 5000000,
      'Orange': 1000000,
      'Green': 100000
    };
    return estimates[alertLevel] || 500000;
  }
  
  /**
   * Build event name from properties
   */
  function buildEventName(props) {
    var typeNames = {
      'EQ': 'Earthquake',
      'TC': 'Tropical Cyclone',
      'FL': 'Flood',
      'VO': 'Volcanic Activity',
      'DR': 'Drought',
      'WF': 'Wildfire',
      'TS': 'Tsunami'
    };
    var typeName = typeNames[props.eventtype] || 'Disaster';
    var location = props.country || props.iso3 || '';
    var magnitude = props.severity?.value ? ' (M' + props.severity.value + ')' : '';
    
    return typeName + ' in ' + location + magnitude;
  }
  
  /**
   * Build description from GDACS properties
   */
  function buildDescription(props) {
    var parts = [];
    
    if (props.description) {
      parts.push(props.description);
    }
    
    if (props.severity) {
      if (props.severity.value) {
        parts.push('Magnitude: ' + props.severity.value);
      }
      if (props.severity.unit) {
        parts.push('(' + props.severity.unit + ')');
      }
    }
    
    if (props.alertlevel) {
      parts.push('Alert Level: ' + props.alertlevel);
    }
    
    if (props.population) {
      parts.push('Estimated population affected: ' + Utils.formatNumber(props.population));
    }
    
    if (parts.length === 0) {
      var typeDescs = {
        'EQ': 'Earthquake event detected by GDACS monitoring systems.',
        'TC': 'Tropical cyclone being tracked by GDACS.',
        'FL': 'Flooding event reported by GDACS.',
        'VO': 'Volcanic activity detected.',
        'DR': 'Drought conditions reported.',
        'WF': 'Wildfire/forest fire detected.',
        'TS': 'Tsunami warning issued.'
      };
      parts.push(typeDescs[props.eventtype] || 'Natural disaster event tracked by GDACS.');
    }
    
    return parts.join(' ');
  }
  
  /**
   * Map country to region
   */
  function mapCountryToRegion(country) {
    // Common country to region mappings
    var regionMap = {
      // Africa
      'Ethiopia': 'africa', 'Sudan': 'africa', 'South Sudan': 'africa', 'Somalia': 'africa',
      'Kenya': 'africa', 'Nigeria': 'africa', 'DRC': 'africa', 'Congo': 'africa',
      'Mali': 'africa', 'Niger': 'africa', 'Burkina Faso': 'africa', 'Chad': 'africa',
      'Mozambique': 'africa', 'Madagascar': 'africa', 'South Africa': 'africa',
      'Morocco': 'africa', 'Libya': 'africa', 'Egypt': 'africa', 'CAR': 'africa',
      'ETH': 'africa', 'SDN': 'africa', 'SSD': 'africa', 'SOM': 'africa', 'NGA': 'africa',
      'COD': 'africa', 'MOZ': 'africa', 'MDG': 'africa', 'ZAF': 'africa', 'MAR': 'africa',
      
      // Middle East
      'Yemen': 'middle_east', 'Syria': 'middle_east', 'Iraq': 'middle_east',
      'Lebanon': 'middle_east', 'Jordan': 'middle_east', 'Palestine': 'middle_east',
      'Israel': 'middle_east', 'Iran': 'middle_east', 'Saudi Arabia': 'middle_east',
      'YEM': 'middle_east', 'SYR': 'middle_east', 'IRQ': 'middle_east', 'LBN': 'middle_east',
      'PSE': 'middle_east', 'IRN': 'middle_east', 'TUR': 'middle_east', 'Turkey': 'middle_east',
      
      // Asia (includes Pacific)
      'Afghanistan': 'asia', 'Pakistan': 'asia', 'Bangladesh': 'asia',
      'Myanmar': 'asia', 'Philippines': 'asia', 'Indonesia': 'asia',
      'Vietnam': 'asia', 'Thailand': 'asia', 'Japan': 'asia',
      'China': 'asia', 'India': 'asia', 'Nepal': 'asia',
      'Tonga': 'oceania', 'Vanuatu': 'oceania', 'Fiji': 'oceania',
      'AFG': 'asia', 'PAK': 'asia', 'BGD': 'asia', 'MMR': 'asia',
      'PHL': 'asia', 'IDN': 'asia', 'VNM': 'asia', 'THA': 'asia',
      'JPN': 'asia', 'CHN': 'asia', 'IND': 'asia', 'NPL': 'asia',
      'Sri Lanka': 'asia', 'LKA': 'asia', 'Malaysia': 'asia', 'MYS': 'asia',
      'Cambodia': 'asia', 'KHM': 'asia', 'Laos': 'asia', 'LAO': 'asia',
      
      // Americas
      'Haiti': 'americas', 'Venezuela': 'americas', 'Colombia': 'americas',
      'Guatemala': 'americas', 'Honduras': 'americas', 'El Salvador': 'americas',
      'Mexico': 'americas', 'USA': 'americas', 'United States': 'americas',
      'Brazil': 'americas', 'Peru': 'americas', 'Chile': 'americas', 'Argentina': 'americas',
      'HTI': 'americas', 'VEN': 'americas', 'COL': 'americas', 'GTM': 'americas',
      'MEX': 'americas', 'BRA': 'americas', 'PER': 'americas', 'CHL': 'americas',
      
      // Europe
      'Ukraine': 'europe', 'Greece': 'europe', 'Italy': 'europe', 'Spain': 'europe',
      'France': 'europe', 'Germany': 'europe', 'Poland': 'europe', 'Romania': 'europe',
      'UKR': 'europe', 'GRC': 'europe', 'ITA': 'europe', 'ESP': 'europe',
      'FRA': 'europe', 'DEU': 'europe', 'POL': 'europe', 'ROU': 'europe'
    };
    
    return regionMap[country] || 'global';
  }
  
  /**
   * Get charity IDs relevant to crisis type
   */
  function getCharitiesForType(crisisType) {
    var charityMap = {
      'natural_disaster': ['direct-relief', 'americares', 'all-hands', 'globalgiving', 'red-cross'],
      'conflict': ['irc', 'unhcr', 'doctors-without-borders', 'mercy-corps', 'oxfam'],
      'famine': ['wfp-usa', 'action-against-hunger', 'mercy-corps', 'oxfam', 'care'],
      'disease': ['doctors-without-borders', 'direct-relief', 'americares', 'partners-in-health'],
      'refugee': ['unhcr', 'irc', 'refugees-international', 'hias', 'mercy-corps']
    };
    return charityMap[crisisType] || charityMap['natural_disaster'];
  }
  
  /**
   * Load mock data - uses embedded data for file:// compatibility
   */
  function loadMockData() {
    return new Promise(function(resolve) {
      // Use embedded data (works without server)
      // Calculate urgency levels relative to affected populations
      crises = calculateRelativeUrgency(MOCK_CRISES);
      calculateTopCrises();
      Utils.Cache.set('crises', crises);
      Utils.hideLoading();
      Utils.showDataStatus('Using sample data');
      resolve(crises);
    });
  }
  
  /**
   * Calculate top crises per region
   */
  function calculateTopCrises() {
    topCrisisIds = [];
    
    // Group by region
    var byRegion = {};
    crises.forEach(function(crisis) {
      if (!byRegion[crisis.region]) {
        byRegion[crisis.region] = [];
      }
      byRegion[crisis.region].push(crisis);
    });
    
    // Get top N from each region by urgency
    Object.keys(byRegion).forEach(function(region) {
      var regionCrises = byRegion[region];
      
      // Sort by urgency (descending), then by affected population
      regionCrises.sort(function(a, b) {
        if (b.urgencyLevel !== a.urgencyLevel) {
          return b.urgencyLevel - a.urgencyLevel;
        }
        return b.affectedPopulation - a.affectedPopulation;
      });
      
      // Take top N
      var top = regionCrises.slice(0, Config.TOP_CRISES_PER_REGION);
      top.forEach(function(crisis) {
        topCrisisIds.push(crisis.id);
      });
    });
  }
  
  /**
   * Refresh data (clear cache and reload)
   */
  function refresh() {
    Utils.Cache.clear();
    Utils.hideDataStatus();
    return load();
  }
  
  /**
   * Get all crises
   */
  function getAll() {
    return crises;
  }
  
  /**
   * Get crisis by ID
   */
  function getById(id) {
    return crises.find(function(c) {
      return c.id === id;
    });
  }
  
  /**
   * Get crises by region
   */
  function getByRegion(region) {
    return crises.filter(function(c) {
      return c.region === region;
    });
  }
  
  /**
   * Get crises by type
   */
  function getByType(type) {
    return crises.filter(function(c) {
      return c.type === type;
    });
  }
  
  /**
   * Get top crisis IDs
   */
  function getTopCrisisIds() {
    return topCrisisIds;
  }
  
  /**
   * Check if a crisis is in top list
   */
  function isTopCrisis(id) {
    return topCrisisIds.indexOf(id) !== -1;
  }
  
  // Public API
  return {
    load: load,
    refresh: refresh,
    getAll: getAll,
    getById: getById,
    getByRegion: getByRegion,
    getByType: getByType,
    getTopCrisisIds: getTopCrisisIds,
    isTopCrisis: isTopCrisis
  };
})();
