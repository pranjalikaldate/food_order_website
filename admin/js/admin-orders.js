document.addEventListener("DOMContentLoaded", function () {
    const statuses = ["Pending", "Preparing", "Out for Delivery", "Delivered"];

    fetch("../api/admin-orders.php", { credentials: "include" })
        .then(res => res.json())
        .then(orders => {
            const body = document.getElementById("orders-body");
            orders.forEach(order => {
                const options = statuses.map(s =>
                    `<option value="${s}" ${s === order.status ? "selected" : ""}>${s}</option>`
                ).join("");

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.food_name}</td>
                    <td>${order.quantity}</td>
                    <td>${order.full_name}</td>
                    <td>${order.phone}</td>
                    <td>${order.email}</td>
                    <td>${order.address}</td>
                    <td>${order.payment_status}</td>
                    <td>${order.order_date}</td>
                    <td><select data-order-id="${order.id}">${options}</select></td>
                `;
                body.appendChild(row);
            });

            body.addEventListener("change", function (e) {
                if (e.target.tagName !== "SELECT") return;
                const orderId = e.target.getAttribute("data-order-id");
                const newStatus = e.target.value;

                fetch("../api/update-order-status.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ order_id: orderId, status: newStatus })
                });
            });
        });
});
