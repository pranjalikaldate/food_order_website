<?php
require_once "config.php";
header("Content-Type: application/json");

$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 0;
$sql = "SELECT id, name, image FROM categories";
if ($limit > 0) {
    $sql .= " LIMIT $limit";
}

$result = $conn->query($sql);
$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

echo json_encode($categories);
?>
