document.addEventListener("DOMContentLoaded", function () {
    const raw = sessionStorage.getItem("pendingOrder");
    if (!raw) {
        window.location.href = "index.html";
        return;
    }
    const order = JSON.parse(raw);

    const total = (order.food_price * order.qty).toFixed(0);
    document.getElementById("order-summary").innerHTML = `
        <p><strong>${order.food_name}</strong></p>
        <p>Quantity: ${order.qty}</p>
        <p>Total: Rs.${total}</p>
        <p>Deliver to: ${order.full_name}, ${order.address}</p>
    `;

    // Basic formatting for card number as the user types
    document.getElementById("card-number").addEventListener("input", function (e) {
        let v = e.target.value.replace(/\D/g, "").slice(0, 16);
        e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
    });

    document.getElementById("payment-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const msg = document.getElementById("pay-message");
        msg.style.color = "#2f3542";
        msg.textContent = "Processing payment...";
        msg.style.display = "block";

        // Simulate a payment processing delay, then place the actual order
        setTimeout(function () {
            fetch("api/order.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    food_id: order.food_id,
                    qty: order.qty,
                    full_name: order.full_name,
                    phone: order.phone,
                    email: order.email,
                    address: order.address
                })
            })
                .then(res => res.json())
                .then(result => {
                    if (result.success) {
                        sessionStorage.removeItem("pendingOrder");
                        sessionStorage.setItem("lastOrderId", result.order_id);
                        window.location.href = "order-confirmation.html";
                    } else {
                        msg.style.color = "red";
                        msg.textContent = result.message;
                    }
                });
        }, 1200);
    });
});
