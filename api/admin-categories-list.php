<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Not authorized"]);
    exit;
}

$result = $conn->query("SELECT id, name, image FROM categories ORDER BY id DESC");
$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

echo json_encode($categories);
?>
