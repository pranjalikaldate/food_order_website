<?php
require_once "config.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$full_name = isset($data['full_name']) ? trim($data['full_name']) : '';
$email     = isset($data['email']) ? trim($data['email']) : '';
$phone     = isset($data['phone']) ? trim($data['phone']) : '';

if ($full_name && $email && $phone) {
    $stmt = $conn->prepare("INSERT INTO contacts (full_name, email, phone) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $full_name, $email, $phone);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Thanks! We received your message."]);
    } else {
        echo json_encode(["success" => false, "message" => "Something went wrong. Please try again."]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Please fill all the fields."]);
}
?>
