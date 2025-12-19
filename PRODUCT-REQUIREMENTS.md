# Product Requirements: CrisisTarget

## Product Vision

**What:** An interactive world map that visualizes humanitarian crises with heat mapping, showing urgency levels and connecting users to verified charitable organizations providing relief.

**Why:** To increase global awareness of humanitarian needs and reduce friction for donors who want to help—making it easy to discover crises and find trusted organizations to support.

**Who:** General public and donors seeking to understand global crises and contribute to relief efforts.

**Success Criteria:**
- Users can explore crises on an interactive map within seconds of loading
- Each crisis clearly shows urgency level and affected population
- Users can easily find and click through to donate to verified charities
- Site works reliably with graceful fallbacks when APIs are unavailable

---

## User Stories

**As a** concerned citizen  
**I want** to see a visual overview of global humanitarian crises  
**So that** I can understand where help is needed most

**As a** potential donor  
**I want** to click on a crisis and see verified charities helping there  
**So that** I can donate with confidence to effective organizations

**As a** returning visitor  
**I want** to see updated crisis information each time I visit  
**So that** I stay informed about current needs

**As a** user interested in a specific region  
**I want** to filter crises by region, type, or urgency  
**So that** I can focus on causes I care about most

**As a** mobile user  
**I want** to use the map on my phone  
**So that** I can explore and donate from anywhere

---

## Functional Requirements

### Map Display
- [ ] **REQ-001:** System shall display an interactive world map using Leaflet.js
- [ ] **REQ-002:** Map shall show heat layer indicating crisis urgency (yellow to red gradient)
- [ ] **REQ-003:** Map shall display markers for each active humanitarian crisis
- [ ] **REQ-004:** Map shall support zoom (2x to 10x) and pan controls
- [ ] **REQ-005:** Map shall be responsive and work on mobile devices

### Crisis Data
- [ ] **REQ-006:** System shall fetch crisis data from ReliefWeb API on page load
- [ ] **REQ-007:** System shall fetch natural disaster data from GDACS API
- [ ] **REQ-008:** System shall display all available crises on the map
- [ ] **REQ-009:** System shall highlight Top 10 most urgent crises per region
- [ ] **REQ-010:** System shall refresh data on manual refresh button click
- [ ] **REQ-011:** System shall refresh data on new session/visit
- [ ] **REQ-012:** System shall use fallback mock data if APIs are unavailable

### Crisis Information
- [ ] **REQ-013:** Each crisis shall display: name, type, country, urgency level (1-5)
- [ ] **REQ-014:** Each crisis shall show affected population count
- [ ] **REQ-015:** Each crisis shall include brief description
- [ ] **REQ-016:** Crisis urgency shall be color-coded (1=yellow to 5=red)
- [ ] **REQ-017:** Crisis type shall be indicated by icon (conflict, disaster, famine, disease, refugee)

### Crisis Types Supported
- [ ] **REQ-018:** System shall categorize crises as: Armed Conflict
- [ ] **REQ-019:** System shall categorize crises as: Natural Disaster
- [ ] **REQ-020:** System shall categorize crises as: Famine/Food Crisis
- [ ] **REQ-021:** System shall categorize crises as: Disease Outbreak
- [ ] **REQ-022:** System shall categorize crises as: Refugee Crisis

### Modal Popup
- [ ] **REQ-023:** Clicking a crisis marker shall open a modal popup
- [ ] **REQ-024:** Modal shall display full crisis details
- [ ] **REQ-025:** Modal shall list related charitable organizations
- [ ] **REQ-026:** Modal shall have close button (X) and click-outside-to-close
- [ ] **REQ-027:** Modal shall be scrollable if content exceeds viewport

### Charity Integration
- [ ] **REQ-028:** System shall fetch charity data from Charity Navigator API (when available)
- [ ] **REQ-029:** System shall only display charities with 3+ star rating
- [ ] **REQ-030:** System shall display maximum 5 charities per crisis
- [ ] **REQ-031:** Charities shall be sorted by relevance to crisis type
- [ ] **REQ-032:** System shall use mock charity data until API key is available

### Charity Display
- [ ] **REQ-033:** Each charity card shall show: name, rating (stars), category
- [ ] **REQ-034:** Each charity card shall have "Donate" button linking to charity website
- [ ] **REQ-035:** Each charity card shall have "Website" link
- [ ] **REQ-036:** Donate links shall open in new tab with secure attributes

