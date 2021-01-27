// Set SVG width/height and margins
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Create SVG wrapper, append the SVG group and shift it by the margins
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chosenXAxis = "poverty";
var chosenYAxis = "smokes";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
        d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;
};

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
};

// function used for updating y-scale var upon click on axis label
function yScale(data, chosenYAxis) {
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[chosenYAxis])])
        .range([height, 0]);
    
    return yLinearScale
}

// function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisBottom(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
};


//Import the data from 'data.csv' file
d3.csv('assets/data/data.csv').then(function(data) {
    //console.log(data)

    data.forEach(function(data){
        data.poverty    = +data.poverty;
        data.healthcare = +data.healthcare;
        data.age        = +data.age;
        data.smokes     = +data.smokes;
        data.obesity    = +data.obesity;
        data.income     = +data.income;
    })

    //Call scale functions
    var xLinearScale = xScale(data, chosenXAxis);
    var yLinearScale = yScale(data, chosenYAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    console.log(yLinearScale)

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    // append y axis
    chartGroup.append("g")
        .call(leftAxis);
    
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 20)
        .attr("fill", "pink")
        .attr("opacity", ".5");
    
    

});