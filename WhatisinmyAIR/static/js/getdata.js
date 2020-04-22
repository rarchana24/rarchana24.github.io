//Load the HTML table with data
  //var queryUrl = "metadata.json";
  //var queryUrl = "WAQI_info.json";
  var queryUrl = "./data/WAQI_info.json";
  d3.json(queryUrl).then(function(data) {
      console.log(data);
      var metadata = data.metadata;
      var samples = data.samples;
      
      console.log(metadata);
      console.log(samples);


      for(var index = 0; index < metadata.length; index++){
    
        var citynames  = metadata[index];
        var pollutants = samples[index];
        
        var city = citynames.names;
        var aqi = citynames.aqi;
        var dominantpollutant = citynames.DominantPollutant;
        var datetime = citynames.datetime;
        var CO = pollutants.sample_values[0];
        var NO2 = pollutants.sample_values[1];
        var O3 = pollutants.sample_values[2];
        var PM10 = pollutants.sample_values[3];
        var PM25 = pollutants.sample_values[4];
        var SO2 = pollutants.sample_values[5];
        
        console.log(city);
        console.log(aqi);
        console.log(dominantpollutant);
        console.log(datetime);
        var table = d3.select("#summary-table");
        var tbody = table.select("tbody");
        var trow;
        trow = tbody.append("tr");
        trow.append("td").text(city);
        trow.append("td").text(aqi);
        trow.append("td").text(dominantpollutant);
        trow.append("td").text(datetime);
        trow.append("td").text(CO);
        trow.append("td").text(NO2);
        trow.append("td").text(O3);
        trow.append("td").text(PM10);
        trow.append("td").text(PM25);
        trow.append("td").text(SO2);


 
      }
  });

