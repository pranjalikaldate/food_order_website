<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Not authorized"]);
    exit;
}

$result = $conn->query("SELECT id, full_name, email, phone, submitted_at FROM contacts ORDER BY submitted_at DESC");
$contacts = [];
while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}

echo json_encode($contacts);
?>
