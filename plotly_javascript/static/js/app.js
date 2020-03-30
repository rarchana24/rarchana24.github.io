

/**************************************************************************************************************************************************************** */
//ICE BREAKER TO UNDERSTAND DATA
/**************************************************************************************************************************************************************** */
// read the json file and try to write in a console using https call
d3.json("./Data/samples.json").then((data) =>{
    console.log(data);

    // get washing frequency as a trial to understand how the data works
    var washing_frequency = data.metadata.map(d =>d.wfreq)
    console.log(`washing_frequency:${washing_frequency}`)

    // get samples for id
    //var samples = data.samples.map(s =>s.id)
    var samples = data.samples;
    console.log(samples);

    var samples_id = samples.map(s =>s.id )[0];
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

    //get top 10 OTU id
    var OTU_top = data.samples.map(s => s.otu_ids)
    console.log(`OTU_top :${OTU_top}`);

    //sort OTU_top values descending get largest to small 
    var sorted_otu_top = OTU_top.sort(function sort_otu_top(a,b){
         return b-a;
     });
     console.log(sorted_otu_top);

    // sliced sorted_otu_top values 
    var sliced_otu_top = OTU_top.slice(0,10);
    console.log(sliced_otu_top);
    // reversed sliced values
    var reverse_otu_top = sliced_otu_top.reverse();
    console.log(reverse_otu_top);
    console.log(reversed_samplevalues);

    // use this OTU_id for plotting the graph
    var OTU_id = reverse_otu_top.map(d => "OTU " + d)
    console.log(`OTU IDs :${OTU_id}`);

    //get labels by reading the json file

    var OTU_labels = data.samples.map(s =>s.otu_labels)
    console.log(`OTU labels: ${OTU_labels}`);
    // get top 10 labels 
    
    var top_ten_lables = OTU_labels.slice(0,10);
    console.log(top_ten_lables);
    
    // OTU_id : reverse_otu_top
    // sample values: reversed_samplevalues
    // OTU_labels : OTU_labels

     // braces for first line

}); // end braces for get plot function

/********************************************************************************************************************************************************** */
// Functions to bubble plot
/********************************************************************************************************************************************************** */
function buildCharts(new_samples) {
    d3.json("./Data/samples.json").then((data) =>{
        let samples = data.samples.filter(s=>s.id.toString()===new_samples)[0];
        console.log(samples);

        

    let x_axis = samples.otu_ids;
   console.log(x_axis);
//earlier it was data.samples[0]
    let y_axis = samples.sample_values;
    //console.log(y_axis);
    let size = samples.sample_values;
    //console.log(size);
    let color = samples.otu_ids;
    //console.log(color);
    let texts = samples.otu_labels;
    //console.log(texts);
/************************************************************************************************************************************************************* */
//                                                                      BUBBLE GRAPH PLOTTING
/************************************************************************************************************************************************************* */
    let bubble_trace ={
        x:  x_axis,
        y: y_axis,
        text: texts,
        mode:`markers`,
        marker:{
            size: size,
            color: color,
            colorscale: "Earth"
        }

    }; // braces for bubble trace

    let data_bubble =[bubble_trace];
    let layout_bubble = {
		"titlefont": {
    "size": 20,
	"color":"green"
		},
        title: `<b>Umbilical Flora Population - Sample ID :</b><i> ${new_samples}`,
        xaxis : {
			title : "OTU ID",
			titlefont:{color:"green",size:15}
		},
        height:400,
        width:600,
		
		



    };
    Plotly.newPlot("bubble",data_bubble,layout_bubble);


/************************************************************************************************************************************************************* */
//                                                                      BAR GRAPH PLOTTING
/************************************************************************************************************************************************************* */

let bar_trace ={
    x: samples.sample_values.slice(0,10).reverse(),
	y: samples.otu_ids.map(name => `OTU ${name}`).slice(0,10).reverse(),
    //y: samples.otu_ids.slice(0,10).reverse(),
    text: samples.otu_labels.slice(0,10).reverse(),
    type:"bar",
    orientation:"h",
    // marker: {
    //     color: 'rgb(142,124,195)'}
};

let data_bar =[bar_trace];
let layout_bar ={
			"titlefont": {
    "size": 20,
	"color":"green"
		},
    title: `<b>Umbilical Flora Population - Sample ID :</b><i> ${new_samples}`,
    xaxis : {
		title: "Sample Values",
		titlefont:{color:"green",size:12}
		},
    yaxis : {
        tickmode:"linear",
    },
    margin:{
        l:100,
        r:100,
        t:100,
        b:30
    }



};

Plotly.newPlot("bar",data_bar,layout_bar);

/************************************************************************************************************************************************************* */
//                                                                      GUAGE GRAPH PLOTTING
/************************************************************************************************************************************************************* */
let metadata_id = data.metadata.filter(m=>m.id.toString()===new_samples)[0];
console.log(metadata_id);
var washing_frequency = metadata_id.wfreq;
console.log(`washing_frequency:${washing_frequency}`)

var trace_guage = {
    value: parseInt(washing_frequency),

    title: { 
			
        text: '<b>Belly Button Washing Frequency</b> <br><i> Scrubs per Week</i> ' ,

    },
    titlefont:{
        size:20,
        color:"green"
    },
    type: "indicator",
    mode: "gauge+number",
    gauge: { 
        axis: { range: [null, 9] },
        steps: [
            { range: [0, 2], color: "yellow" },
            { range: [2, 4], color: "cyan" },
            { range: [4, 6], color: "teal" },
            { range: [6, 8], color: "lime" },
            { range: [8, 9], color: "green" },
      ],
      bar: {color: "#AF4D43"},
    }
};

var data_guage =[trace_guage];
var layout_guage = { 

    width: 500, 
	height: 450,
    margin: { t: 0, b: 0 } 
};

Plotly.newPlot("gauge", data_guage, layout_guage);

/************************************************************************************************************************************************************* */
//                                                                      PIE CHART
/************************************************************************************************************************************************************* */
// get the data sliced from bar graph
var pie_trace = {
    values: samples.sample_values.slice(0,10).reverse(),
    labels: samples.otu_ids.slice(0,10).reverse(),
    type: "pie",
    hovertext: samples.otu_labels.slice(0,10).reverse(),
    textinfo:'percent'
  };

var pie_data =[pie_trace];
var pie_layout = {
			"titlefont": {
    "size": 20,
	"color":"green"
		},
    title: `<b>PIE CHART</b>`

};

Plotly.newPlot("pie",pie_data,pie_layout);


    }); //json function braces

};

/********************************************************************************************************************************************************** */
// Create function to load necessary data in the html 
/********************************************************************************************************************************************************** */
function buildMetadata(new_samples){
    //read data from the json file 
    d3.json("./Data/samples.json").then((data) => {
        //get the metadata from the file 

        var metadata = data.metadata;
        console.log(metadata);

        // filter the metadata and get the id 
        var metadata_id = metadata.filter(meta => meta.id.toString() ===new_samples )[0];
        console.log(metadata_id);
        // populate the demographic data
        var demographic_info = d3.select("#sample-metadata");
        // clear the demographic_info 
        demographic_info.html("");
        //use object.entries  to add each key and value pair to the panel 
        Object.entries(metadata_id).forEach(([key,value]) =>{
            demographic_info.append("h5").text(`${key.toUpperCase()}: ${value}`);


        });

   });
}   


    //create the function for data rendering 
    function init() {
        //drop down 
        var dropdown = d3.select("#selDataset");
        //read the data 
        d3.json("./Data/samples.json").then((data) =>{
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
