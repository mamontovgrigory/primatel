<?php
class Database extends mysqli {
	private $host = "localhost";
	private $username = "root";
	private $password = "";
	
    public function __construct($db) {
        parent::__construct($this->host, $this->username, $this->password, $db);

        if (mysqli_connect_error()) {
            die('Ошибка подключения (' . mysqli_connect_errno() . ') '
                    . mysqli_connect_error());
        }
    }
}
/*class Database extends SQLite3
{
	function __construct($db_name)
	{
		$this->open($db_name);
	}
}*/
?>