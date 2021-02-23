 	/***Define arrays to  keep the 
 		*ids  and the corresponding 
 		*lattitude and 
 		*longitudes
 	*/	 

 	var id_arr 		=[];
	var lat_arr		=[];
	var long_arr	=[];
	/** This is  array of objects containing: 
		*distance 
		*latitude and longitude of start point 
		*latitude and longitude of end point 
		*/
	var dis_lat_lng =[]; 


 /***initialize google map 
  	*lat_val 	=lattitude 
 	*lng_val	=longitude 
 	*map_id 	= css id for map div 
 	*zf 		= zoom factor 
 */
// files to read  	
var map_id, mapStyle,map_bounds, routeColor, bgColor,labelTextColor,waterColor;
var fileName2			="../data/pipe.json";
var rxmarker	 		="../images/station.png";
var already_route_found =false; 
var gmap; 
routeColor 				='#ff0800';  
bgColor 				= '#ebf5d6';//'#ffedff';
labelTextColor			='#003300';
waterColor				='#e6e6d1';


 function initialize(lat_val,lng_val,map_id,data_node_jsn, zf)
	{
		mapid 	=document.getElementById(map_id);
      	blatlng = new google.maps.LatLng(lat_val,lng_val);
		var locInfo	={
					//50.036806, 8.236986
	          			center: blatlng,
	          			zoom: zf,
			  			gestureHandling: 'greedy',
			  			mapTypeId: 'terrain',
						gestureHandling: 'cooperative',
						styles:mapStyle,
						mapTypeControl: true,
						zoomControl: true,
						zoomControlOptions: {
							position: google.maps.ControlPosition.LEFT_CENTER
						},
						restriction: {
							latLngBounds: map_bounds,
							strictBounds: false
						  }

	       			};
			gmap = new google.maps.Map(mapid, locInfo);
			//First mark the  points stops  on the map 
			draw_points (data_node_jsn,gmap);
			draw_arrowLines(gmap);
			// Now draw the arrows 
			
	      
		  // handel with the pipe data 
		// var route_point_arr = [1, 3, 5, 8, 13, 17, 21, 25, 29, 145, 30, 31, 176, 33, 217, 34, 39, 37, 293, 411, 319, 422, 421, 323, 322, 324, 423, 424, 425, 9];
		//draw_arrowLines(gmap,route_point_arr);
	   
	       
	}//end of initialize function 
	
	function addLine(c_plineInfo,gmap) {
        var c_my_route   =new google.maps.Polyline(c_plineInfo);
		c_my_route.setMap(gmap);
		//routePath.setMap(gmap);
      }

      function removeLine(c_plineInfo,gmap) {
		var c_my_route   =new google.maps.Polyline(c_plineInfo);
		c_my_route.setMap(null);
      }
	
	//
	 function plot_shortest_path(shortest_path){
		// draw_arrowLines(gmap);
		handle_route_request(shortest_path, id_arr, lat_arr, long_arr,gmap);
	 }
	
	//
	function draw_arrowLines(gmap){
		 var xhttp_pipe = new XMLHttpRequest();
		xhttp_pipe.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) 
			{
				var data_pipe_jsn =JSON.parse(this.responseText);
				handle_with_pipe_data(data_pipe_jsn,gmap);
				
				/*****We take here:  
				   	 		* route_point_arr:  a route path and search these points into:  
				   	 		* id_arr: the array contaning ids 
				   	 		* lat_arr: the array containing the corresponding latitudes 
				   	 		* long_arr: the array containing longitudes 
				   	 		* as an example take route as the folloiwng 
				   	 		* var route_point_arr = [11, 3, 5, 8, 13, 17, 21, 25, 29, 145, 30, 31, 176, 33, 217, 34, 39, 37, 293, 411, 319, 422, 421, 323, 322, 324, 423, 424, 425, 9, 10] 
				*/
				//handle_route_request(route_point_arr, id_arr,lat_arr,long_arr,gmap);

			}
		};			
				  //alert(fileName2);
				 xhttp_pipe.open("GET", fileName2, true);
				  xhttp_pipe.send();	
  			// Here we start  draw the color lines and show the direction from the starting point to 
  			// the final point 
		
	}
	
  	//Here we define the different functions
  			function handle_route_request(arr_route, arr_id, arr_lati, arr_longi,gmap){
					already_route_found=true;

  				 for ( var i=0; i<arr_route.length; i++){
  				 	   var c_id1 = arr_id.indexOf(arr_route[i]);
  				 	   var c_id2 = arr_id.indexOf(arr_route[i+1]);
  				 	    if(!c_id1 || !c_id2){
  				 	    	alert("There is a problem in finding out the route, please try again later ");
  				 	    }else{
  				 	    	// Show the route // 
  				 	    	 //alert("test");
  				 	    	 var lati_c_frm_pt 	=arr_lati[c_id1];
  				 	    	 var longi_c_frm_pt	=arr_longi[c_id1];
  				 	    	 // for the second point 
  				 	    	 var lati_c_to_pt 	=arr_lati[c_id2];
  				 	    	 var longi_c_to_pt	=arr_longi[c_id2];
  				 	    	 var c_frm_pos    	=new google.maps.LatLng(lati_c_frm_pt,longi_c_frm_pt); // from position 
                			 var c_to_pos     	=new google.maps.LatLng(lati_c_to_pt,longi_c_to_pt); // to position 
                			var c_from_to    	=[c_frm_pos,c_to_pos];
                			var c_lineSymbol 	={
						         		 		path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
						        			};
			                var c_plineInfo  	={ path: c_from_to,
									         	 geodesic: true,
									         	 //strokeColor: '#FF0000',
									         	 strokeColor: routeColor,
									         	 strokeOpacity: 1.0, 
									         	 strokeWeight: 2,
									         	 icons:[{
									         	   icon: c_lineSymbol,
									         	   offset: '100%'
									         	 }]
			                				};
			                	addLine(c_plineInfo,gmap)
								//var c_my_route   =new google.maps.Polyline(c_plineInfo);
								//c_my_route.setMap(gmap);
  				 	    	 
  				 	    }


  				 }
  			}


	//
	 
	//
	function handle_with_pipe_data (nodeArr,gmap){
			//alert(nodeArr.length);
			nodeArr.forEach(route_frmA_toB);
			//document.getElementById(id).innerHTML =  JSON.stringify(nodeArr[0]);
		
		function route_frmA_toB(jsnObj){
			  		  	//Define the variable 
			  	var frm_pt 		=jsnObj.ann; // from point  
			  	var to_pt 		=jsnObj.art;  // to point 
			  	// find the Lattitude and longitude. 

			  	var idx_frm 	=id_arr.indexOf(frm_pt); // find th eindex of array  saved before 
			  	var idx_to 		=id_arr.indexOf(to_pt); // find th eindex of array  saved before 
			  	var frm_lat		=lat_arr[idx_frm];  // Determine the lattitude of from point 
			  	var frm_long	=long_arr[idx_frm];	//  Determine the longitude of from point 
			  	var to_lat 		=lat_arr[idx_to];	// Determine the lattitude of to point 
			  	var to_long 	=long_arr[idx_to]; // Determine the longitude of to point 
			  	//calculate distance  from to 
				//var dist 		= calculateDistance (frm_lat, frm_long, to_lat, to_long);
				//	console.log(frm_pt+" "+to_pt+" "+frm_lat+" "+frm_long+" "+to_lat+" "+to_long+" "+dist);
				// var d_f_t 		={"distance":dist,"frmoLati":frm_lat,"fromLongi":frm_long,"toLati":to_lat,"toLongi":to_long};
				// dis_lat_lng
			  	var frm_pos     =new google.maps.LatLng(frm_lat,frm_long); // from position 
                var to_pos     =new google.maps.LatLng(to_lat,to_long); // to position 
                var from_to    =[frm_pos,to_pos];

                var lineSymbol ={
						          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
						        };
                var plineInfo  ={ path: from_to,
						          geodesic: true,
						          //strokeColor: '#FF0000',
						          strokeColor: '#000000',
						          strokeOpacity: 1.0,
						          strokeWeight: 1,
						          icons:[{
						            icon: lineSymbol,
						            offset: '100%'
						          }]
                			};
				if(!already_route_found)
				{
					addLine(plineInfo,gmap);
				}else{
					removeLine(plineInfo,gmap);
					addLine(plineInfo,gmap);					
				}			
                //var my_route   =new google.maps.Polyline(plineInfo);
                //my_route.setMap(gmap);

                // draw the lines from to : 
			 	//console.log("---------------");

		}
					
 
 	}
	
				
	
	
	 // 
	 function draw_points (data_node_jsn,gmap){
		  for(var i=0; i<data_node_jsn.length;i++){
	       		var jsnObj =data_node_jsn[i];
	       	 	//console.log("type "+i+": ",typeof(jsnObj));
	       	 	//console.log(Object.keys(jsnObj));
	       	 	//console.log("index of 151:",data_node_jsn.indexOf(151));
	       	 	// add id to id_arr 
	       	 	//console.log(jsnObj.id);
	       	 	id_arr.push(jsnObj.id);
	       	 	var rw =jsnObj.xr; 
			  	var hw =jsnObj.yh; 
			  	//console.log("value","("+rw+", "+hw+")" );
			  	var myLatLng =gk2geo(rw,hw);
			  	var myLat =myLatLng[0];
			  	var myLong =myLatLng[1];
			  	var ptName= "Haltestelle "+ jsnObj.id+": ("+myLat+", "+myLong+")";
			  	// Add the lattitude and longitude to above  the corresponding array; 
			  	lat_arr.push(myLat);
			  	long_arr.push(myLong);
			  	
			  	//for the map 
			 
			  	var pos     =new google.maps.LatLng(myLat,myLong);
                var marker  =new google.maps.Marker({position:pos,title:ptName,icon:rxmarker,map:gmap});
               // draw all the lines in the google map 
		       }

		       // draw lines 
		         // for pipe.json 
				//check how long are the arrays  : 
				//console.log("id length:",id_arr.length);
				//console.log("lt length:",lat_arr.length);
				//console.log("id length:",long_arr.length);
		       // for pipe.json 
	
	 }
	// 
	
	// define boundries

	map_bounds = {
     	north:48.133973,
		   
		south: 48.087356,
		//48.051811, 9.787946
		west: 9.751005,
		east: 9.851816
	};
	

