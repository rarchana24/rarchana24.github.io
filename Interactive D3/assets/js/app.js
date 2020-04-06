// @TODO: YOUR CODE HERE!
// Code for Chart is Wrapped Inside a Function That Automatically Resizes the Chart
 //=================================================================================
function makeResponsive() {

  // If SVG Area is not Empty When Browser Loads, Remove & Replace with a Resized Version of Chart
   //=============================================================================================
  var svgArea = d3.select("body").select("svg");

  // Clear SVG is Not Empty
   //=================================================================================
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  

// set up chart dimension
 //=================================================================================
var svgWidth = 960;
var svgHeight = 500;

//set SVG margins
 //=================================================================================

var margin = {
  top: 20,
  right: 40,
  bottom: 90,
  left: 100
};
//define dimension of the chart area
 //=================================================================================
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
 //=================================================================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append Group Element & Set Margins - Shift (Translate) by Left and Top Margins Using Transform
 //=================================================================================
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
 //=================================================================================
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
 //=================================================================================
function xScale(demoData, chosenXAxis) {
  // Create Scale Functions for the Chart (chosenXAxis)
   //=================================================================================
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(demoData, d => d[chosenXAxis]) -1, //* 0.8, //poverty
      d3.max(demoData, d => d[chosenXAxis]) //* 1.2 // age median
	  //d3.max(demoData, d => d[chosenXAxis]) * 1.6  //house hold income
	  
    ])
    .range([0, width]);

  return xLinearScale;

}
 //=================================================================================
// function used for updating y-scale var upon click on axis label
 //=================================================================================
function yScale(demoData, chosenYAxis) {
  // Create Scale Functions for the Chart (chosenXAxis)
   //=================================================================================
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(demoData, d => d[chosenYAxis]) -1,//* 0.8, //y axis label 1
      d3.max(demoData, d => d[chosenYAxis]) //* 1.2, // y axis label 2
	  
    ])
    .range([height,0]);

  return yLinearScale;

}
 //=================================================================================
// function used for updating xAxis var upon click on axis label
 //=================================================================================
function renderXAxes(newXScale, xAxis) {
  var x_axis  = d3.axisBottom(newXScale); //bottom axis is changed to x_axis

  xAxis.transition()
    .duration(100)
    .call(x_axis);

  return xAxis;
}
 //=================================================================================
// function used for updating yAxis var upon click on axis label
 //=================================================================================
function renderYAxes(newYScale, yAxis) {
  var y_axis = d3.axisLeft(newYScale) //leftAxis is changed to y_axis

  yAxis.transition()
    .duration(100)
    .call(y_axis);

  return yAxis;
}
 //=================================================================================
// function used for updating circles group with a transition to
// new circles
 //=================================================================================
function renderCircles(circlesGroup, newXScale, chosenXAxis,newYScale,chosenYAxis) {

  circlesGroup.transition()
    .duration(100)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}
 //=================================================================================
// function to update the text with transition to new text
 //=================================================================================
function renderText(textGroup,newXScale,chosenXAxis,newYScale,chosenYAxis){
  textGroup.transition()
  .duration(100)
  .attr("x", d => newXScale(d[chosenXAxis]))
  .attr("y", d => newYScale(d[chosenYAxis]))
  .attr("text-anchor","middle");

  return textGroup;
}
 //=================================================================================
// major changes - this determines the label information
// function used for updating circles group with new tooltip
 //=================================================================================
