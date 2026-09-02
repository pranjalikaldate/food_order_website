<?php
require_once "config.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$full_name = isset($data['full_name']) ? trim($data['full_name']) : '';
$email     = isset($data['email']) ? trim($data['email']) : '';
$password  = isset($data['password']) ? $data['password'] : '';

if (!$full_name || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "Please fill all the fields."]);
    exit;
}

// Check if email already registered
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
if ($stmt->get_result()->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "An account with this email already exists."]);
    exit;
}
$stmt->close();

$hashed = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $full_name, $email, $hashed);

if ($stmt->execute()) {
    $_SESSION['user_id'] = $stmt->insert_id;
    $_SESSION['user_name'] = $full_name;
    echo json_encode(["success" => true, "message" => "Account created successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Something went wrong. Please try again."]);
}
$stmt->close();
?>
