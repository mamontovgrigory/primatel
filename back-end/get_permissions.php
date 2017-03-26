<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

include __DIR__."/groups.php";
$groups = new Groups();

$result = $groups->getPermissions();
echo json_encode($result);