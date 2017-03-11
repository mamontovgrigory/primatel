<?php
header('Access-Control-Allow-Origin: *');

include __DIR__."/users.php";
$users = new Users();

$result = $users->getList();
echo json_encode($result);