<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

include __DIR__."/users.php";
$users = new Users();

//unset($_COOKIE['test']);
//unset($_COOKIE['token']);

 

$result = $users->checkSession();

echo json_encode($result);
?>