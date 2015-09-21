# Food by MBTA

A Final Project for CS171. Spring Term 2015.

### URLs

__web__: http://sbemagx.github.io/CS171-Metro-Boston-Food-Exploration/code/

__youTube__: https://www.youtube.com/watch?v=oM7Mi2KyIzE

__process book__ : https://github.com/sbemagx/CS171-Metro-Boston-Food-Exploration/blob/master/design/CS171%20Process%20Book.pdf


### Usage

The first graphic can be moused over to bring up tooltips showing the names, number of restaurants, and number of reviews for restaurants near any given MBTA train stop. To the right a drop down menu lets users choose between categories of cuisine to be visualized. In the right column a heatmap shows the number of ratings, from one to five stars, for the restaurants at that stop.

The second graphic is a canvas that can be brushed to create subselections that are magnified in the zoom box on the right. Additionally, the categories of restaurants withing a given selection are displayed in the circle packing on the lower right. Check boxes at the top of the graphic give users a way to filter certain types of information. 

### Folder Structure

- __code__

	* __css__     : Stylesheets and glyphs for Chosen.js
	* __images__  : contains the Yelp attribution gif
	* __js__      : All of our JS objects reside here. Also, some 3rd-party includes such as D3 and Chosen.js
		* mbtaVis.js : code for the first graphic
		* heatmapVis.js : code for the heatmap to the right of the MBTA graphic
		* scatterVis.js : code for the scatterplot graphic
		* zoomVis.js : code for the zoom window to the right of the scatterplot graphic
		* zoomStats.js : code for the circle packing graphic
		* mbta-svg.js : SVG code that draws the stylized MBTA graphic 
	* __scripts__ : Contains our utility scripts for working with the Yelp API and transforming data
		* calcRatings.py : python script that derives heatmap data from the main data set
		* mergeCoffee.py : python script that combines data from 'restaurant' and 'coffee' calls against the Yelp API
		* slimData.py : python script that slims the data set by removing extraneous information from each object
		* slimScatter.py : python script that slims the data set by removing extraneous information from each object
		* yelp.py : python script that fetches data from the Yelp API

- __data__
	
	* __data-3km-scatterplot.json__ : data file for the scatterplot graphic containing data points within a 3km radius of each MBTA train stop with no duplicates

	```javascript
	{
		 "categories": ["American", "Breakfast & Brunch"],
		 "review_count": 13,
		 "name": "The Table At Season To Taste",
		 "latitude": 42.3983409,
		 "longitude": -71.1310318
	}
	```

	* __data-500m.json__ : data file for the MBTA graphic containing data points within a 500m radius of each MBTA stop with duplicates (because some restaurants can be within 500m of more than one stop, especially downtown)

	```javascript
	{
		"rating": 3.0
		, "review_count": 294
		, "name": "Summer Shack"
		, "longitude": -71.1410794906298
		, "stop_id": 101
		, "latitude": 42.393659192464
		, "line": ["red"]
		, "categories": ["Seafood", "Burgers", "American (Traditional)"]
	}
	```

	* __data-500m-heatmap.json__ : data file for the MBTA heatmap graphic containing Yelp ranking data for each category per stop. This could have been calculated on the fly each time, but since the data doesn't change that seemed like a lot of extra overhead. So, we built this data structure which holds the sum of the restaurant rankings in a positional list. Each step is a half-star in the Yelp rankings. Thus d['rating']['Indian'][5] would be the number of 3 star ratings for Indian restaurants for that particular stop.  

	```javascript
	{
		 "rating": {
			 "Chicken Wings": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "American (New)": [0, 0, 0, 0, 1, 0, 0, 0, 0],
			 "Tapas/Small Plates": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Donuts": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Gluten-Free": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Breakfast & Brunch": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Indian": [0, 0, 0, 0, 0, 0, 1, 0, 0],
			 "Food Stands": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Sandwiches": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Latin American": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Fast Food": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Korean": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Soup": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Sushi Bars": [0, 2, 0, 0, 0, 0, 0, 0, 0],
			 "Barbeque": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Vietnamese": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Coffee & Tea": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Turkish": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "French": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Tapas Bars": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Diners": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Thai": [0, 0, 0, 0, 0, 0, 3, 0, 0],
			 "Pizza": [0, 0, 0, 1, 0, 0, 0, 0, 0],
			 "Vegetarian": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Salad": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Seafood": [0, 0, 0, 0, 1, 0, 0, 0, 0],
			 "Cafes": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Irish": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Middle Eastern": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Kosher": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Greek": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Steakhouses": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Italian": [0, 0, 0, 1, 0, 0, 0, 0, 0],
			 "Bars": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Vegan": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Mexican": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Chinese": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Burgers": [0, 0, 0, 0, 1, 0, 0, 0, 0],
			 "Asian Fusion": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Mediterranean": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Japanese": [0, 0, 0, 3, 0, 0, 0, 0, 0],
			 "Dim Sum": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Delis": [0, 0, 0, 0, 0, 0, 1, 0, 0],
			 "Halal": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Hot Dogs": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Cantonese": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Falafel": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "Taiwanese": [0, 0, 0, 0, 0, 0, 0, 0, 0],
			 "all_cat": [0, 0, 0, 2, 4, 0, 3, 0, 0]
	 	},
	 	"stop_id": 101
	 },
	```

	* __mbta_metadata.json__ : data file containing information about each MBTA train stop

	```javascript

    {
    	"stop_id":101,
    	 "stop_count": 1,
    	 "stop_reviews": 1,
    	 "station":"Alewife Station",
    	 "line":["red"],
    	 "x":640,
    	 "y": 196,
    	 "ll":[42.395781, -71.142059]
    },
	```

- __design__
 	* __Process Book__
 	* __Initial Proposal__