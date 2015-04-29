ZoomVis = function(_parentElement, _data, _metaData){
	this.parentElement = _parentElement;
	this.data = _data;
	this.metaData = _metaData;

	//Margin, width, and height definitions for scatter plot svg
	this.margin = {top: 20, right: 50, bottom: 100, left: 70},
	this.width = 780 - this.margin.left - this.margin.right,
	this.height = 650 - this.margin.top - this.margin.bottom;

	//Initialize the scatter plot visualization
	this.initVis();

}

/**
 * Method that sets up the SVG and the variables
 */
ZoomVis.prototype.initVis = function(){

	var that = this;

	//define svg
	this.svg = d3.select('#scatter-zoom').append("svg")
		.attr("width", this.width + this.margin.left + this.margin.right)
		.attr("height", this.height + this.margin.top + this.margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


	//Define Scales
	this.x = d3.scale.linear()
		.range([0, this.width]);

	this.y = d3.scale.linear()
		.range([this.height, 0]);

	//Define Axes
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

	this.svg.append("g").append("text")
		.attr("text-anchor", "middle") 
		.attr("transform", "translate("+ -this.margin.left/1.5 +","+(this.height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text("longitude");


	this.svg.append("g").append("text")
			.attr("text-anchor", "middle") 
			.attr("transform", "translate("+ (this.width/2) +","+(this.height + this.margin.bottom/2)+")")  // centre below axis
			.text("latitude");

  // call the update method


}


//Filter yelp dataset and the list of stops from the metadata
//so that only consists of the subset of data that is within
//The bounds of the brush select
ZoomVis.prototype.wrangleData = function(x_extents, y_extents){

	var that = this;


	//Filter restaurant data and store in this.plotData
	this.plotData = [];

	this.data.forEach(function(d){

		if( x_extents[0] < d.longitude && d.longitude < x_extents[1]
				&& y_extents[0] > d.latitude && d.latitude > y_extents[1]){
			
			that.plotData.push(d)
		}
	})



	//Filter train stops and store in this.plotStops
	this.plotStops = [];
	this.metaData.forEach(function(d){

		if( x_extents[0] < d.ll[1] && d.ll[1] < x_extents[1]
				&& y_extents[0] > d.ll[0] && d.ll[0] > y_extents[1]){
			
			that.plotStops.push(d)
		}
	})

	//console.log("plotted stops", this.plotStops)

}



ZoomVis.prototype.onSelectionChange = function (x_extents, y_extents){


	var that = this;

	// filter, aggregate, modify data
	this.wrangleData(x_extents, y_extents);


	this.x.domain([x_extents[0], x_extents[1]])
	this.y.domain([y_extents[1], y_extents[0]])

	//update axis
	this.svg.select(".x.axis")
		.call(this.xAxis)
	  .selectAll("text")  
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", function(d) {
			return "rotate(-65)" 
		 });      


	this.svg.select(".y.axis")
		.call(this.yAxis);


	//Plot circles for scatter plot
	this.circle = this.svg
		.selectAll(".brush-circles")
		.data(this.plotData)


	this.circle_enter = this.circle
		.enter()
		.append("circle")	
		.attr("class", "brush-circles")
		.attr("cx", function(d) {
			return that.x(d.longitude);
		})
		.attr("cy", function(d) {
			return that.y(d.latitude);
		})
		.attr("r", function(d) {
			return 2;
		})
		// .style("opacity", 1)
		// .style("stroke-width", 1)

	this.circle_exit = this.circle.exit().remove();

	this.stops = this.svg
		.selectAll(".brush-stops")
		.data(this.plotStops)

	this.stops_enter = this.stops.enter()
		.append("circle")
		.attr("class", "brush-stops")
		.attr("cx", function(d){
			return that.x(d.ll[1])
		})
		.attr("cy", function(d){
			return that.y(d.ll[0])
		})
		.attr("r", function(d){return 3})
		// .style("stroke", "red")
		// .style("fill", "red");

	this.stops_exit = this.stops.exit().remove();

}






