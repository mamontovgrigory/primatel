<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

if($_REQUEST && array_key_exists("id", $_REQUEST)){
	include __DIR__."/groups.php";
	$groups = new Groups();
	
	$result = $groups->del($_REQUEST["id"]);
	
	echo json_encode(array("success" => true));
}
?>