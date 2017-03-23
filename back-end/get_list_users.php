<?php
header('Access-Control-Allow-Origin: *');

include __DIR__."/telephony.php";
$telephony = new Telephony();

$result = $telephony->getListUsers();
echo json_encode($result);