//// D3 Charts

/*

  Bar Chart

*/
var canvasWidth = 430,
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
        .on("mouseover", function(d) {
            
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
          .attr("stroke", "none")
          .attr("fill", "white")

    //x axis title        
    chart.append("text")
          .attr("x", (maxBarWidth / 2) + leftMargin)
          .attr("y", canvasHeight - (otherMargins / 5))
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "14px")
          .attr("font-weight", "bold")
          .attr("fill", "white")
          .text("Available Photos per Park");
});



/*

  Line Chart

*/
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var Colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#f0027f",
              "#e31a1c","#ff7f00","#984ea3","#ffff33","#b15928"]

var margin={top: 20, right: 80, bottom:30, left:50},
  width=870-margin.left-margin.right,
  height=350-margin.top-margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse

var x = d3.time.scale()
  .range([0, width-30]);

var y = d3.scale.linear()
  .range([height, 0]);

var color = d3.scale.category10();

var lineXaxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .ticks(7)
  .tickFormat(d3.time.format("%B %d, %Y"));;

var lineYaxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var line = d3.svg.line()
  .interpolate("basis")
  .x(function(d) {return x(d.date); })
  .y(function(d) {return y(d.count); })



var svg = d3.select("#lineChart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("id", "lineChartSVG")
  .append("g")
  .attr("transform", "translate("+margin.left+","+margin.top+")");


d3.csv("park_week_data.csv",function(error,data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) {
    return key !== "date";
  }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var parks = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, count: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) {return d.date;}));

  y.domain([
    d3.min(parks, function(c){return d3.min(c.values, function(v){
      return v.count;
      });
    }),
    d3.max(parks, function(c){return d3.max(c.values, function(v){
      return v.count;
      });
    })
  ]);

  var legend = svg.selectAll('g')
      .data(parks)
      .enter().append('g')
      .attr('class', 'legend');
    
  legend.append('rect')
      .attr('x', width - 20)
      .attr('y', function(d, i){ return i *  20;})
      .attr('width', 15)
      .attr('height', 15)
      .style('fill', function(d,i) { return Colors[i]; })
      .on("mouseover", function(d) {
        var nameString = "#"+d.name.split(" ").join("-");
        d3.select(nameString).style("stroke-width", 7);
      })
      .on("mouseout", function(d){
        var nameString = "#"+d.name.split(" ").join("-");
        d3.select(nameString).style("stroke-width", 1);
      });
      
  legend.append('text')
      .attr("class", "legendText")
      .attr('x', width)
      .attr('y', function(d, i){ return (i *  20) + 9;})
      .text(function(d){ return d.name; });

  svg.append("g")
      .attr("class", "lineAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(lineXaxis);

  svg.append("g")
      .attr("class", "lineAxis")
      .call(lineYaxis)
      .append("text")
      .attr("class", "legendText")
      .attr("x", 70)
      .style("text-anchor", "end")
      .text("Posts per Day");

  var park = svg.selectAll(".park")
      .data(parks)
      .enter().append("g")
      .attr("class", "park");

  park.append("path")
      .attr("class", "lineChartLines")
      .attr("id", function(d){ return d.name.split(" ").join("-"); })
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d,i) { return Colors[i]; });


});