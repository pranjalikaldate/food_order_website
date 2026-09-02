<?php
require_once "config.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$email = isset($data['email']) ? trim($data['email']) : '';

if (!$email) {
    echo json_encode(["success" => false, "message" => "Please enter your email."]);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$user) {
    // Don't reveal whether the email exists
    echo json_encode(["success" => true, "message" => "If that email is registered, a reset link has been generated."]);
    exit;
}

$token = bin2hex(random_bytes(20));
$expires = date("Y-m-d H:i:s", strtotime("+1 hour"));

$stmt = $conn->prepare("UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?");
$stmt->bind_param("ssi", $token, $expires, $user['id']);
$stmt->execute();
$stmt->close();

echo json_encode([
    "success" => true,
    "message" => "Reset link generated (this demo site has no email sending set up, so here it is directly):",
    "reset_link" => "reset-password.html?token=" . $token
]);
?>
