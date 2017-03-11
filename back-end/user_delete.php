<?php
header('Access-Control-Allow-Origin: *');

if($_REQUEST && array_key_exists("id", $_REQUEST)){
	include __DIR__."/users.php";
	$users = new Users();
	
	$result = $users->del($_REQUEST["id"]);
	
	echo json_encode(array("success" => true));
}
?>