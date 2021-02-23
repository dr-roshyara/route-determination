<?php 
// Initially there is no suggestion : 

 include('final_graph.php');
// get the q parameter from URL
$suggest_request = $_REQUEST["q"];

$our_suggestion = "";

// lookup all hints from array if $q is different from ""
if ($suggest_request !== "") {
    $suggest_request = strtolower($suggest_request);
    $len=strlen($suggest_request);
    foreach($arr_id  as $idx) {
        if (stristr($suggest_request, substr($idx, 0, $len))) {
            if ($our_suggestion === "") {
                $our_suggestion = $idx;
            } else {
                $our_suggestion .= ", $idx";
            }
        }
    }
}
$start_comment  ="<br><b>Unsere Vorschlag:</b>";
$end_comment    = $start_comment.'<span style="font-weight:bold; color: red;"> 
                    Entschuldigen Sie bitte, der Haltestelle, die Sie geschrieben haben, ist nicht in unserer Datenbank aufgeführt.Wahrscheinlich müssen Sie den idxn korrigieren.</span>';
// Output "no suggestion" if no hint was found or output correct values
echo $our_suggestion === "" ? $end_comment: $start_comment.$our_suggestion."<br>";

?>