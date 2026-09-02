<?php
// =========================================================
// Database connection settings
// =========================================================
session_start();
header("Access-Control-Allow-Origin: *"); // allow fetch() calls from the html pages
header("Access-Control-Allow-Credentials: true");
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "fdo";   // change this to match your database name if different

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>
