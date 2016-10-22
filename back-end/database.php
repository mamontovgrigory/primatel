<?php
class Database extends mysqli {
	private $db = "telephony";
	private $host = "localhost";
	private $username = "root";
	private $password = "";
	
    public function __construct() {
        parent::__construct($this->host, $this->username, $this->password, $this->db);

        if (mysqli_connect_error()) {
            die('Ошибка подключения (' . mysqli_connect_errno() . ') '
                    . mysqli_connect_error());
        }
    }
}
?>