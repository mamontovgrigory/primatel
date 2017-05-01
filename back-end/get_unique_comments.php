<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

if($_REQUEST){
    include __DIR__."/telephony.php";
    $telephony = new Telephony();
    
    $result = array();
    
    $result["marks"] = $telephony->getUniqueComments("mark", $_REQUEST["login_id"]);
    $result["models"] = $telephony->getUniqueComments("model", $_REQUEST["login_id"]);
    echo json_encode($result);    
}
