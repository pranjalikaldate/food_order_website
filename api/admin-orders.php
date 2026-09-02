<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Not authorized"]);
    exit;
}

$sql = "SELECT o.id, f.name AS food_name, o.quantity, o.full_name, o.phone, o.email, o.address,
               o.status, o.payment_status, o.order_date
        FROM orders o
        LEFT JOIN foods f ON o.food_id = f.id
        ORDER BY o.order_date DESC";
$result = $conn->query($sql);

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);
?>
