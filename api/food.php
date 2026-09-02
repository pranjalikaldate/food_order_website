<?php
require_once "config.php";
header("Content-Type: application/json");

$food_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($food_id <= 0) {
    echo json_encode(null);
    exit;
}

$stmt = $conn->prepare("SELECT id, name, price, image FROM foods WHERE id = ?");
$stmt->bind_param("i", $food_id);
$stmt->execute();
$food = $stmt->get_result()->fetch_assoc();
$stmt->close();

echo json_encode($food);
?>
