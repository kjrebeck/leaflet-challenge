# Leaflet Challenge

## Overview

This project uses Leaflet and **United States Geological Survey (USGS)** GeoJSON data from the last seven days to visualize earthquake activity on a map. 

## Libraries/Language

1. HTML
2. Javascript
3. CSS
4. GeoJSON
5. Leaflet
6. OSM
7. Font-Awesome

### Earthquake Visualization

1. **Datasets:**
   - Earthquake Data [USGS GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) 
   - Tectonic Plate Data [Tectonic Plate GeoJSON](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json) 

2. **Map Visualization:**
   - Utilized Leaflet to create a map that plots all the earthquakes based on their longitude and latitude with popups that provide additional information.
   - Plotted tectonic plate data to illustrate the relationship between tectonic plates and seismic activity.
   - Circle markers reflect the earthquake's magnitude by size and depth by color. Larger markers represent higher magnitudes, and darker colors indicate greater depth.
   - Extra Marker/Icon reflect location of each earthquake sourced from [ExtraMarkers] https://github.com/coryasilva/Leaflet.ExtraMarkers
   
3. **Layer Controls:**
   - Base Layers: 
      - Street 
      - Topography
      - Positron
      - Dark Matter
   - Overlay Layers: 
      - Clustered Markers
      - Non Clustered Markers 
      - Heatmap
      - Circles

## Works Cited 

Silva, C. (2023). Leaflet.ExtraMarkers. GitHub. https://github.com/coryasilva/Leaflet.ExtraMarkers