// calculate the distance between two points 
  function calculateDistance(lat1, lon1, lat2, lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
  	var dLon = (lon2 - lon1) * Math.PI / 180;
  	var a = 0.5 - Math.cos(dLat)/2 + 
     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
     (1 - Math.cos(dLon))/2;

  return R * 2 * Math.asin(Math.sqrt(a));
}
//
//
//	
 function make_lineArrow (){
	 
	 var xhttp_pipe = new XMLHttpRequest();
				 xhttp_pipe.onreadystatechange = function() {
				    if (this.readyState == 4 && this.status == 200) {
				    	var data_pipe_jsn =JSON.parse(this.responseText);
				   	 	handle_with_pipe_data(data_pipe_jsn,"demo2");
				   	 	/*****We take here:  
				   	 		* route_point_arr:  a route path and search these points into:  
				   	 		* id_arr: the array contaning ids 
				   	 		* lat_arr: the array containing the corresponding latitudes 
				   	 		* long_arr: the array containing longitudes 
				   	 		* as an example take route as the folloiwng 
				   	 		* var route_point_arr = [11, 3, 5, 8, 13, 17, 21, 25, 29, 145, 30, 31, 176, 33, 217, 34, 39, 37, 293, 411, 319, 422, 421, 323, 322, 324, 423, 424, 425, 9, 10] 
				   	 	*/
				   	 	//var route_point_arr = [1, 3, 5, 8, 13, 17, 21, 25, 29, 145, 30, 31, 176, 33, 217, 34, 39, 37, 293, 411, 319, 422, 421, 323, 322, 324, 423, 424, 425, 9];
				   	 	//handle_route_request(route_point_arr, id_arr,lat_arr,long_arr);

				    }
				  };			
				  //alert(fileName2);
				 xhttp_pipe.open("GET", fileName2, true);
				  xhttp_pipe.send();	
  			// Here we start  draw the color lines and show the direction from the starting point to 
  			// the final point 
			

 }
//	
	
	
//Define style of the map here 
 mapStyle =[
			
			{elementType: 'geometry', stylers: [{color: bgColor}]},
            {elementType: 'labels.text.stroke', stylers: [{color: labelTextColor}]},
			{elementType: 'labels.text.fill', stylers: [{color: '#746855'},{visibility:"off"}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]

            },
			{
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },

            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
			{
				featureType: 'poi.business',
				stylers: [ { visibility: "off" }]
            },
			{
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'},{visibility:"off"}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'},{visibility:"off"}],
			   
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'},{visibility:"off"}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'},{visibility:"off"}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'},{visibility:"off"}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'},{visibility:"off"}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'},{visibility:"off"}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
			  
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: waterColor}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'},{visibility:"off"}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            },
			{
				featureType: 'transit',
				elementType: 'labels.icon',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType:'rail',
				elementType:'geometry.stroke',
				stylers:[{visibility:'off'}]
			},{
				featureType:'poi.attraction',
				elementType: 'geometry',
				stylers: [{color: '#263c3f'}]
			}
        

          ];
 	
