
/**************************************************************************************************************************************************************** */
//ICE BREAKER TO UNDERSTAND DATA
/**************************************************************************************************************************************************************** */
// read the json file and try to write in a console using https call
d3.json("./data/WAQI_info.json").then((data) =>{
    console.log(data);
    // get aqi(air quality index) as a trial to understand how the data works
    var aqi = data.metadata.map(d =>d.aqi)
    console.log(`air quality index:${aqi}`)

    // get samples for id
    //var samples = data.samples.map(s =>s.id)
    var samples = data.samples;
    console.log(samples);

    var samples_id = samples.map(s =>s.names )[0];
    console.log(`samples_id :${samples_id}`)

    //sample values from data file
    var samplevalues = data.samples.map(s => s.sample_values)
    console.log(`sample_values:${samplevalues}`)

    //sorted samplevalues descending get largest to small
    var sorted_samplevalues = samplevalues.sort(function sortFunction(a,b) {
        return b-a;
    });
    console.log(sorted_samplevalues);

    //sliced sample values and got top 10 values
    var sliced_samplevalues = samplevalues.slice(0,10);
    console.log(sliced_samplevalues);
    // reverse the sliced sample values 
    var reversed_samplevalues = sliced_samplevalues.reverse();
    console.log(reversed_samplevalues);

    var PTU_top = data.samples.map(s => s.ptu_ids)
    console.log(`OTU_top :${PTU_top}`);

    //sort OTU_top values descending get largest to small 
    var sorted_ptu_top = PTU_top.sort(function sort_ptu_top(a,b){
            return b-a;
        });
    console.log(sorted_ptu_top);

    // sliced sorted_otu_top values 
    var sliced_ptu_top = PTU_top.slice(0,10);
    console.log(sliced_ptu_top);
    // reversed sliced values
    var reverse_ptu_top = sliced_ptu_top.reverse();
    console.log(reverse_ptu_top);
    console.log(reversed_samplevalues);
}); // end braces for get plot function

/********************************************************************************************************************************************************** */
// Functions to bubble plot
/********************************************************************************************************************************************************** */
function buildCharts(new_samples) {
    d3.json("./data/WAQI_info.json").then((data) =>{
        let samples = data.samples.filter(s=>s.names.toString()===new_samples)[0];
        console.log(samples);




/************************************************************************************************************************************************************* */
//                                                                      BAR GRAPH PLOTTING
/************************************************************************************************************************************************************* */

let bar_trace ={
    //x: samples.sample_values.slice(0,10).reverse(),
	//y: samples.ptu_labels.map(name => `${name}`).slice(0,10).reverse(),
    x:samples.ptu_labels,
    y:samples.sample_values,
    text: samples.ptu_labels,
    type:"bar",
    //orientation:"h",

     marker: {
         //color: 'rgba(75, 192, 192, 0.5)',
         //color:'teal',
         border: 'black',
         line: {
            color: 'black',
            width: 1.5
          },
         
            color: ['red', 'blue', 'brown', 'grey', 'orange','purple']
        
		},
};

let data_bar =[bar_trace];
let layout_bar ={
			"titlefont": {
    "size": 14,
	"color":"black"
		},
    title: `<b>Pollutants :</b><i> ${new_samples}`,
    xaxis : {
        tickangle: -45,
		//title: "Contaminant Amount",
        font:{
            family: 'Raleway, sans-serif'
          },
        },
        showlegend: false,
    yaxis : [{

        zeroline: false,
        gridwidth: 2,
    }],
    margin:{
        l:50,
        r:50,
        t:80,
        b:50
    },
    bargap :0.05,
    //paper_bgcolor: "lightgrey"

};

Plotly.newPlot("bar",data_bar,layout_bar);

/************************************************************************************************************************************************************* */
//                                                                      GUAGE GRAPH PLOTTING
/************************************************************************************************************************************************************* */
let metadata_id = data.metadata.filter(m=>m.names===new_samples)[0];
console.log(metadata_id);
var air_quality_index = metadata_id.aqi;
console.log(`AQI:${air_quality_index}`)

var trace_guage = {
    value: parseInt(air_quality_index),

    title: { 
			
        text: `<b>Air Pollution Level</b><i> ${new_samples}</i> <br>` ,

    },
    titlefont:{
        size:14,
        color:"black"
    },
    type: "indicator",
    mode: "gauge+number",
    gauge: { 
        axis: { range: [null, 400], tickwidth: 1, tickcolor: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
            { range: [0, 50], color: "green" },
            { range: [51, 100], color: "yellow" },
            { range: [101, 150], color: "orange" },
            { range: [151, 200], color: "red" },
            { range: [201, 300], color: "purple" },
            { range: [301, 400], color: "brown" },  
      ],
      bar: {
          //color: "#AF4D43"
          color: "black"

        },

    }
};

var data_guage =[trace_guage];
var layout_guage = { 

    width: 350, 
    height: 450,
    //margin: { t: 25, r: 30, l: 25, b: 25 },
    margin: { t: 0, b: 0 },
    //paper_bgcolor: "lavender"
};

Plotly.newPlot("gauge", data_guage, layout_guage);

    }); //json function braces

};

/********************************************************************************************************************************************************** */
// Create function to load necessary data in the html 
/********************************************************************************************************************************************************** */
function buildMetadata(new_samples){
    //read data from the json file 
    d3.json("./data/WAQI_info.json").then((data) => {
        //get the metadata from the file 

        var metadata = data.metadata;
        console.log(metadata);

        // filter the metadata and get the id 
        var metadata_names = metadata.filter(meta => meta.names ===new_samples )[0];
        console.log(metadata_names);
        // populate the demographic data
        var location_info = d3.select("#sample-metadata");
        // clear the demographic_info 
        location_info.html("");
        //use object.entries  to add each key and value pair to the panel 
        Object.entries(metadata_names).forEach(([key,value]) =>{
            location_info.append("h5").text(`${key.toUpperCase()}: ${value}`);


        });

   });
} 

//create the function for data rendering 
function init() {
    //drop down 
    var dropdown = d3.select("#selDataset");
    //read the data 
    d3.json("./data/WAQI_info.json").then((data) =>{
        console.log(data);
        //get the id data from the dropdown 
        data.names.forEach(function(name){
            dropdown
            .append("option")
            .text(name)
            .property("value");

        });

        //call the function to display the data and the plots to the page 

        buildCharts(data.names[0]);
        buildMetadata(data.names[0]);

    });
}

    // function for change 
    function optionChanged(new_samples){
        buildCharts(new_samples);
        buildMetadata(new_samples);
    }


init();