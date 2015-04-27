
mbtaVis = function(_parentElement, _data, _metaData){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;

	var stop_list = [];  //Aggregate data list
	this.radius_scale = d3.scale.linear().range([0,60]);
	//var circles = d3.selectAll('circle')
	var encode_category='all_cat'; // set this to all categories to start

	// draw the initial circles
	metaData.forEach(function(stop){

	 d3.select("#circles").append('circle')
	    .attr("cx", stop['x'])
	    .attr("cy", stop['y'])
	    .attr("r", 10)
	    .attr("class", "mbta-circle")
	    // .attr("class", function(){
	    //    if(stop.line.length == 1){
	    //       return stop.line[0];
	    //    } else{
	    //       return stop.line[0] + ' ' + stop.line[1]
	    //    }
	    // })
	    .attr("id", stop["station"])
	    .datum(stop);	    
	})

     //create blank array of objects containing agregate information for each t-stop
      stop_list = metaData.map(function(d){

        var initialized_cat_count = {}
        var initialized_cat_rating = {}
        var initialized_cat_review = {}

        category_list.forEach(function(category){
          initialized_cat_count[category] = 0
          initialized_cat_rating[category] = 0
          initialized_cat_review[category] = 0
        })

      return {  id: d.stop_id,
                line: d.line,
                count:0,
                rating_average:0,
                review_count:0,
                category_count: initialized_cat_count,
                category_avg_rating: initialized_cat_rating,
                category_review_count: initialized_cat_review
             }    

     })

		//loop through every restaurant and calculate the total numbers per stop
		allData.forEach(function(restaurant){
			stop_list.forEach(function(stop){

				if(restaurant.stop_id == stop.id){
				    stop.count += 1;  //total count
				    stop.rating_average += restaurant.rating  //total ratings
				    stop.review_count += restaurant.review_count

				    restaurant.categories.forEach(function(cat){
						if(category_list.indexOf(cat) >= 0){
							stop.category_count[cat] += 1;
							stop.category_avg_rating[cat] += restaurant.rating
							stop.category_review_count[cat] += restaurant.review_count              
						}
				    })
				}

			})
		})


		//divide by number of restaurants in the given stop to create averages when necessary
		stop_list.forEach(function(stop){

		//find rating average of total count
		stop.rating_average = stop.rating_average / stop.count;

        //find rating average of each category
        for(var key in stop.category_avg_rating){
          if(stop.category_avg_rating.hasOwnProperty(key)){
            if(!isNaN(stop.category_avg_rating[key] / stop.category_count[key])){ //Ensure no 0/0
              stop.category_avg_rating[key] = stop.category_avg_rating[key] / stop.category_count[key];              
            }
          }
        }        

      })

      // console.log("stop list aggregate", stop_list)
      this.stop_list = stop_list;
      this.update();
 }



mbtaVis.prototype.update = function(){
	stop_list = this.stop_list;
	radius_scale = this.radius_scale;

	//Check for the category that will be displayed
	var f = document.getElementById("mySelectCat");
	encode_category = f.options[f.selectedIndex].value;
	// console.log(encode_category)

	//Find the domain for the given selection
	if(encode_category == "all_cat" ){
		radius_scale.domain([0, d3.max(stop_list, function(d){ return d.count })]) 
	} 
	else {
		radius_scale.domain(d3.extent(stop_list, function(d){ return d.category_count[encode_category] }))    
	} 

    tot_r = 1; 
    tot_a = [];
    d3.selectAll('.mbta-circle').transition().duration(1000).attr("r", function(d){

      var plot_r; //value of plotted radius


      stop_list.forEach(function(stop){

      	if(stop.id == d.stop_id){

			if(encode_category == "all_cat" ){
				plot_r = radius_scale(stop["count"])
				tot_r += stop["count"];  
				tot_a.push(stop["count"]);
			} 
			else if(encode_category == encode_category){
				plot_r = radius_scale(stop.category_count[encode_category])   
			} 
			else {
				plot_r = 10;
			}
        }

      })

      return plot_r;

    })
    console.log('this');
    console.log(tot_a);
    d3.select('#total-restaurants').text(tot_r);
    d3.select('#total-max').text(Math.max(tot_a));
    d3.select('#total-min').text(Math.min(tot_a));
  }