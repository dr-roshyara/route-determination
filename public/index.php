<?php  
  /***********************************************************************************************/
    //For included files
  /***********************************************************************************************/
  require_once __DIR__. "/../vendor/autoload.php";
   $url_node     ="../data/node.json";
  //read the data 
  $data_node    =file_get_contents($url_node);
    //change them into json format 
    $data_jsn_node  =json_decode($data_node);
   // echo $_vendor_dir;	
?>

  <div id="demo2"></div>
      <div id="maport"></div>
      <script>
          var clat        =48.1146659306388;    // center for lattitude 
      var clong       =9.798395982027518;   // center for longitude
      var zf          =17.5;                // zoom factor 
      var data_node_jsn   = (<?php echo $data_node;?>);
      var initMap     = initialize.bind(null,  clat,clong,"maport",data_node_jsn, zf);        
    
    
    
  </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDB4Q0XWgbYHI0WHpu5E2tQA5gMtcNu2M&callback=initMap">
    </script>
