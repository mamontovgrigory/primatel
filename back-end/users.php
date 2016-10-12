<?php
include "database.php";

class Users{
	private $db;
	private $db_name = "telephony";
	private $users_table = "users";
	
	function __construct() {
		$this->db = new Database($this->db_name);
		$this->db->query("CREATE TABLE `".$this->users_table."` (
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
		$result = $this->db->query("SELECT id, login, is_admin as isAdmin FROM ".$this->users_table);
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
			$this->db->query("UPDATE ".$this->users_table." SET login='".$props["login"]."',is_admin=".$props["is_admin"].$password." WHERE id = ".$props["id"]);
		}else{
			$props["id"] = $this->db->query("INSERT INTO ".$this->users_table." (".implode(",", array_keys($props)).") VALUES ('".implode("','", $props)."')");
		}
		return $props;
	}
	
	public function del($id){
		$this->db->query("DELETE FROM ".$this->users_table." WHERE id = ".$id);
	}
}
?>