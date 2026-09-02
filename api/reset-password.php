<?php
require_once "config.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$token    = isset($data['token']) ? trim($data['token']) : '';
$password = isset($data['password']) ? $data['password'] : '';

if (!$token || strlen($password) < 6) {
    echo json_encode(["success" => false, "message" => "Password must be at least 6 characters."]);
    exit;
}

$stmt = $conn->prepare("SELECT id, reset_expires FROM users WHERE reset_token = ?");
$stmt->bind_param("s", $token);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$user || strtotime($user['reset_expires']) < time()) {
    echo json_encode(["success" => false, "message" => "This reset link is invalid or has expired."]);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?");
$stmt->bind_param("si", $hashed, $user['id']);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Password reset successfully. You can now log in."]);
} else {
    echo json_encode(["success" => false, "message" => "Something went wrong."]);
}
$stmt->close();
?>
