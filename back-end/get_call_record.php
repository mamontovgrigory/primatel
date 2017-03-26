<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

if($_POST){
	include __DIR__."/telephony.php";
	$telephony = new Telephony();
	
	$record = $telephony->downloadCallRecord($_POST["login"], $_POST["callid"]);
	
	$result = array(
		"src" => $record
	);
	
	echo json_encode($result);
}