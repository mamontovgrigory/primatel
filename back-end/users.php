<?php
include_once __DIR__."/database.php";

class Users{
	private $db;
	private $users_table = "users";
	
	function __construct() {
		$this->db = new Database();
		$this->db->query("CREATE TABLE IF NOT EXISTS `".$this->users_table."` (
			`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			`login` VARCHAR(50) UNIQUE, 
			`password` VARCHAR(60),
			`is_admin` BOOLEAN
			)
		");
	}
	
	public function getPasswordHash($password){
		return md5($password);
	}
	
	public function login($login, $password){
		$result = $this->db->query("SELECT id, login, is_admin as isAdmin FROM ".$this->users_table.
		" WHERE login='".$login."' AND password='".$this->getPasswordHash($password)."'");
		$result = $result->fetch_assoc();
		if($result) {			
			$result["isAdmin"] = $result["isAdmin"] == 1 ? true : false;
		}
		return $result;
	}
	
	public function getList($returnArray = true){
		$result = $this->db->query("SELECT u.id, u.login, u.group_id as groupId, g.name as groupName 
            FROM ".$this->users_table." u
            LEFT JOIN groups g on u.group_id = g.id");
		if($returnArray){
			$result_array = array();
			while($res = $result->fetch_assoc()){
				$res["isAdmin"] = $res["isAdmin"] == 1 ? true : false;
				array_push($result_array, $res);
			}			
			return $result_array;
		}else{
			return $result;
		}
	}
	
	public function save($props){
		if(array_key_exists("id", $props)){
			$password = array_key_exists("password", $props) ? ",password='".$props["password"]."'" : "";
			$this->db->query("UPDATE ".$this->users_table." SET login='".$props["login"]."',group_id=".$props["group_id"].$password." WHERE id = ".$props["id"]);
		}else{
			$props["id"] = $this->db->query("INSERT INTO ".$this->users_table." (".implode(",", array_keys($props)).") VALUES ('".implode("','", $props)."')");
		}
		return $props;
	}
	
	public function del($id){
		$this->db->query("DELETE FROM ".$this->users_table." WHERE id = ".$id);
	}
	
	public function getAccountUserId(){
		return array_key_exists("user_id", $_COOKIE) ? $_COOKIE["user_id"] : null;
	}
	
	public function get_user_permissions(){
		$user_id = $this->getAccountUserId();
		$result = $this->db->query("SELECT p.alias, p.name, IF(ISNULL(p.resource_table), 'boolean', 'list') AS type, pv.value FROM users u 
                LEFT JOIN permissions_values pv ON pv.group_id = u.group_id
                LEFT JOIN permissions p ON pv.permission_id = p.id
                WHERE u.id = ".$user_id);
		$result_array = array();
		if($result){
			while($res = $result->fetch_assoc()){
				switch($res["type"]){
					case "boolean":
						$res["value"] = $res["value"] === "true";
						break;
					case "list":
						$res["value"] = explode(",", $res["value"]);
						break;
				}
				array_push($result_array, $res);
			}	
		}				
		return $result_array;
	}
}
?>