<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Not authorized"]);
    exit;
}

$id   = isset($_POST['id']) ? (int)$_POST['id'] : 0;
$name = isset($_POST['name']) ? trim($_POST['name']) : '';

if (!$id || !$name) {
    echo json_encode(["success" => false, "message" => "Please enter a category name."]);
    exit;
}

$new_filename = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
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
}

if ($new_filename) {
    $stmt = $conn->prepare("UPDATE categories SET name=?, image=? WHERE id=?");
    $stmt->bind_param("ssi", $name, $new_filename, $id);
} else {
    $stmt = $conn->prepare("UPDATE categories SET name=? WHERE id=?");
    $stmt->bind_param("si", $name, $id);
}

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Category updated."]);
} else {
    echo json_encode(["success" => false, "message" => "Something went wrong."]);
}
$stmt->close();
?>
