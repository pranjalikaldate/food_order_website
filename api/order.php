<?php
require_once "config.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$food_id   = isset($data['food_id']) ? (int)$data['food_id'] : 0;
$qty       = isset($data['qty']) ? (int)$data['qty'] : 0;
$full_name = isset($data['full_name']) ? trim($data['full_name']) : '';
$phone     = isset($data['phone']) ? trim($data['phone']) : '';
$email     = isset($data['email']) ? trim($data['email']) : '';
$address   = isset($data['address']) ? trim($data['address']) : '';
$user_id   = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

if ($food_id > 0 && $qty > 0 && $full_name && $phone && $email && $address) {
    $stmt = $conn->prepare("INSERT INTO orders (food_id, user_id, quantity, full_name, phone, email, address, status, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', 'Paid')");
    $stmt->bind_param("iiissss", $food_id, $user_id, $qty, $full_name, $phone, $email, $address);
    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Thank you! Your order has been placed successfully.",
            "order_id" => $stmt->insert_id
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Something went wrong. Please try again."]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Please fill all the fields correctly."]);
}
?>
