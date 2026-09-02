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

if ($id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid food item."]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM foods WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Food item deleted."]);
} else {
    // Likely blocked by existing orders referencing this food item
    echo json_encode(["success" => false, "message" => "Can't delete — this item has existing orders linked to it."]);
}
$stmt->close();
?>
