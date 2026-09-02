document.addEventListener("DOMContentLoaded", function () {
    fetch("api/session-check.php", { credentials: "include" })
        .then(res => res.json())
        .then(session => {
            if (!session.logged_in) {
                window.location.href = "login.html?redirect=my-orders.html";
                return;
            }

            fetch("api/my-orders.php", { credentials: "include" })
                .then(res => res.json())
                .then(orders => {
                    if (orders.length === 0) {
                        document.getElementById("empty-msg").style.display = "block";
                        return;
                    }

                    document.getElementById("orders-table").style.display = "table";
                    const body = document.getElementById("orders-body");
                    orders.forEach(o => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${o.id}</td>
                            <td>${o.food_name}</td>
                            <td>${o.quantity}</td>
                            <td>${o.status}</td>
                            <td>${o.payment_status}</td>
                            <td>${o.order_date}</td>
                        `;
                        body.appendChild(row);
                    });
                });
        });
});
