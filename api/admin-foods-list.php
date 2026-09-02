<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Not authorized"]);
    exit;
}

$sql = "SELECT f.id, f.name, f.price, f.description, f.image, f.category_id, c.name AS category_name
        FROM foods f
        LEFT JOIN categories c ON f.category_id = c.id
        ORDER BY f.id DESC";
$result = $conn->query($sql);

$foods = [];
while ($row = $result->fetch_assoc()) {
    $foods[] = $row;
}

echo json_encode($foods);
?>
