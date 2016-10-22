<?php
header('Access-Control-Allow-Origin: *');

include __DIR__."/telephony.php";
$telephony = new Telephony();

$datetime = $telephony->getUpdateDate();
$result = array(
	"datetime" => $datetime
);
echo json_encode($result);