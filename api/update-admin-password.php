<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Not authorized"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id       = isset($data['id']) ? (int)$data['id'] : 0;
$password = isset($data['password']) ? $data['password'] : '';

if ($id <= 0 || strlen($password) < 6) {
    echo json_encode(["success" => false, "message" => "New password must be at least 6 characters."]);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE admins SET password = ? WHERE id = ?");
$stmt->bind_param("si", $hashed, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Password updated."]);
} else {
    echo json_encode(["success" => false, "message" => "Something went wrong."]);
}
$stmt->close();
?>
