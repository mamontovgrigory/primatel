<?php
header('Access-Control-Allow-Origin: *');

if($_REQUEST && $_REQUEST["loginId"] && $_REQUEST["date"]){
	include __DIR__."/telephony.php";
	$telephony = new Telephony();

	$duration = array_key_exists("duration", $_REQUEST) && $_REQUEST["duration"] ? $_REQUEST["duration"] : null;
	$result = $telephony->getCallsDetails(array($_REQUEST["loginId"]), $_REQUEST["date"]." 00:00:00", $_REQUEST["date"]." 23:59:59", $duration);
	echo json_encode($result);
}