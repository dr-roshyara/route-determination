<?php 
  
	// write the urls of the file 
	$url_node 		=$baseDir."/public/data/node.json";
	$url_pipe		=$baseDir."/public/data/pipe.json";
	//read the data 
	$data_node 		=file_get_contents($url_node);
	$data_pipe		=file_get_contents($url_pipe);
	//change them into json format 
	$data_jsn_node	=json_decode($data_node);
	$data_jsn_pipe	=json_decode($data_pipe);
	
	

	// $coord_arr = array();
	//make an arry of coordinates 
	// This contains: id, latitude and longitude  
	//make an array of from to
	//from: id  and to to:id 

	//test 	  	
	/*
	foreach ($data_jsn_node as$djn ) {
		
		echo '('.$djn->xr . ', '.$djn->yh.')';
	}

	//test 	  	
	foreach ($data_jsn_pipe as$djp ) {
		echo $djp->ann . ', ';
	}
	*/
?>