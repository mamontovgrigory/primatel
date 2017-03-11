<?php
header('Access-Control-Allow-Origin: *');

if($_POST){
	include __DIR__."/users.php";
	$users = new Users();

	$props = $_POST;
	$props["is_admin"] = array_key_exists("isAdmin", $props) && $props["isAdmin"] === "true" ? 1 : 0;
	if(array_key_exists("isAdmin", $props)){		
		unset($props["isAdmin"]);
	}
	$props["group_id"] = array_key_exists("groupId", $props) && $props["groupId"] ? $props["groupId"] : 0;
	if(array_key_exists("groupId", $props)){		
		unset($props["groupId"]);
	}
	if(array_key_exists("password", $props)){
		$props["password"] = $users->getPasswordHash($props["password"]);
	}
	$result = $users->save($props);
	
	echo json_encode(array("success" => true));
}
?>