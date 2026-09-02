<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Not authorized"]);
    exit;
}

$result = $conn->query("SELECT id, username FROM admins ORDER BY id ASC");
$admins = [];
while ($row = $result->fetch_assoc()) {
    $admins[] = $row;
}

echo json_encode($admins);
?>
