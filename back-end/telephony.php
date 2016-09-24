<?php
date_default_timezone_set("Europe/Moscow");
include "database.php";

class Telephony{
	public $datetime_format = "Y-m-d H:i:s";
	
	private $url = "http://tp-api.primatel.ru/";
	private $login = "tvtrade";
	private $password = "iVnR6S5j2v6";
	private $mode = "json";
	private $sid;
	private $db_name = __DIR__."/telephony.db";
	private $db;
	private $list_users_table = "list_users";
	//private $calls_totals_table = "calls_totals";
	private $list_sips_table = "list_sips";
	private $calls_details_table = "calls_details";
	
	function __construct() {
		$this->db = new Database($this->db_name);		
		$this->db->exec("
			CREATE TABLE IF NOT EXISTS ".$this->list_users_table." (
			id INTEGER PRIMARY KEY, 
			login VARCHAR UNIQUE, 
			balance VARCHAR, 
			symbol VARCHAR
		)");	
		/*$this->db->exec("CREATE TABLE IF NOT EXISTS ".$this->calls_totals_table." (
			id             INTEGER PRIMARY KEY,
			login          VARCHAR,
			inbound_count  VARCHAR,
			inbound_time   VARCHAR,
			outbound_count VARCHAR,
			outbound_time  VARCHAR,
			amount         VARCHAR,
			currency       VARCHAR
		);");*/
		$this->db->exec("
			CREATE TABLE IF NOT EXISTS ".$this->list_sips_table." (
			id INTEGER PRIMARY KEY,
			sip_login VARCHAR UNIQUE,
			login_id INTEGER REFERENCES ".$this->list_users_table." (id) 
		);");
		$this->db->exec("
			CREATE TABLE IF NOT EXISTS ".$this->calls_details_table." (
			id INTEGER PRIMARY KEY,
			sip_login_id INTEGER REFERENCES ".$this->list_sips_table." (id),
			time DATETIME,
			numfrom VARCHAR,
			numto VARCHAR,
			direction VARCHAR,
			duration VARCHAR,
			zone VARCHAR,
			amount VARCHAR,
			currency VARCHAR,
			callid VARCHAR UNIQUE,
			disposition VARCHAR
		);");
		$this->login();
	}
	
	private function primatelApi($svc = "login", $query_params = array()){
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

		try{
			return json_decode($result);
		}catch(Exception $e){
			return NULL;
		}		
	}
	
	public function login(){
		$data = $this->primatelApi();
		$this->sid = $data->data->sid;	
	}
	
	public function listUsers(){
		$data = $this->primatelApi("listUsers");
		return $data;
	}	
	
	public function updateListUsers(){		
		$data = $this->listUsers();		
		
		foreach($data->data->data as $data_arr){
			$this->db->exec("REPLACE INTO ".$this->list_users_table." (".implode(",", $data->data->names).") VALUES ('".implode("','", $data_arr)."')");	
		}
	}
	
	public function getListUsers($returnArray = true){
		$result = $this->db->query("SELECT * FROM ".$this->list_users_table);
		if($returnArray){
			$result_array = array();
			while($res = $result->fetchArray()){
				array_push($result_array, $res);
			}			
			return $result_array;
		}else{
			return $result;
		}
	}
	
	public function updateSips(){
		$result = $this->getListUsers(false);
		$from = date($this->datetime_format, strtotime('-7 days'));
		$to = date($this->datetime_format);
		
		while($res = $result->fetchArray()){
			$params = array(
				"user_login" => $res["login"],
				"from" => $from,
				"to" => $to
			);
			$data = $this->primatelApi("getCallsTotals", $params);
			$key = array_search("login", $data->data->names);		
			foreach($data->data->data as $data_arr){
				$this->db->exec("REPLACE INTO ".$this->list_sips_table." (sip_login, login_id) VALUES ('".$data_arr[$key]."', '".$res["id"]."')");
			}
		}
	}
	
	public function getCallsTotals($from = null, $to = null){
		$from = $from ? $from :  date($this->datetime_format, strtotime('-7 days'));
		$to = $to ? $to : date($this->datetime_format);
		$result = $this->db->exec("
			SELECT lu.login, COUNT(*) as count, DATE(cd.time) as date FROM list_users lu
			JOIN list_sips ls ON ls.login_id = lu.id
			JOIN calls_details cd ON cd.sip_login_id = ls.id
			GROUP BY lu.login, DATE(cd.time)
			AND date BETWEEN '".date($this->datetime_format,strtotime($from))."' AND '".date($this->datetime_format,strtotime($to))."'");
		$result_array = array();
		var_dump("SELECT lu.login, COUNT(*) as count, DATE(cd.time) as date FROM list_users lu
			JOIN list_sips ls ON ls.login_id = lu.id
			JOIN calls_details cd ON cd.sip_login_id = ls.id
			GROUP BY lu.login, DATE(cd.time)
			--AND date BETWEEN '".date($this->datetime_format,strtotime($from))."' AND '".date($this->datetime_format,strtotime($to))."'");
		while($res = $result->fetchArray()){
			//array_push($result_array, $res);
			var_dump($res);
		}
	}
	
	public function updateCallsDetails(){
		$result = $this->db->query("SELECT * FROM ".$this->list_sips_table);
		$from = date($this->datetime_format, strtotime('-7 days'));
		$to = date($this->datetime_format);
		while($sip = $result->fetchArray()){
			$total = 0;
			$page_number = 1;
			$page_size = 100;
			do{
				echo "<pre>";
				var_dump($sip["sip_login"]);
				echo "</pre>";
				
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
				foreach($data->data->data as $data_arr){
					$time_key = array_search("time", $data->data->names);
					//$time = array_shift(array_slice($data_arr, $time_key, 1));
					$this->db->exec("REPLACE INTO ".$this->calls_details_table." (sip_login_id,".implode(",", $data->data->names).") VALUES (".$sip["id"].",'".implode("','", $data_arr)."')");	
				}
			} while($total >= $page_size);
		}
	}
	
	public function update(){
		echo "update";
		echo date($this->datetime_format,strtotime("2016-09-18"));
		$this->getCallsTotals();
		//$this->updateListUsers();
		//$this->updateSips();
		//$this->updateCallsDetails();
		//echo "<pre>";
		//echo json_encode($this->getListUsers());
	}
}
?>