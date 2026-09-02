<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Not authorized"]);
    exit;
}

$name        = isset($_POST['name']) ? trim($_POST['name']) : '';
$price       = isset($_POST['price']) ? (float)$_POST['price'] : 0;
$description = isset($_POST['description']) ? trim($_POST['description']) : '';
$category_id = isset($_POST['category_id']) ? (int)$_POST['category_id'] : 0;

if (!$name || $price <= 0 || !$category_id || !isset($_FILES['image'])) {
    echo json_encode(["success" => false, "message" => "Please fill all fields and choose an image."]);
    exit;
}

$file = $_FILES['image'];
$allowed_ext = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if ($file['error'] !== UPLOAD_ERR_OK || !in_array($ext, $allowed_ext)) {
    echo json_encode(["success" => false, "message" => "Please upload a valid image file (jpg, png, gif, webp)."]);
    exit;
}

// Save the image into /images (same folder every other page reads from)
$new_filename = uniqid("food_") . "." . $ext;
$destination = __DIR__ . "/../images/" . $new_filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    echo json_encode(["success" => false, "message" => "Failed to save uploaded image."]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO foods (category_id, name, price, description, image) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("isdss", $category_id, $name, $price, $description, $new_filename);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Food item added successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Something went wrong saving the food item."]);
}
$stmt->close();
?>
