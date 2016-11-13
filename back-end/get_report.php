<?php
header('Access-Control-Allow-Origin: *');

include __DIR__."/telephony.php";
include __DIR__."/reports.php";

$telephony = new Telephony();
$reports = new Reports();

$login_ids = array_key_exists("loginIds", $_REQUEST) ? $_REQUEST["loginIds"] : array();
$duration = array_key_exists("duration", $_REQUEST) && $_REQUEST["duration"] ? $_REQUEST["duration"] : null;
$from = array_key_exists("from", $_REQUEST) && $_REQUEST["from"] ? 
	date($telephony->date_format, strtotime($_REQUEST["from"]))." 00:00:00" : 
	date($telephony->datetime_format, strtotime('-7 days'));
$to = array_key_exists("to", $_REQUEST) && $_REQUEST["to"] ? 
	date($telephony->date_format, strtotime($_REQUEST["to"]))." 23:59:59" : 
	date($telephony->datetime_format);

$result = $telephony->getCallsDetails($login_ids, $from, $to, $duration, false);

$titles = array("Клиент", "Дата и время", "Исходящий", "Входящий", "Длительность");

$data = array();

$logins = array();
while($res = $result->fetch_assoc()){	
	if(!in_array($res["login"], $logins)) array_push($logins, $res["login"]);
	array_push($data, array(
		$res["login"],
		date($telephony->datetime_format,strtotime($res["time"])),
		$telephony->formatPhoneNumber($res["numfrom"]),
		$telephony->formatPhoneNumber($res["numto"]),
		$tepephony->formatSeconds($res["duration"])
	));
}

$filename = implode("_", $logins)."_".str_replace(" ", "_", $from)."_".str_replace(" ", "_", $to).".csv";

$reports->download_send_headers($filename);
echo $reports->array_to_report($data, $titles);
die();