function updateToolTip(chosenXAxis,chosenYAxis, circlesGroup,textGroup) {

 
//if condition for x axis
  if (chosenXAxis === "poverty") {
    var xLabel = "Poverty(%):";
  }
  else if (chosenXAxis === "age") {
   var xLabel = "Age (median):";
  }
  else {
	  var xLabel ="House hold income (median):";
  }
  // if condition for Yaxis
  if (chosenYAxis ==="healthcare"){
    var yLabel = "Lacks Healthcare(%)";
  }
  else if (chosenYAxis ==="obesity") {
    var yLabel = "Obese(%)";
  }
  else {
	  var yLabel ="Smokes (%):";
  }

  // Initialising toolTip

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`<strong>${d.state}</strong><br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
    });

    //create circles tooltip in the chart
  circlesGroup.call(toolTip);
// create event listeners like mouseover and mouseout
  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data,this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

    //create text group tool tip in the chart
    textGroup.call(toolTip);
    // create event listeners like mouseover and mouseout
    textGroup.on("mouseover", function(data) {
    toolTip.show(data,this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// lets work with the data. import the data.csv file and plot the data 

d3.csv("assets/data/data.csv").then(function(demoData){
  //Parsing the data
  demoData.forEach(function(data){
    data.poverty =+data.poverty;
    data.age =+ data.age;
    data.income =+ data.income;
    data.healthcare =+ data.healthcare;
    data.obesity =+ data.obesity;
    data.smokes =+ data.smokes;
}); // braces for parsing the data

//Create xLinearScale and yLinearScale functions in the chart
var xLinearScale = xScale(demoData, chosenXAxis);
var yLinearScale = yScale(demoData, chosenYAxis);

// create axis function
var x_axis = d3.axisBottom(xLinearScale);
var y_axis = d3.axisLeft(yLinearScale);

// append xAxis to the chart 
var xAxis = chartGroup.append("g")
.classed("x-axis", true)
.attr("transform", `translate(0, ${height})`)
.call(x_axis);

  // Append yAxis to the Chart
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(y_axis);

          // Create & Append Initial Circles
    var circlesGroup = chartGroup.selectAll(".stateCircle")
    .data(demoData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("class", "stateCircle")
    .attr("r", 15)
    .attr("opacity", ".35")
    .style("fill","orange");
    

        // Append Text to Circles
        var textGroup = chartGroup.selectAll(".stateText")
        .data(demoData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]*.98))
        .text(d => (d.abbr))
        .attr("class", "stateText")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle")
        .style("fill", "black");


            // Create Group for 3 xAxis Labels
    var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
// Append xAxis
var povertyLabel = xLabelsGroup.append("text")
.attr("x", 0)
.attr("y", 20)
.attr("value", "poverty") // Value to Grab for Event Listener
.style("fill","black")
.classed("active", true)
.text("Poverty (%)");

var ageLabel = xLabelsGroup.append("text")
.attr("x", 0)
.attr("y", 40)
.attr("value", "age") // Value to Grab for Event Listener
.style("fill","brown")
.classed("inactive", true)
.text("Age (Median)");

var incomeLabel = xLabelsGroup.append("text")
.attr("x", 0)
.attr("y", 60)
.attr("value", "income") // Value to Grab for Event Listener
.style("fill","green")
.classed("inactive", true)
.text("Household Income (Median)");

// Create Group for 3 yAxis Labels
var yLabelsGroup = chartGroup.append("g")
.attr("transform", `translate(-25, ${height / 2})`);

// Append yAxis
var healthcareLabel = yLabelsGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y",0 -20) //30
.attr("x", 0)
.attr("value", "healthcare")
.attr("dy", "1em")
.classed("axis-text", true)
.classed("active", true)
.style("fill","black")
.text("Lacks Healthcare (%)");

var smokesLabel = yLabelsGroup.append("text") 
.attr("transform", "rotate(-90)")
.attr("y", 0-40)//50
.attr("x", 0)
.attr("value", "smokes")
.attr("dy", "1em")
.classed("axis-text", true)
.classed("inactive", true)
.style("fill","brown")
.text("Smokes (%)");

var obesityLabel = yLabelsGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0-60) //70
.attr("x", 0)
.attr("value", "obesity")
.attr("dy", "1em")
.classed("axis-text", true)
.classed("inactive", true)
.style("fill","green")
.text("Obese (%)");

    // updateToolTip Function
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);

    // xAxis Labels Event Listener
    xLabelsGroup.selectAll("text")
      .on("click", function() {
        // Get Value of Selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
          // Replaces chosenXAxis with Value
          chosenXAxis = value;
          // Updates xScale for New Data
          xLinearScale = xScale(demoData, chosenXAxis);
          // Updates xAxis with Transition
          xAxis = renderXAxes(xLinearScale, xAxis);
          // Updates Circles with New Values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
          // Updates Text with New Values
          textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)
          // Updates Tooltips with New Information
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);

          if (chosenXAxis === "poverty") {
            povertyLabel
              .classed("active", true)
              .classed("inactive", false);
            ageLabel
              .classed("active", false)
              .classed("inactive", true);
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "age") {
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
            ageLabel
              .classed("active", true)
              .classed("inactive", false);
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
            ageLabel
              .classed("active", false)
              .classed("inactive", true);
            incomeLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });

      // do the same as xAxis for yAxis
      // yAxis Labels Event Listener
    yLabelsGroup.selectAll("text")
    .on("click", function() {
      // Get Value of Selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {
        // Replaces chosenYAxis with Value
        chosenYAxis = value;
        // Updates yScale for New Data
        yLinearScale = yScale(demoData, chosenYAxis);
        // Updates yAxis with Transition
        yAxis = renderYAxes(yLinearScale, yAxis);
        // Updates Circles with New Values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
        // Updates Text with New Values
        textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)
        // Updates Tooltips with New Information
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);
        // Changes Classes to Change Bold Text
        if (chosenYAxis === "healthcare") {
          healthcareLabel
            .classed("active", true)
            .classed("inactive", false);
          obesityLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenYAxis === "obesity") {
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
          obesityLabel
            .classed("active", true)
            .classed("inactive", false);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
          obesityLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    }); 

}); // braces for d3.csv file call
} // braces for makeResponsive calls 

// When Browser Loads, makeResponsive() is Called
makeResponsive();

// When Browser Window is Resized, makeResponsive() is Called
d3.select(window).on("resize", makeResponsive);

