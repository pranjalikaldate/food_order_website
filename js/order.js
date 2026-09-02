document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const foodId = params.get("id") || "0";

    // Require login before ordering
    fetch("api/session-check.php", { credentials: "include" })
        .then(res => res.json())
        .then(session => {
            if (!session.logged_in) {
                window.location.href = "login.html?redirect=" + encodeURIComponent(window.location.pathname + window.location.search);
            } else {
                document.getElementById("nav-account").innerHTML =
                    'Hi, ' + session.full_name + ' | <a href="#" id="logout-link">Logout</a>';
                document.getElementById("logout-link").addEventListener("click", function (e) {
                    e.preventDefault();
                    fetch("api/logout.php", { credentials: "include" }).then(() => window.location.href = "index.html");
                });
            }
        });

    document.getElementById("food_id").value = foodId;

    // Load selected food's details
    let currentFood = null;
    if (foodId !== "0") {
        fetch("api/food.php?id=" + encodeURIComponent(foodId))
            .then(res => res.json())
            .then(food => {
                if (food) {
                    currentFood = food;
                    document.getElementById("food-image").src = "images/" + food.image;
                    document.getElementById("food-name").textContent = food.name;
                    document.getElementById("food-price").textContent = "Rs." + Math.round(food.price);
                }
            });
    }

    // Instead of placing the order directly, collect details and move to the payment step
    document.getElementById("order-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const form = e.target;

        const orderData = {
            food_id: document.getElementById("food_id").value,
            food_name: currentFood ? currentFood.name : "",
            food_price: currentFood ? currentFood.price : 0,
            food_image: currentFood ? currentFood.image : "",
            qty: form.qty.value,
            full_name: form["full-name"].value,
            phone: form.contact.value,
            email: form.email.value,
            address: form.address.value
        };

        sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));
        window.location.href = "payment.html";
    });
});
