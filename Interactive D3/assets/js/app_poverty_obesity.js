// @TODO: YOUR CODE HERE!

// Store width and height parameters to be used in later in the canvas
var svgWidth = 900;
var svgHeight = 600;
// Set svg margins 
    var margin = {
      top: 40,
      right: 40,
      bottom: 80,    
      left: 90
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
  
    // Append SVG element
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    // Append group element
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // place file in the variable 

      var file = "assets/data/data.csv"

        // Read CSV to get the poverty and obesity data
  d3.csv(file).then(loadData,loadError);

  //if error exists
  function loadError(error){
      throw err;
    }

    //function to load data
    function loadData(demoData){ // braces open

     // parse data
     demoData.map(function(data) {
        data.poverty = +data.poverty;
		data.obesity = +data.obesity;
        //data.obesity = +data.obesity;
      });

      //  Create scale functions
  // Linear Scale takes the min to be displayed in axis, and the max of the data
    var xLinearScale = d3.scaleLinear()
        //.domain([8.1, d3.max(demoData, d => d.poverty)])
		.domain([d3.min(demoData, d => d.poverty)-1, d3.max(demoData, d => d.poverty)])
		
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
       //.domain([20, d3.max(demoData, d => d.obesity)])
	   .domain([d3.min(demoData, d => d.obesity)-1, d3.max(demoData, d => d.obesity)])
        .range([height, 0]);

    // create axes by calling the scale function
      var xAxis = d3.axisBottom(xLinearScale)
      // add ticks to adjust for bottom axis
      .ticks(7);
      var yAxis = d3.axisLeft(yLinearScale);

    // append axes to the chargroup
    // bottom axis moves using height
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
    //left axis is already at (0,0)
    //only append to left axis
      chartGroup.append("g")
        .call(yAxis);
    
    // append initial circles for scatter plot
    var circlesGroup = chartGroup.selectAll("circle")
        .data(demoData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", 10)
        .attr("fill", "green") // change the color of the circle.earlier it was gold
        .attr("opacity", ".35");

    //append data to the circles
    var circlesGroup = chartGroup.selectAll()
        .data(demoData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.obesity))
        .style("font-size","10px")
        .style("text-anchor","middle")
        .style('fill','black')
        .text(d=>(d.abbr));

        // Step 6: Initialize Tooltip
        var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
          return (`<strong>${d.state}</strong><br>Poverty:${d.poverty}%<br>Obesity:${d.obesity}%`);
        });

        // Step 7: Create the tooltip in chartGroup.
        //=========================================
      chartGroup.call(toolTip);

        // Step 8: Create "mouseover" event listener to display tooltip
        //=============================================================
      circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
      })
        // Step 9: Create "mouseout" event listener to hide tooltip
        //===========================================================
        .on("mouseout", function(data) {
          toolTip.hide(data);
        });
        // Create axes labels
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
		.attr("text-anchor", "middle")
        .text("US Census Data Obesity (%)");

        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
		.attr("text-anchor", "middle")
        .text("US Census Data Poverty Rate by State (%)");
    }

