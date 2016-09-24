<?php
	include "config.php";
	
	/*$db = sqlite_open(DB_NAME);
	
	if(!$db){
		exit("ERROR connection ".sqlite_error_string(sqlite_last_error($db)));
	}
	
	echo "Database ".DB_NAME."success connection";
	
	sqlite_close($db);*/
	class PrimatelDB extends SQLite3
	{
			function __construct()
			{
					$this->open(DB_NAME);
			}
	}
	$db = new PrimatelDB();
	
	var_dump($db);
	$db->exec('CREATE TABLE list_users (id INTEGER PRIMARY KEY, login VARCHAR UNIQUE, balance VARCHAR, symbol VARCHAR)');
	$db->exec("INSERT INTO list_users (login, balance, symbol) VALUES ('tv_trade', '7018.00', 'руб')");
	$result = $db->query('SELECT * FROM list_users');
	while($res = $result->fetchArray()){
		var_dump($res);
	}
	
?>