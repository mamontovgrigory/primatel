<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

if($_REQUEST && $_REQUEST["loginId"] && $_REQUEST["date"]){
	include __DIR__."/telephony.php";
	$telephony = new Telephony();

	$duration = array_key_exists("duration", $_REQUEST) && $_REQUEST["duration"] ? $_REQUEST["duration"] : null;
	$result = $telephony->getCallsDetails(array($_REQUEST["loginId"]), $_REQUEST["date"]." 00:00:00", $_REQUEST["date"]." 23:59:59", $duration, false);
	
	$result_array = array();
	while($res = $result->fetch_assoc()){			
		array_push($result_array, array(
			"id" => $res["id"],
			"time" => $res["time"],
			"numfrom" => $telephony->formatPhoneNumber($res["numfrom"]),
			"numto" => $telephony->formatPhoneNumber($res["numto"]),
			"duration" => $telephony->formatSeconds($res["duration"]),
			"callid" => $res["duration"] != 0 ? $res["callid"] : NULL,
			"mark" => $res["mark"],
			"model" => $res["model"],
			"comment" => $res["comment"],
			"useful" => $res["useful"],
		));
	}
	echo json_encode($result_array);
}