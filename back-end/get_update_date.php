<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

include __DIR__."/telephony.php";
$telephony = new Telephony();

$datetime = $telephony->getUpdateDate();
$result = array(
	"datetime" => $datetime
);
echo json_encode($result);