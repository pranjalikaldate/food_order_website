<?php
require_once "config.php";
header("Content-Type: application/json");

unset($_SESSION['admin_id']);
unset($_SESSION['admin_username']);

echo json_encode(["success" => true]);
?>
