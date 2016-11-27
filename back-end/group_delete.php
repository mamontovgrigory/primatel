<?php
header('Access-Control-Allow-Origin: *');

if($_REQUEST && array_key_exists("id", $_REQUEST)){
	include __DIR__."/groups.php";
	$groups = new Groups();
	
	$result = $groups->del($_REQUEST["id"]);
}
?>