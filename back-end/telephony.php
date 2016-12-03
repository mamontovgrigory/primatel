<?php
date_default_timezone_set("Europe/Moscow");
include_once __DIR__."/database.php";

class Telephony{
	public $date_format = "Y-m-d";
	public $datetime_format = "Y-m-d H:i:s";
	
	private $groups;
	private $url = "http://tp-api.primatel.ru/";
	private $login = "tvtrade";
	private $password = "iVnR6S5j2v6";
	private $mode = "json";
	private $sid;
	private $db;
	private $list_users_table = "list_users";
	private $list_sips_table = "list_sips";
	private $calls_details_table = "calls_details";
	private $calls_details_updates_table = "calls_details_updates";
	
	private $recordsMaxCount = 1000;
	
	function __construct() {
		$this->db = new Database();
		
		$this->db->query("CREATE TABLE IF NOT EXISTS `".$this->list_users_table."` (
			`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			`login` VARCHAR(50) UNIQUE, 
			`balance` VARCHAR(50), 
			`symbol` VARCHAR(50)
			)
		");
		$this->db->query("
			CREATE TABLE IF NOT EXISTS ".$this->list_sips_table." (
			`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			`sip_login` VARCHAR(50) UNIQUE,
			`login_id` INTEGER REFERENCES ".$this->list_users_table." (id)
			);
		");
		$this->db->query("
			CREATE TABLE IF NOT EXISTS ".$this->calls_details_table." (
			`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			`sip_login_id` INTEGER REFERENCES ".$this->list_sips_table." (id),
			`time` DATETIME,
			`numfrom` VARCHAR(50),
			`numto` VARCHAR(50),
			`direction` VARCHAR(50),
			`duration` VARCHAR(50),
			`zone` VARCHAR(50),
			`amount` VARCHAR(50),
			`currency` VARCHAR(50),
			`callid` VARCHAR(50) UNIQUE,
			`disposition` VARCHAR(50)
			);
		");
		$this->db->query("
			CREATE TABLE IF NOT EXISTS ".$this->calls_details_updates_table." (
			`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			`datetime` DATETIME
			);
		");
	}
	
	public function formatSeconds($seconds){
		return gmdate("H:i:s", $seconds);
	}
	
	public function formatPhoneNumber($data){
		return "+".substr($data, 0, 1)." (".substr($data, 1, 3).") ".substr($data, 4, 3)."-".substr($data, 7, 2)."-".substr($data,9);
	}
	
	private function primatelApi($svc = "login", $query_params = array(), $json = true){
		$string_params = array(
			"svc" => $svc,
			"mode" => $this->mode
		);
		$params = array_merge(array(			
			"login" => $this->login,
			"password" => $this->password,
			"sid" => $this->sid
		), $query_params);
		$result = file_get_contents($this->url."?".http_build_query($string_params), false, stream_context_create(array(
			"http" => array(
				"method"  => "GET",
				"header"  => "Content-type: application/json; charset=utf-8",
				"content" => http_build_query($params)
			)
		)));

		if($json){
			try{
				return json_decode($result);
			}catch(Exception $e){
				return NULL;
			}
		}else{
			return $result;
		}
				
	}
	
	public function saveAccount($props){
		if(array_key_exists("id", $props)){
			$this->db->query("UPDATE ".$this->accounts_table." SET name='".$props["name"]."',account='".$props["account"]."',password=".$props["password"]." WHERE id = ".$props["id"]);
		}else{
			$props["id"] = $this->db->query("INSERT INTO ".$this->accounts_table." (".implode(",", array_keys($props)).") VALUES ('".implode("','", $props)."')");
		}
		return $props;
	}
	
	public function getListAccounts($returnArray = true){
		$result = $this->db->query("SELECT * FROM ".$this->accounts_table);
		if($returnArray){
			$result_array = array();
			while($res = $result->fetch_assoc()){
				array_push($result_array, $res);
			}			
			return $result_array;
		}else{
			return $result;
		}
	}
	
	public function login(){
		$data = $this->primatelApi();
		$this->sid = $data->data->sid;	
	}
	
	public function listUsers(){
		$this->login();
		$params = array(
					"page_size" => 100,
					"page_number" => 1
				);
		$data = $this->primatelApi("listUsers", $params);
		return $data;
	}	
	
	public function updateListUsers(){		
		$data = $this->listUsers();		
		
		foreach($data->data->data as $data_arr){
			$this->db->query("INSERT INTO ".$this->list_users_table." (".implode(",", $data->data->names).") VALUES ('".implode("','", $data_arr)."')");	
		}
	}
	
	public function getListUsers($returnArray = true){
		$result = $this->db->query("SELECT * FROM ".$this->list_users_table." ORDER BY login");
			if($returnArray){
				$result_array = array();
				if($result){
					while($res = $result->fetch_assoc()){
						array_push($result_array, $res);
					}	
				}							
				return $result_array;
			}else{
				return $result;
			}		
	}
	
	public function getListPermittedUsers($returnArray = true){
		$user_id = array_key_exists("user_id", $_COOKIE) ? $_COOKIE["user_id"] : null;
		if($user_id){
			$permissions = $this->db->query("SELECT pv.* FROM USERS u 
			LEFT JOIN groups g ON u.group_id = g.id
			LEFT JOIN permissions_values pv ON g.id = pv.group_id 
			INNER JOIN permissions p ON p.id = pv.permission_id
			WHERE u.id = ".$user_id." AND p.alias = 'list_users'")->fetch_assoc();
			if($permissions){
				$result = $this->db->query("SELECT * FROM ".$this->list_users_table." WHERE id IN(".$permissions["value"].") ORDER BY login");
				if($returnArray){
					$result_array = array();
					if($result){
						while($res = $result->fetch_assoc()){
							array_push($result_array, $res);
						}	
					}							
					return $result_array;
				}else{
					return $result;
				}
			}			
		}		
	}
	
	public function updateSips(){
		$result = $this->getListUsers(false);
		
		$this->login();
		while($res = $result->fetch_assoc()){
			$params = array(
				"user_login" => $res["login"],
				"page_size" => 100,
				"page_number" => 1
			);
			$data = $this->primatelApi("listSip", $params);
			if(gettype($data->data) === "object"){
				$key = array_search("login", $data->data->names);		
				foreach($data->data->data as $data_arr){
					$this->db->query("INSERT INTO ".$this->list_sips_table." (sip_login, login_id) VALUES ('".$data_arr[$key]."', '".$res["id"]."')");
				}
			}			
		}
	}
	
	public function getCallsTotals($login_ids = array(), $from = null, $to = null, $duration){
		$from = $from ? $from :  date($this->datetime_format, strtotime('-7 days'));
		$to = $to ? $to : date($this->datetime_format);
		$and = " AND lu.id IN (".implode(",", $login_ids).")";
		if($duration) $and.= " AND duration >= ".$duration;
		$query = "
			SELECT lu.login, COUNT(*) as count, DATE(cd.time) as date FROM ".$this->list_users_table." lu
			JOIN ".$this->list_sips_table." ls ON ls.login_id = lu.id
			JOIN ".$this->calls_details_table." cd ON cd.sip_login_id = ls.id
			WHERE ls.sip_login LIKE '%did%' 
			AND cd.time BETWEEN '".date($this->datetime_format,strtotime($from)-86400)."' 
			AND '".date($this->datetime_format,strtotime($to)+86400)."'".$and."
			GROUP BY DATE(cd.time), lu.login
			ORDER BY lu.login";
		$result = $this->db->query($query);

		$result_array = array(
			"dates" => array(),
			"data" => array()
		);
		
		$template_array = array();
		for($i = strtotime($from); $i <= strtotime($to); $i += 86400){
			array_push($result_array["dates"], date($this->date_format,$i));
			array_push($template_array, 0);
		}
		
		if($result){
			while($res = $result->fetch_assoc()){
				$login_array = array(
					"login" => $res["login"],
					"data" => array()
				);
				$key = array_search($res["date"], $result_array["dates"]);
				if(!array_key_exists($res["login"], $result_array["data"])){
					$result_array["data"][$res["login"]] = $template_array;
				}
				$result_array["data"][$res["login"]][$key] = $res["count"];
			}
		}
		
		return $result_array;
	}
	
	public function updateCallsDetails(){
		$result = $this->db->query("
			SELECT ls.*, lu.login FROM `".$this->list_sips_table."` as ls
			LEFT JOIN `".$this->list_users_table."`as lu ON lu.id = ls.login_id
		");
		$from = date($this->datetime_format, strtotime('-1 days'));
		$to = date($this->datetime_format);
		$this->login();
		while($sip = $result->fetch_assoc()){
			$total = 0;
			$page_number = 1;
			$page_size = 100;
			do{
				$params = array(
					"sip_login" => $sip["sip_login"],
					"from" => $from,
					"to" => $to,
					"min_duration" => 0,
					"page_size" => $page_size,
					"page_number" => $page_number
				);
				$data = $this->primatelApi("getCallsDetails", $params);
				if($total == 0){
					$total = $data->data->total;
				}else{
					$total -= $page_size;
				}
				$page_number++;
				if($data->data->data){
					$values = array();
					foreach($data->data->data as $data_arr){
						array_push($values, ("(".$sip["id"].",'".implode("','", $data_arr)."')"));
					}
					$this->db->query("REPLACE INTO ".$this->calls_details_table." (sip_login_id,".implode(",", $data->data->names).") VALUES ".implode(",", $values));
				}				
			} while($total >= $page_size);
		}
	}
	
	public function getCallsDetails($login_ids = array(), $from = null, $to = null, $duration = null, $returnArray = true){
		$from = $from ? $from : date($this->datetime_format, strtotime('-7 days'));
		$to = $to ? $to : date($this->datetime_format);
		$and = count($login_ids) != 0 ? " AND lu.id IN (".implode(",", $login_ids).")" : "";
		if($duration) $and.= " AND duration >= ".$duration;
		$query = "
			SELECT cd.*, lu.login FROM ".$this->list_users_table." lu 
			JOIN ".$this->list_sips_table." ls ON ls.login_id = lu.id 
			JOIN ".$this->calls_details_table." cd ON cd.sip_login_id = ls.id 
			WHERE ls.sip_login LIKE '%did%' 			
			AND cd.time BETWEEN '".date($this->datetime_format,strtotime($from))."' 
			AND '".date($this->datetime_format,strtotime($to))."'".$and." 
			ORDER BY lu.login, cd.time";
			
		$result = $this->db->query($query);		
		
		if($returnArray){
			$result_array = array();
			while($res = $result->fetch_assoc()){			
				array_push($result_array, $res);
			}			
			return $result_array;
		}else{
			return $result;
		}		
	}
	
	public function getCallRecord($user_login, $call_id){
		$this->login();		
		$data = $this->primatelApi("downloadCallRecord", array(
			"user_login" => $user_login,
			"call_id" => $call_id
		), false);
		return $data;
	}
	
	public function downloadCallRecord($user_login, $call_id){
		$filename = __DIR__."/records/".$call_id.".mp3";
		if(!file_exists($filename)){
			$this->login();
			$data = $this->primatelApi("downloadCallRecord", array(
				"user_login" => $user_login,
				"call_id" => $call_id
			), false);
			file_put_contents($filename, $data);
		}
		return "/records/".$call_id.".mp3";	
	}
	
	public function deleteRecords(){
		$dir = __DIR__.'/records';
		$files = scandir($dir);
		$excludes = array(".", "..");
		if(count($files) > $this->recordsMaxCount + count($excludes)){
			foreach($files as $file){
				if(!in_array($file, $excludes)){
					unlink($dir."/".$file);
				}
			}
		}
	}
	
	public function getUpdateDate(){
		$result = $this->db->query("SELECT datetime FROM ".$this->calls_details_updates_table." ORDER BY id DESC LIMIT 1;");
		return $result->fetch_assoc()["datetime"];
	}
	
	public function update(){
		echo "update start";		
		$this->updateListUsers();
		$this->updateSips();
		$this->updateCallsDetails();
		$this->db->query("INSERT INTO ".$this->calls_details_updates_table." (datetime) VALUES ('".date($this->datetime_format)."')");
		echo "update finished";
	}
}
?>