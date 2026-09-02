<?php
require_once "config.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Not authorized"]);
    exit;
}

$id          = isset($_POST['id']) ? (int)$_POST['id'] : 0;
$name        = isset($_POST['name']) ? trim($_POST['name']) : '';
$price       = isset($_POST['price']) ? (float)$_POST['price'] : 0;
$description = isset($_POST['description']) ? trim($_POST['description']) : '';
$category_id = isset($_POST['category_id']) ? (int)$_POST['category_id'] : 0;

if (!$id || !$name || $price <= 0 || !$category_id) {
    echo json_encode(["success" => false, "message" => "Please fill all fields."]);
    exit;
}

$image_sql = "";
$new_filename = null;

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['image'];
    $allowed_ext = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($ext, $allowed_ext)) {
        echo json_encode(["success" => false, "message" => "Please upload a valid image file."]);
        exit;
    }

    $new_filename = uniqid("food_") . "." . $ext;
    $destination = __DIR__ . "/../images/" . $new_filename;
    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        echo json_encode(["success" => false, "message" => "Failed to save uploaded image."]);
        exit;
    }
}

if ($new_filename) {
    $stmt = $conn->prepare("UPDATE foods SET name=?, price=?, description=?, category_id=?, image=? WHERE id=?");
    $stmt->bind_param("sdsisi", $name, $price, $description, $category_id, $new_filename, $id);
} else {
    $stmt = $conn->prepare("UPDATE foods SET name=?, price=?, description=?, category_id=? WHERE id=?");
    $stmt->bind_param("sdsii", $name, $price, $description, $category_id, $id);
}

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Food item updated."]);
} else {
    echo json_encode(["success" => false, "message" => "Something went wrong."]);
}
$stmt->close();
?>
