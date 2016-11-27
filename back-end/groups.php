<?php
header('Content-Type: text/html; charset=utf-8');
include __DIR__."/database.php";

class Groups{
	private $db;
	private $groups_table = "groups";
	private $permissions_table = "permissions";
	private $permissions_values_table = "permissions_values";
	
	function __construct() {
		$this->db = new Database();		
		$this->db->query("CREATE TABLE IF NOT EXISTS `".$this->groups_table."` (
			`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			`name` VARCHAR(50) UNIQUE
			) DEFAULT CHARSET utf8
		");
		$this->db->query("
			CREATE TABLE IF NOT EXISTS `".$this->permissions_table."` (
			  `id` int(11) NOT NULL,
			  `name` varchar(500) NOT NULL,
			  `alias` varchar(500) NOT NULL,
			  `resource_table` varchar(100) DEFAULT NULL,
			  `name_column` varchar(100) DEFAULT NULL
			) DEFAULT CHARSET=utf8;
		");
		$this->db->query("
			CREATE TABLE `".$this->permissions_values_table."` (
			  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			  `group_id` int(11) NOT NULL UNIQUE,
			  `permission_id` int(11)NOT NULL UNIQUE,
			  `value` varchar(100) NOT NULL
			) DEFAULT CHARSET=utf8;
		");
	}
	
	
	public function getList($returnArray = true){
		$result = $this->db->query("SELECT * FROM ".$this->groups_table);
		if($returnArray){
			$result_array = array();
			$permissions = $this->getPermissions();
			while($res = $result->fetch_assoc()){	
				$res["permissions"] = $permissions;			
				array_push($result_array, $res);
			}			
			return $result_array;
		}else{
			return $result;
		}
	}
	
	public function getPermissions($returnArray = true){
		$result = $this->db->query("SELECT * FROM ".$this->permissions_table);
		if($returnArray){
			$result_array = array();
			while($res = $result->fetch_assoc()){	
				$resource_table = $res["resource_table"];
				if($resource_table){
					$list = array();
					$name_column = $res["name_column"] ? $res["name_column"] : "name";
					$list_res = $this->db->query("SELECT id, ".$name_column." as name FROM ".$resource_table);
					while($li = $list_res->fetch_assoc()){
						array_push($list, $li);
					}
					$res["list"] = $list;
				}			
				array_push($result_array, $res);
			}			
			return $result_array;
		}else{
			return $result;
		}
	}
	
	public function getGroupPermissions(){
		return $this->getPermissions();
	}
	
	public function save($props){		
		if(array_key_exists("id", $props)){
			$this->db->query("UPDATE ".$this->groups_table." SET name='".$props["name"]."' WHERE id = ".$props["id"]);
		}else{
			$props["id"] = $this->db->query("INSERT INTO ".$this->groups_table." (".implode(",", array_keys($props)).") VALUES ('".implode("','", $props)."')");
		}
		if($props["settings"]){
			$values = array();
			foreach($props["settings"] as $permission_id => $value){
				array_push($values, ("(".$props["id"].", ".$permission_id.", '".$value."')"));
			}
			$this->db->query("REPLACE INTO ".$this->permissions_values_table." (group_id, permission_id, value) VALUES ".implode(",", $values));
		}
		return $props;
	}
	
	public function del($id){
		$this->db->query("DELETE FROM ".$this->groups_table." WHERE id = ".$id);
	}
}
?>