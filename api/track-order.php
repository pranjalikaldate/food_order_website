<?php
require_once "config.php";
header("Content-Type: application/json");

$order_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($order_id <= 0) {
    echo json_encode(null);
    exit;
}

$sql = "SELECT o.id, f.name AS food_name, o.quantity, o.status, o.payment_status, o.order_date
        FROM orders o
        LEFT JOIN foods f ON o.food_id = f.id
        WHERE o.id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$order = $stmt->get_result()->fetch_assoc();
$stmt->close();

echo json_encode($order);
?>
