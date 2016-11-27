<?php
header('Access-Control-Allow-Origin: *');

include __DIR__."/groups.php";
$groups = new Groups();
$result = $groups->getList();
echo json_encode($result);