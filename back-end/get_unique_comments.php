<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

include __DIR__."/telephony.php";
$telephony = new Telephony();

$result = array();

$result["marks"] = $telephony->getUniqueComments("mark");
$result["models"] = $telephony->getUniqueComments("model");
echo json_encode($result);