<?php
require_once "config.php";
header("Content-Type: application/json");

$search = isset($_GET['q']) ? trim($_GET['q']) : '';
$category_id = isset($_GET['category']) ? (int)$_GET['category'] : 0;

$sql = "SELECT id, name, price, description, image FROM foods WHERE 1=1";
if ($search !== '') {
    $search_esc = $conn->real_escape_string($search);
    $sql .= " AND name LIKE '%$search_esc%'";
}
if ($category_id > 0) {
    $sql .= " AND category_id = $category_id";
}

$result = $conn->query($sql);
$foods = [];
while ($row = $result->fetch_assoc()) {
    $foods[] = $row;
}

echo json_encode($foods);
?>
