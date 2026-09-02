<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Not authorized"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id = isset($data['id']) ? (int)$data['id'] : 0;

$count = $conn->query("SELECT COUNT(*) AS c FROM admins")->fetch_assoc()['c'];
if ($count <= 1) {
    echo json_encode(["success" => false, "message" => "You can't delete the last remaining admin account."]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM admins WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    // If the admin deleted their own account, log them out
    if ($id === (int)$_SESSION['admin_id']) {
        session_unset();
        session_destroy();
    }
    echo json_encode(["success" => true, "message" => "Admin account deleted."]);
} else {
    echo json_encode(["success" => false, "message" => "Something went wrong."]);
}
$stmt->close();
?>
