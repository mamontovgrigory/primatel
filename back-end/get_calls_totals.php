<?php
header('Access-Control-Allow-Origin: *');

if($_REQUEST && array_key_exists("from", $_REQUEST) && array_key_exists("to", $_REQUEST)){
	include __DIR__."/telephony.php";
	$telephony = new Telephony();
	
	$login_ids = array_key_exists("loginIds", $_REQUEST) ? $_REQUEST["loginIds"] : array();
	$duration = array_key_exists("duration", $_REQUEST) && $_REQUEST["duration"] ? $_REQUEST["duration"] : null;
	$result = $telephony->getCallsTotals($login_ids, $_REQUEST["from"], $_REQUEST["to"], $duration);
	echo json_encode($result);
}
	