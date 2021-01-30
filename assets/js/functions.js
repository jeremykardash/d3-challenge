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
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
  
    return yAxis;
};

//function to chance the X values on the circles
function renderXcircles(circlesGroup, newXScale, chosenXAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]))
    
    return circlesGroup
};

//function to change the Y values on the circles
function renderYcircles(circlesGroup, newYScale, chosenYAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]))
    
    return circlesGroup
};

//function to move the text when X values are changed
function renderXtext(circlesGroup, newXScale, chosenXAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("dy", d => newXScale(d[chosenXAxis]))
    
    return circlesGroup
};

//function to move the text when Y values are changed
function renderYtext(circleGroup, newYScale, chosenYAxis) {
    circleGroup.transition()
        .duration(1000)
        .attr("dx", d => newYScale(d[chosenYAxis]))
    
    return circleGroup
};


//function to update the tooltip
function updateToolTip(circlesGroup, chosenXAxis, chosenYAxis) {

    var xlabel;
    if (chosenXAxis === "poverty") {
      xlabel = "Poverty";
    } else if (chosenXAxis === "age"){
      xlabel = "Age";
    } else {
      xlabel = "Income";
    }
  
    var ylabel;
    if (chosenYAxis === "healthcare") {
      ylabel = "Healthcare";
    } else if (chosenYAxis === "smokes"){
      ylabel = "Smokes";
    } else {
      ylabel = "Obesity";
    }
  
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([50, -75])
      .html(function(d) {
       
          return (`${d.state}<br>${xlabel}: ${d[chosenXAxis]}<br>${ylabel}: ${d[chosenYAxis]}`)
        });
    
    circlesGroup.call(toolTip);

      circlesGroup.on("mouseover", function(data) {
          toolTip.show(data);
        })
          // onmouseout event
      .on("mouseout", function(data, index) {
            toolTip.hide(data);
          });
      
        return circlesGroup;
      };