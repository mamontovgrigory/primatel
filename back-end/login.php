<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

if($_REQUEST && array_key_exists("login", $_REQUEST) && array_key_exists("password", $_REQUEST)){
	include __DIR__."/users.php";
	$users = new Users();
	
	$result = $users->login($_REQUEST["login"], $_REQUEST["password"]);
	
	echo json_encode($result);
}
?>