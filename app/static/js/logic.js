//EARTHQUAKE MAP

//Marker Size Function
function markerSize(mag){
  let radius = 1;

  if (mag > 6){
    radius = mag ** 7
  } else if (mag > 0){
    radius = mag ** 7.5
  }
  return radius;
}

//Marker Color Function
function markerColor(depth) {
  let color = "black";

  //Switch on earthquake depth
  if (depth <= 10) {
    color = "#98EE00";
  } else if (depth <= 30) {
    color = "#D4EE00";
  } else if (depth <= 50) {
    color = "#EECC00";
  } else if (depth <= 70) {
    color = "#EE9C00";
  } else if (depth <= 90) {
    color = "#EA822C";
  } else {
    color = "#EA2C2C";
  }

  // return color
  return (color);
}

// BUILD MAP FUNCTION
function buildMap(data, geo_data) {

  //STEP 1: BASE LAYERS
  //Street Map
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  //Topography 
  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  //Positron - chat gbt
  let positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
  });

  //Dark - chat gbt 
  let darkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
  });
  
  
  //STEP 2: OVERLAY LAYERS 
  //Markers
  let markers = L.markerClusterGroup();

  //Lists to store coords
  let heatArray = [];
  let circleArray = [];

  //Data for coords
  for (let i = 0; i < data.length; i++){
    let row = data[i];
    let location = row.geometry;

    // create marker
    if (location) {
      // extract coord
      let point = [location.coordinates[1], location.coordinates[0]];
      let magnitude = row.properties.mag;
      let depth = location.coordinates[2];

      //marker with special icon
      let marker = L.marker(point,  { 
        icon: L.ExtraMarkers.icon({
          shape: 'penta',
          markerColor: "royalblue",
          prefix: 'fa',
          icon: 'fa-spinner',
          iconRotate: 0,
          extraClasses: 'fa-spin',
          number: '',
          svg: true
        })
      });

      // define pop up information
      let popup = `<h2>${row.properties.title}</h2><hr>
                    <h3>Location: ${row.properties.place}</h3><hr>
                    <h3>Magnitude: ${magnitude}</h3><hr>
                    <h3>Depth: ${depth} km</h3><hr>`;
      marker.bindPopup(popup);
      markers.addLayer(marker);

      // add to heatmap
      heatArray.push(point);

      // make marker
      let circleMarker = L.circle(point, {
        radius: markerSize(magnitude),
        color: markerColor(depth),
        fillColor: markerColor(depth),
        fillOpacity: 0.8
      }).bindPopup(popup);

      // add circle to map
      circleArray.push(circleMarker);
    }
  };

  //Create Heatmap Layer
  let heatLayer = L.heatLayer(heatArray, {
    radius: 40,
    blur: 20
  });

  //Create Circle Layer
  let circleLayer = L.layerGroup(circleArray);

  //Create Tetonic Plate Layer
  let platesLayer = L.geoJSON(geo_data, {
    style: {
      "color": "purple",
      "weight": 2.5
    }
  });

  //STEP 3: LAYER CONTROLS
  //Base Controls 
  let baseLayers = {
    Street: street,
    Topography: topo,
    Positron: positron,
    Dark: darkMatter
  };

  // Overlay Controls
  let overlayLayers = {
    Markers: markers,
    Heatmap: heatLayer,
    Circles: circleLayer,
    "Tectonic Plates": platesLayer
  };

  //STEP 4: INIT MAP
  let myMap = L.map("map", {
    center: [27.5531, 52.8805],
    zoom: 2,
    layers: [darkMatter, circleLayer, platesLayer]
  });
  
  //STEP 5: LAYER CONTORL FILTER
  L.control.layers(baseLayers, overlayLayers).addTo(myMap);

  //STEP 6: LEGEND - in HTML
}

//FETCH DATA & RENDER MAP
function runIt() {

  //URL for API queries
  let data_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  let geo_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

  //Earthquake Data
  d3.json(data_url).then(function (data) {

    //Tetonic Plate Data
    d3.json(geo_url).then(function (geo_data){
      //define data to be used
      let quake_data = data.features;


      //Build Map Using Data
      buildMap(quake_data, geo_data);
    });
  });
}
  
runIt();
  