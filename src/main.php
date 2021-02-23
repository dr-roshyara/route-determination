   </head>
  <body>

    
<div class="container" >
<div class="flex flex-col text-2xl py-4">      
    <p class="mx-auto"> The bus stops are marked with numbers. Buses routes are either only one way or two ways. You can see the name of the Bus stops  when youput your mouse on the stops.  </p>
    <p class="px-2 font-semibold text-gray-800 py-4 mx-auto">  You are interested to travel from one palce to other? No problem at all. <br> 

     Just select th start and end stops of your route. If there is an  exsiting route  between the start and end stops, this program will display the shortest route for you.  To display the route, please click on the button:
    <p class="mx-auto my-4 py-2 rounded "> <b>'ROUTE FINDEN'.</b></p>
    Sie werden  dann sehen wie Ihre Route ist. 
  <div> 
      <p class="font-semibold text-2xl py-2"> Example:</p>  
        <ul> 
          <li> Give the start stop at the input:  startstelle  e.g. 182</li>
          <li> Give the end stop at input:        Endstelle e.g.  145 </li>
      </ul>
  </div>
</div>
    <div class="flex flex-col py-4 px-2  text-xl">
      <div class="col-sm-12">
          <form method="post"  id="suche_starten">
            <div class="flex flex-row py-2">
                  <!--- Input for start point --> 
                    <div class="p-2 border border-gray-200"> <label><b>Von &nbsp</b></label> 
                    <input class="p-3 m-2" type="text" 
                      name="startstelle" 
                      placeholder="Starstelle" 
                            onkeyup="suggest_start_end_point(this.value,'start_haltestelle','route_message')"> 
                       <span class="error" id="start_err">* </span>  
                    <span id="start_haltestelle"></span> 
                  </div>
                 <!-- Input for end point --> 
                     <div class="p-2 border border-gray-200"><label> <b>Nach</b></label>
                      <input class="p-3 m-2" type="text" name="endstelle"  placeholder="Endstelle" 
                     onkeyup="suggest_start_end_point(this.value,'end_haltestelle','route_message')"> 
                     <span class="error" id="end_err">*</span>
                     <!-- search button -->
                     <span id="end_haltestelle"></span>
                  </div>  
                <div class=" py-1 px-1 bg-blue-300 m-2 rounded ">
                <input class="bg-blue-400 rounded text-white px-8 py-6 shadow" onclick="search_the_route()" type="button"    value="ROUTE FINDEN" > 
                <!--   
               <button onclick="search_the_route();" id="click_to_search"> ROUTE FINDEN</button> 
               <p class="error" id="route_message"> </p> 
             -->
               </div> 
             </div>
          </form> 
      </div>
         
    </div><!-- div class --row --> 
    <div class="row py-6 px-2 text-2xl my-auto"  >
       <p class="error" id="route_message" > </p>       
    </div>
            
    
</div><!-- container --> 
