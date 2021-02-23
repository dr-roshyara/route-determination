      function suggest_start_end_point(point_name,suggest_css_id,route_message_id) {
        var suggest_div = document.getElementById(suggest_css_id);
        var route_div   =document.getElementById(route_message_id);
        if (point_name.length == 0) {
          suggest_div.innerHTML = "";
            return;
        } else {
            var xml_http_request = new XMLHttpRequest();
            xml_http_request.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                   route_div.innerHTML   ="";
                   suggest_div.innerHTML = this.responseText;


                }
            }
            var point_file_name ="../src/id_list.php?q="+point_name;
            xml_http_request.open("GET",point_file_name , true);
            xml_http_request.send();
        }
    }


         

    function search_the_route( ){
       var route_message_id= document.getElementById("route_message");
       var search_id   =document.getElementById("suche_starten");
	   //var click_to_search =document.getElementById("click_to_search");
      search_id.addEventListener('click', function(e){
      //click_to_search.addEventListener('click', function(e){
        e.preventDefault();
        var xml_http_request=new XMLHttpRequest();
        xml_http_request.onreadystatechange = function() {
              console.log(this.readyState);
              console.log(this.status);
        
          if (this.readyState == 4 && this.status == 200) {

                  // first make javascript array
                var myObj =JSON.parse(this.responseText);
                console.log(myObj);
                 if(myObj){

                         var shortest_path=[];
                         route_message="<b>Ihre Route:</b>\n";
						  var i =1
                          for (x in myObj) {
                            if(i==1){
								route_message+= myObj[x];
							}else{
								route_message+="=> "+ myObj[x];
								
							}	
							++i;
							shortest_path.push(myObj[x]); 
				
                          }
						  route_message+="."
						  i=0;
                         route_message_id.innerHTML=route_message;
                         // Start to draw in the google map. 
						 if(already_route_found){
							 initialize(clat,clong,"maport",data_node_jsn, zf);
							}
                          plot_shortest_path(shortest_path);
                         

                  }else{
                     route_message_id.className="error";
                    route_message_id.innerHTML ="Derzeit finden wir keine direkte Route zwischen den beiden Haltestellen. Warscheinlich haben wir  in der Zukunft eine gute Nachricht für Sie, wenn die Stadt eine neue Route entwickelt.";

                  }

              
                }
            }  
                       
            
              // take the variables first 
              var start_stelle  =search_id.elements.namedItem("startstelle").value;
              var end_stelle    =search_id.elements.namedItem("endstelle").value;
              var startErr      =document.getElementById('start_err');
              var endErr        =document.getElementById('end_err')
              var start_suggest =document.getElementById('start_haltestelle');
              var end_suggest   =document.getElementById('end_haltestelle');
              
              //check the start_stelle
              if(start_stelle==""){
                  startErr.innerHTML  ="*Startstelle ist erforderlich.";
                  return;


              }else if(end_stelle==""){
                  endErr.innerHTML="*Endstelle ist erforderlich.";
                return;

              }else{
                startErr.innerHTML      ="*";
                endErr.innerHTML        ="*";
                start_suggest.innerHTML ="";
                end_suggest.innerHTML   =""
                var dataString          = start_stelle+', '+end_stelle; 
                var point_file_name     ="../src/find_distance.php?q="+dataString;
                //alert (point_file_name);
               xml_http_request.open("GET",point_file_name , true);
               xml_http_request.send();
          }  
    }); 
    
      return ;} 

