<?php
header('Access-Control-Allow-Origin: *');

if($_REQUEST && array_key_exists("from", $_REQUEST) && array_key_exists("to", $_REQUEST)){
	include __DIR__."/telephony.php";
	$telephony = new Telephony();
	
	$login_ids = array_key_exists("loginIds", $_REQUEST) ? $_REQUEST["loginIds"] : array();
	$result = $telephony->getCallsTotals($_REQUEST["from"], $_REQUEST["to"], $login_ids);
	echo json_encode($result);
}
	