var myMap =new L.map("map",{
    center :new L.LatLng(25.6586, -80.3568),
	//37.09,-95.71
	//center : [10.0902, -95.7129],
	//center : [20.5937,-78.9629],
    zoom:4,
	//layers: [basemap, heatmapLayer]

});

//var myMap = L.map('map').setView([42.35, -71.08], 13);
//var myMap = L.map('map').setView([10.0902, -95.7129], 13);

var basemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoicmFyY2hhbmEyNCIsImEiOiJjazhsb3hlNWYwZXVjM2ludzFkNjN1cno1In0.1m9sK2pk6AEqWLQ6oBOgzg"
    }).addTo(myMap);

//var data = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
var data = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(data,function(response){
    console.log(response.features);//response.features[1].geometry
	console.log(response.features[0].geometry);
	var getData = response.features;
	console.log(getData);
    var heatArray =[];
    for (var i=0;i<getData.length; i++)
    {
        var location = getData[i].geometry;
		
        if(location){
           // L.marker([location.coordinates[1],location.coordinates[0]]);
           heatArray.push([location.coordinates[1], location.coordinates[0]]);
        }
    }
	console.log(heatArray);

    var heatmapLayer =L.heatLayer(heatArray,{
        radius:55,
		"maxOpacity": .8,
		"scaleRadius": true, 
		"useLocalExtrema": true,
        //blur:20
		
    });
	myMap.addLayer(heatmapLayer);

});