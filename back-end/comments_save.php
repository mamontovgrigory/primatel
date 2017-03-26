<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

if($_POST){
	include __DIR__."/telephony.php";
	$telephony = new Telephony();
	
	$telephony->saveComments($_POST);

	echo json_encode(array("success" => true));
}
?>