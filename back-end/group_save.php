<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

if($_POST){
	include __DIR__."/groups.php";
	$groups = new Groups();

	$props = $_POST;
	$settings = array();
	if(array_key_exists("settings", $props)){
		foreach($props["settings"] as $setting_id => $setting){
			switch(gettype($setting)){
				case "array":
					$settings[$setting_id] = implode(",", $setting);
					break;
				default:
					$settings[$setting_id] = $setting;
			}
		}
		$props["settings"] = $settings;
	}	
	$result = $groups->save($props);
	
	echo json_encode(array("success" => true));
}
?>