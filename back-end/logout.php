<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

include __DIR__."/users.php";
$users = new Users();

$result = $users->logout();

echo json_encode(null);
?>