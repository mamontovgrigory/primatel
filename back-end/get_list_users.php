<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

include __DIR__."/telephony.php";
$telephony = new Telephony();

//$result = $telephony->getListPermittedUsers();
$result = $telephony->getListUsers();

echo json_encode($result);