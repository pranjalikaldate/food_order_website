<?php
require_once "config.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$username = isset($data['username']) ? trim($data['username']) : '';

if (!$username) {
    echo json_encode(["success" => false, "message" => "Please enter your username."]);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM admins WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$admin = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$admin) {
    echo json_encode(["success" => false, "message" => "No admin found with that username."]);
    exit;
}

$token = bin2hex(random_bytes(20));
$expires = date("Y-m-d H:i:s", strtotime("+1 hour"));

$stmt = $conn->prepare("UPDATE admins SET reset_token = ?, reset_expires = ? WHERE id = ?");
$stmt->bind_param("ssi", $token, $expires, $admin['id']);
$stmt->execute();
$stmt->close();

echo json_encode([
    "success" => true,
    "message" => "Reset link generated (no email sending set up on this demo site):",
    "reset_link" => "reset-password.html?token=" . $token
]);
?>
