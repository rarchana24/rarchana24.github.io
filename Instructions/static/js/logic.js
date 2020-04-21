// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
//var queryUrl ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";


// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data.features);
   createFeatures(data.features);

   // add color for magnitudes
});

  function chooseColor(magnitude)
  { 
  
  var colors = ['lightgreen','yellowgreen','#FCBBA1','gold','orange','#ff6347','#FFA07A','#99000d'] ;
  // magnitudes <=1, <=2,<=3,<=4,<=5,<=6,<=7,>=7
  
    if (magnitude > 7 ) {
        return colors[7];
    } else if (magnitude > 6  ) {
        return colors[6];
    } else if (magnitude > 5 ) {
        return colors[5];
    } else if (magnitude > 4 ) {
        return colors[4];
    } else if (magnitude > 3) {
        return colors[3];
    } else if(magnitude > 2){
        return colors[2];
    } else if(magnitude > 1){ 
        return colors[1];
    } else if(magnitude < 1){ 
        return colors[0];
    }
  };


function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {

    var timestamp = new Date(feature.properties.time);
    var date = timestamp.toDateString();
    var time = timestamp.toTimeString();
    var magnitude = feature.properties.mag;
	var place = feature.properties.place;


    // layer.bindPopup("<h3>" + feature.properties.place +
    // "</h3><hr><p> Magnitude:" + feature.properties.mag + "</p><hr>" +
    //   "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");

    layer.bindPopup("<h3>Magnitude: " + magnitude + "</h3> <hr> <h5>" + place + "</h5><h5>" + date + "</h5><h5>" + time + "</h5>");
  }
// choose colors

 

 


  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return new L.circleMarker(latlng, { //earlier circleMarker
      stroke: false,
      fillOpacity: 0.8,
      color:chooseColor(feature.properties.mag),
      fillColor: chooseColor(feature.properties.mag),
      radius: (feature.properties.mag)*3
      })
    }
    
  });
 

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
 
var piratemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
 id:"mapbox.pirates",
  accessToken: API_KEY
});

var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
 id:"mapbox.light",
  accessToken: API_KEY
});

var satmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
 id:"mapbox.satellite",
  accessToken: API_KEY
});

var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
 id:"mapbox.run-bike-hike",
  accessToken: API_KEY
});

var streetbasicmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
 id:"mapbox.streets-basic",
  accessToken: API_KEY
});

var highContrastMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
 id:"mapbox.high-contrast",
  accessToken: API_KEY
});

var terrainMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
 id:"mapbox.mapbox-terrain-v2",
  accessToken: API_KEY
});





var tectonicPlates = new L.LayerGroup();
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json", function (plateData) {
    L.geoJSON(plateData,
      {
        color: 'purple',
        weight: 3
      }).addTo(tectonicPlates);
}); 

//heatmap


//end heatmap
  


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap,
  "Pirate Map": piratemap,
  "Light Map": lightmap,
  "Satellite Map": satmap,
  "Outdoor Map": outdoormap,
  "Street Basic": streetbasicmap,
  "High Contrast":highContrastMap,
  "Terrain": terrainMap,
 

	
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates,



  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes,tectonicPlates]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps,  {
    collapsed: false
  }).addTo(myMap);

  //adding legends
var legend = L.control({ position: "bottomright" });
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend"),
   colors = ['lightgreen','yellowgreen','#FCBBA1','gold','orange','#ff6347','#FFA07A','#99000d'] ;
  labels = ["<strong> < 1 "," < 2 "," < 3 "," < 4 "," < 5 "," < 6 "," < 7 "," > 7 </strong>"];
  div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>" 
    for (var i = 0; i < labels.length; i++) {
    div.innerHTML += 
  
        '<i style="background-color:'  +colors[i] + '">&nbsp&nbsp&nbsp&nbsp'+labels[i]+'</i><br>';
  }


  return div;
};
legend.addTo(myMap);
// add fault lines 
}



