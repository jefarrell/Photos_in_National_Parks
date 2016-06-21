// transition down to anchor on button click
var cont = document.getElementById('buttonContainer');
var dest = document.getElementById('explore');

function scrollTo(element, to, duration) {
	if (duration <= 0) return;
	var difference =  to - element.scrollTop;
	var perTick = difference / duration*10;

	setTimeout(function() {
		element.scrollTop = element.scrollTop + perTick;
		if (element.scrollTop === to) return;
		scrollTo(element, to, duration-10);
	}, 10);
}

cont.onclick = function() {
	scrollTo(document.body, dest.offsetTop, 700);
}

//// d3 part /~ def not original ~/
//set up canvas and bar sizes
var canvasWidth = 420,
    canvasHeight = 350,
    otherMargins = canvasWidth * 0.1,
    leftMargin = canvasWidth * 0.25,
    maxBarWidth = canvasHeight - - otherMargins - leftMargin
    maxChartHeight = canvasHeight - (otherMargins * 2);

//set up linear scale for data to fit on chart area 
var xScale = d3.scale.linear()
                .range([0, maxBarWidth]);

//set up ordinal scale for x variables
var yScale = d3.scale.ordinal();

//add canvas to HTML
var chart = d3.select("#dataTable").append("svg")
                            .attr("width",canvasWidth)
                            .attr("height", canvasHeight)
                            .classed("d3chart",true);                       

//set up x axis                            
var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(5);

//set up y axis
var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .tickSize(0);


d3.csv("photocount.csv").get(function (error, data) {


//get variable names
var keys = d3.keys(data[0]);
var namesTitle = keys[0];
var valuesTitle = keys[1];

//accessing the properties of each object with the variable name through its key
var values = function(d) {return +d[valuesTitle];};
var names = function(d) {return d[namesTitle];}

// find highest value
var maxValue = d3.max(data, values); 

//set y domain by mapping an array of the variables along x axis
yScale.domain(data.map(names));

//set x domain with max value and use .nice() to ensure the y axis is labelled above the max y value
xScale.domain([0, maxValue]).nice(); 

//set bar width with rangeBands ([x axis width], gap between bars, gap before and after bars) as a proportion of bar width  
yScale.rangeBands([0, maxChartHeight], 0.1, 0.25);

//set up rectangle elements with attributes based on data
var rects = chart.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")


//set up attributes of svg rectangle elements based on attributes
var rectAttributes = rects
                      .attr("x", leftMargin)
                      .attr("y", function (d) {return yScale(d[namesTitle]) + otherMargins; })
                      .attr("width", function (d) {return xScale(d[valuesTitle])})
                      .attr("height", yScale.rangeBand())
                      .attr("fill", "white")
                      .on("mouseover", function(d, i) {
                        
                        //change fill
                        d3.select(this)
                              .attr("fill", "#7AC043");

                        //set up data to show on mouseover
                        var counter = parseInt(d[valuesTitle]);
                        var xPosition = (parseFloat(d3.select(this).attr("width")) + leftMargin + 6);
                        var yPosition = parseFloat(d3.select(this).attr("y")) + (parseFloat(d3.select(this).attr("height")) / 2);
                        chart.append("text")
                              .attr("id", "tooltip")
                              .attr("x", xPosition)
                              .attr("y", yPosition)
                              .attr("dy", "0.35em")
                              .attr("text-anchor", "start")
                              .attr("font-family", "sans-serif")
                              .attr("font-size", "12px")
                              .attr("font-weight", "bold")
                              .attr("fill", "white")
                              .text(counter.toLocaleString());
                      })
                      
                      //transition out
                      .on("mouseout", function(d) {
                        d3.select(this)
                          .transition()
                          .duration(250)
                          .attr("fill", "white");
                        d3.select("#tooltip").remove();
                      });

//append x axis
chart.append("g")
      .attr("transform", "translate(" + leftMargin + ", " + (maxChartHeight + otherMargins) + ")")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")
      .style("stroke", "white")
      .style("fill", "none")
      .style("stroke-width", 1)
      .style("shape-rendering", "crispEdges")
      .call(xAxis)
        .selectAll("text")
        .attr("stroke", "none")
        .attr("fill", "white");

//append y axis
chart.append("g")
      .attr("transform", "translate(" + leftMargin + ", " + otherMargins + ")")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")
      .style("stroke", "white")
      .style("fill", "none")
      .style("stroke-width", 1)
      .style("shape-rendering", "crispEdges")
      .call(yAxis)
      .selectAll("text")
        //.attr("dx", "-1.15em")
        .attr("stroke", "none")
        .attr("fill", "white")
        //.call(yScale.rangeBand()); //calls wrap function below

  //x axis title        
  chart.append("text")
        .attr("x", (maxBarWidth / 2) + leftMargin)
        .attr("y", canvasHeight - (otherMargins / 5))
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .text("Photo Count per Park");


});