### Filtering
- [ ] **REQ-037:** System shall provide filter by crisis type (checkboxes)
- [ ] **REQ-038:** System shall provide filter by region (dropdown or checkboxes)
- [ ] **REQ-039:** System shall provide filter by urgency level (range slider 1-5)
- [ ] **REQ-040:** System shall provide "Reset Filters" button
- [ ] **REQ-041:** Filters shall update map markers in real-time
- [ ] **REQ-042:** Active filters shall be visually indicated

### User Interface
- [ ] **REQ-043:** Page shall have header with logo/title
- [ ] **REQ-044:** Page shall have map legend explaining urgency colors
- [ ] **REQ-045:** Page shall show loading indicator during data fetch
- [ ] **REQ-046:** Page shall display error message if data load fails
- [ ] **REQ-047:** Page shall have "Refresh Data" button
- [ ] **REQ-048:** All interactive elements shall have hover states

### Regions
- [ ] **REQ-049:** System shall support region: Africa
- [ ] **REQ-050:** System shall support region: Asia
- [ ] **REQ-051:** System shall support region: Europe
- [ ] **REQ-052:** System shall support region: Middle East
- [ ] **REQ-053:** System shall support region: Americas
- [ ] **REQ-054:** System shall support region: Oceania

---

## Acceptance Criteria

### AC1: Initial Map Load
- **Given** a user visits the Crisis Map page
- **When** the page loads
- **Then** the map displays centered on world view
- **And** crisis data is fetched from APIs (or fallback loaded)
- **And** heat layer renders showing urgency hotspots
- **And** crisis markers appear at correct coordinates
- **And** loading indicator shows during data fetch

### AC2: Click Crisis Marker
- **Given** the map is loaded with crisis markers
- **When** user clicks a crisis marker
- **Then** modal popup opens with crisis details
- **And** crisis name, type, urgency, and description display
- **And** affected population count is shown
- **And** related charities load and display (up to 5)

### AC3: Charity Display
- **Given** modal is open for a crisis
- **When** charities are displayed
- **Then** only charities with 3+ star rating appear
- **And** maximum 5 charities are shown
- **And** each charity shows name, rating, and category
- **And** "Donate" button links to charity donation page

### AC4: Donate Link Click
- **Given** modal is open showing charities
- **When** user clicks "Donate" button
- **Then** charity donation page opens in new tab
- **And** link includes `rel="noopener noreferrer"` for security
- **And** original Crisis Map page remains open

### AC5: Filter by Crisis Type
- **Given** crises are displayed on map
- **When** user unchecks "Armed Conflict" filter
- **Then** armed conflict crises are hidden from map
- **And** heat layer updates to reflect filtered data
- **And** filter checkbox shows unchecked state

### AC6: Filter by Region
- **Given** crises are displayed on map
- **When** user selects "Africa" region only
- **Then** only African crises display on map
- **And** map zooms/pans to show Africa region
- **And** other region crises are hidden

### AC7: Filter by Urgency
- **Given** crises are displayed on map
- **When** user sets urgency slider to "4-5"
- **Then** only Severe and Critical crises display
- **And** lower urgency crises are hidden
- **And** heat layer updates accordingly

### AC8: Reset Filters
- **Given** user has applied multiple filters
- **When** user clicks "Reset Filters"
- **Then** all filters return to default (all selected)
- **And** all crises display on map
- **And** map returns to world view

### AC9: API Failure Fallback
- **Given** ReliefWeb API is unavailable
- **When** page attempts to load data
- **Then** system loads fallback mock data
- **And** user sees crises on map (from mock data)
- **And** subtle indicator shows "Using cached data"

### AC10: Manual Refresh
- **Given** user has been on page for some time
- **When** user clicks "Refresh Data" button
- **Then** loading indicator appears
- **And** fresh data is fetched from APIs
- **And** map updates with new data
- **And** success/error message displays

### AC11: Mobile Responsiveness
- **Given** user accesses site on mobile device
- **When** page loads
- **Then** map fills available screen width
- **And** filter panel is collapsible/hidden by default
- **And** modal is full-screen on mobile
- **And** touch gestures work for map navigation

