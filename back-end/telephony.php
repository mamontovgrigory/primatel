<?php
date_default_timezone_set("Europe/Moscow");
include "database.php";

class Telephony{
	public $date_format = "Y-m-d";
	public $datetime_format = "Y-m-d H:i:s";
	
	private $url = "http://tp-api.primatel.ru/";
	private $login = "tvtrade";
	private $password = "iVnR6S5j2v6";
	private $mode = "json";
	private $sid;
	private $db;
	private $db_name = "telephony";
	private $accounts_table = "accounts";
	private $list_users_table = "list_users";
	//private $calls_totals_table = "calls_totals";
	private $list_sips_table = "list_sips";
	private $calls_details_table = "calls_details";
	
	function __construct() {
		$this->db = new Database($this->db_name);
		$this->db->query("CREATE TABLE `".$this->accounts_table."` (
			`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			`name` VARCHAR(50) CHARACTER SET utf8,
			`account` VARCHAR(50) UNIQUE, 
			`password` VARCHAR(50)
			)
		");
		$this->db->query("CREATE TABLE `".$this->list_users_table."` (
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
		echo "listUsers ";
		var_dump($data);
		return $data;
	}	
	
	public function updateListUsers(){		
		$data = $this->listUsers();		
		
		foreach($data->data->data as $data_arr){
			$this->db->query("INSERT INTO ".$this->list_users_table." (".implode(",", $data->data->names).") VALUES ('".implode("','", $data_arr)."')");	
		}
	}
	
	public function getListUsers($returnArray = true){
		$result = $this->db->query("SELECT * FROM ".$this->list_users_table);
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
			$key = array_search("login", $data->data->names);		
			foreach($data->data->data as $data_arr){
				$this->db->query("INSERT INTO ".$this->list_sips_table." (sip_login, login_id) VALUES ('".$data_arr[$key]."', '".$res["id"]."')");
			}
		}
	}
	
	public function getCallsTotals($from = null, $to = null, $login_ids = array()){
		$from = $from ? $from :  date($this->datetime_format, strtotime('-7 days'));
		$to = $to ? $to : date($this->datetime_format);
		$and = count($login_ids) != 0 ? " AND lu.id IN (".implode(",", $login_ids).")" : "";
		$query = "
			SELECT lu.login, COUNT(*) as count, DATE(cd.time) as date FROM ".$this->list_users_table." lu
			JOIN ".$this->list_sips_table." ls ON ls.login_id = lu.id
			JOIN ".$this->calls_details_table." cd ON cd.sip_login_id = ls.id
			WHERE ls.sip_login LIKE '%did%' 
			AND cd.time BETWEEN '".date($this->datetime_format,strtotime($from)-86400)."' AND '".date($this->datetime_format,strtotime($to)+86400)."'".$and."
			GROUP BY DATE(cd.time), lu.login
			ORDER BY cd.time";		
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
			$page_number = 100;
			$page_size = 1;
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
					foreach($data->data->data as $data_arr){
						//$call_id_key = array_search("callid", $data->data->names);
						//$this->downloadCallRecord($sip["login"], $data_arr[$call_id_key]);
						$this->db->query("INSERT INTO ".$this->calls_details_table." (sip_login_id,".implode(",", $data->data->names).") VALUES (".$sip["id"].",'".implode("','", $data_arr)."')");	
					}
				}				
			} while($total >= $page_size);
		}
	}
	
	public function getCallsDetails($login_id, $date){
		$query = "
			SELECT cd.*, lu.login FROM ".$this->list_users_table." lu 
			JOIN ".$this->list_sips_table." ls ON ls.login_id = lu.id 
			JOIN ".$this->calls_details_table." cd ON cd.sip_login_id = ls.id 
			WHERE ls.sip_login LIKE '%did%' 
			AND DATE(cd.time) = '".date($this->date_format,strtotime($date))."' 
			AND lu.id = ".$login_id;
		$result = $this->db->query($query);
		$result_array = array();
		
		while($res = $result->fetch_assoc()){			
			array_push($result_array, $res);
		}
		
		return $result_array;
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
		$this->login();
		$data = $this->primatelApi("downloadCallRecord", array(
			"user_login" => $user_login,
			"call_id" => $call_id
		), false);
		$filename = __DIR__."/records/".$call_id.".mp3";
		if(!file_exists($filename)){
			file_put_contents($filename, $data);			
		}
		return $data ? "/records/".$call_id.".mp3" : NULL;		
	}
	
	public function update(){
		echo "update start";		
		$this->updateListUsers();
		$this->updateSips();
		$this->updateCallsDetails();
		echo "update finished";	
		//echo "<pre>";
		//echo json_encode($this->getListUsers());
	}
}
?>