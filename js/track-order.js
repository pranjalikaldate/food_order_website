document.addEventListener("DOMContentLoaded", function () {
    const statusOrder = ["Pending", "Preparing", "Out for Delivery", "Delivered"];

    document.getElementById("track-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const id = document.getElementById("order-id-input").value;

        fetch("api/track-order.php?id=" + encodeURIComponent(id))
            .then(res => res.json())
            .then(order => {
                const msg = document.getElementById("track-message");
                const result = document.getElementById("track-result");

                if (!order) {
                    msg.textContent = "No order found with that ID.";
                    msg.style.display = "block";
                    result.style.display = "none";
                    return;
                }

                msg.style.display = "none";
                result.style.display = "block";

                document.getElementById("result-food").textContent = order.food_name + " x " + order.quantity;
                document.getElementById("result-qty").textContent = "Order Date: " + order.order_date;
                document.getElementById("result-date").textContent = "Payment: " + order.payment_status;

                const currentIndex = statusOrder.indexOf(order.status);
                document.querySelectorAll("#status-steps li").forEach(function (li, i) {
                    li.classList.toggle("active", i <= currentIndex);
                });
            });
    });
});