### AC12: Top 10 Per Region
- **Given** crises are loaded on map
- **When** user views a region
- **Then** top 10 most urgent crises in that region are highlighted
- **And** highlighting is visual (larger marker, badge, or glow)

---

## Data Specifications

### Urgency Levels

| Level | Label | Color | Description |
|-------|-------|-------|-------------|
| 1 | Monitoring | #FFEB3B (Yellow) | Situation being monitored |
| 2 | Elevated | #FFC107 (Amber) | Elevated concern |
| 3 | High | #FF9800 (Orange) | Significant humanitarian need |
| 4 | Severe | #FF5722 (Deep Orange) | Severe humanitarian emergency |
| 5 | Critical | #F44336 (Red) | Critical - immediate action needed |

### Crisis Types

| Type | Icon | Color | Examples |
|------|------|-------|----------|
| Armed Conflict | ⚔️ | #E53935 | Wars, civil conflicts |
| Natural Disaster | 🌪️ | #FF9800 | Earthquakes, floods, hurricanes |
| Famine | 🍽️ | #795548 | Food insecurity, drought |
| Disease Outbreak | 🦠 | #9C27B0 | Epidemics, pandemics |
| Refugee Crisis | 🏃 | #2196F3 | Mass displacement, migration |

### Charity Rating Threshold

| Rating | Display | Eligibility |
|--------|---------|-------------|
| 0-2 stars | Not shown | ❌ Below threshold |
| 3 stars | ⭐⭐⭐ | ✅ Displayed |
| 4 stars | ⭐⭐⭐⭐ | ✅ Displayed (preferred) |

### Regional Definitions

| Region | Countries Include | Map Bounds |
|--------|-------------------|------------|
| Africa | 54 African nations | [-35, -20] to [37, 55] |
| Asia | East, South, Southeast Asia | [-10, 25] to [55, 180] |
| Europe | EU + Eastern Europe | [35, -25] to [72, 65] |
| Middle East | MENA region | [12, 25] to [45, 65] |
| Americas | North + South America | [-55, -170] to [70, -30] |
| Oceania | Australia, Pacific Islands | [-50, 110] to [0, 180] |

---

## Non-Functional Requirements

### Performance
- Page initial load: < 3 seconds on broadband
- Map interaction: < 100ms response time
- API data fetch: < 5 seconds with loading indicator
- Support 100+ simultaneous crises without lag

### Reliability
- Graceful degradation when APIs fail
- Fallback data always available
- No JavaScript errors in console during normal use

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Security
- All external links use `rel="noopener noreferrer"`
- No sensitive data stored client-side
- API keys not exposed in client code (future: proxy)

---

## Out of Scope (v1.0)

The following are explicitly NOT included in initial release:

- ❌ User accounts or authentication
- ❌ Saving favorite crises or charities
- ❌ Embedded donation forms
- ❌ Real-time push updates
- ❌ Multi-language support
- ❌ Historical crisis data/trends
- ❌ Social sharing features
- ❌ Email notifications
- ❌ Offline support (PWA)
- ❌ Accessibility (WCAG) compliance

---

## Success Metrics

### Primary Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Crises Explored | 3+ per session | Click events on markers |
| Charity Links Clicked | 1+ per session | Click events on donate buttons |
| Page Load Success | 99%+ | No critical errors |

### Quality Metrics
| Metric | Target |
|--------|--------|
| Console Errors | 0 during normal use |
| Mobile Usability | Functions on all test devices |
| API Fallback | Works seamlessly when APIs down |

---

## Open Questions & Decisions

| # | Question | Decision | Date |
|---|----------|----------|------|
| 1 | Data refresh frequency | Manual + new session | 12/18/24 |
| 2 | Crises displayed | All, Top 10 highlighted per region | 12/18/24 |
| 3 | Charity rating threshold | 3+ stars only | 12/18/24 |
| 4 | Max charities per crisis | 5 | 12/18/24 |
| 5 | MVP scope | Working map first, filters later | 12/18/24 |
| 6 | API key handling | Mock data first, keys added later | 12/18/24 |
| 7 | Hosting | GitHub Pages | 12/18/24 |

---

## Related Documents

- **AGENTS.md:** Technical conventions, data models, API details
- **IMPLEMENTATION-PLAN.md:** Development phases and timeline
- **README.md:** User-facing documentation
