<?php
header('Access-Control-Allow-Origin: *');

include __DIR__."/users.php";
$users = new Users();

$result = $users->get_user_permissions();
echo json_encode($result);