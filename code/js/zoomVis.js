ZoomVis = function(_parentElement, _data, _metaData){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;

    //Margin, width, and height definitions for scatter plot svg
    this.margin = {top: 20, right: 0, bottom: 20, left: 50},
    this.width = 350 - this.margin.left - this.margin.right,
    this.height = 350 - this.margin.top - this.margin.bottom;

    //Initialize the scatter plot visualization
    this.initVis();

}

/**
 * Method that sets up the SVG and the variables
 */
ZoomVis.prototype.initVis = function(){

	var that = this;

	this.svg = d3.select('#scatter-zoom').append("svg")
	    .attr("width", this.width + this.margin.left + this.margin.right)
	    .attr("height", this.height + this.margin.top + this.margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


	//Define Axis and Scales

	this.x = d3.scale.linear()
		.range([0, this.width]);

	this.y = d3.scale.linear()
		.range([this.height, 0]);

  	this.xAxis = d3.svg.axis()
	  	.scale(this.x)
	  	.orient("bottom");

	  this.yAxis = d3.svg.axis()
	    .scale(this.y)
	    .orient("left");

  	//g containing the x axis
 	this.svg.append("g")
  		.attr("class", "x axis")
    	.attr("transform", "translate(0," + this.height + ")")

	  //g containing the y axis
	  this.svg.append("g")
	      .attr("class", "y axis")
	      .attr("transform", "translate(0,0)")  


  // filter, aggregate, modify data
  this.wrangleData();

  // call the update method


}


ZoomVis.prototype.wrangleData = function(){}


ZoomVis.prototype.onSelectionChange = function (selectionArea_1, selectionArea_2){


	console.log("selectionArea", selectionArea_1)
	console.log("selectionArea", selectionArea_2)

	console.log(d3.selectAll('.selected'))


}






