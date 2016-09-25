<?php
header('Access-Control-Allow-Origin: *');

if($_REQUEST && $_REQUEST["loginId"] && $_REQUEST["date"]){
	include __DIR__."/telephony.php";
	$telephony = new Telephony();

	$result = $telephony->getCallsDetails($_REQUEST["loginId"], $_REQUEST["date"]);
	echo json_encode($result);
}