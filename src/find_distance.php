<?php 
	 
	 include __DIR__."/final_graph.php";
	 include __DIR__."/../vendor/fisharebest/algorithm/src/Dijkstra.php";
	 $algorithm = new \Fisharebest\Algorithm\Dijkstra($mgraph);
	  /****First read the start point and end point using ajax request 
	  	  *For this use HTML5form  
	  	  *  
			
	 */ 
	//echo " HI from find distance test";	
 	$startErr = $endErr = "";
	$startstelle=$endstelle="";	
	$q = $_GET['q'];
	//echo $q." ok \n"; 
	 $start_end = explode(",", $q);

	 /*est the data first if there are unnecessry symbols from hacking .  */
	 $startstelle =test_input($start_end[0]);
	 $endstelle   =test_input($start_end[1]);		
	function test_input($data) {
 			 $data = trim($data);
 			 $data = stripslashes($data);
  			$data = htmlspecialchars($data);
  			return $data;
		}	

	//echo "start: ".$startstelle."\n"; 
	//echo "endstelle:".$endstelle." \n"; 
	function find_shortest_path ($points_arry, $start_point,$end_point,&$algorithm)
	 { 
	 		 $path = $algorithm->shortestPaths($start_point, $end_point); // array()
			//echo implode(" ",$path[0]);
	 		 if(sizeOf($path)){
		  		$myPath = $path[0];
		  	}else{
		  		$myPath ="";
		  	}	
		return ($myPath);
	}	

		$shortest_path= find_shortest_path ($arr_id, $startstelle, $endstelle,$algorithm); 

	 	//echo "--------shortest path-----------";
	 	//echo explode(" ", $shortest_path);
 		//$is_path= "";
 		if($shortest_path){
 			//header('Content-Type: application/json');
    		//echo json_encode($shortest_path);
 		}else{	
			 //"NO_WAY"; 
		}	
		header('Content-Type: application/json');
    	echo json_encode($shortest_path, JSON_FORCE_OBJECT);	 
?>