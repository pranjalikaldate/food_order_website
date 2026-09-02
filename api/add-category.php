<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Not authorized"]);
    exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';

if (!$name || !isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(["success" => false, "message" => "Please enter a name and choose an image."]);
    exit;
}

$file = $_FILES['image'];
$allowed_ext = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if (!in_array($ext, $allowed_ext)) {
    echo json_encode(["success" => false, "message" => "Please upload a valid image file."]);
    exit;
}

$new_filename = uniqid("cat_") . "." . $ext;
$destination = __DIR__ . "/../images/" . $new_filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    echo json_encode(["success" => false, "message" => "Failed to save uploaded image."]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO categories (name, image) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $new_filename);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Category added."]);
} else {
    echo json_encode(["success" => false, "message" => "Something went wrong."]);
}
$stmt->close();
?>
