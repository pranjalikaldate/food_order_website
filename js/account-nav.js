document.addEventListener("DOMContentLoaded", function () {
    const navSlot = document.getElementById("nav-account");
    if (!navSlot) return;

    fetch("api/session-check.php", { credentials: "include" })
        .then(res => res.json())
        .then(session => {
            if (session.logged_in) {
                navSlot.innerHTML = '<a href="my-orders.html">My Orders</a> | Hi, ' + session.full_name + ' | <a href="#" id="logout-link">Logout</a>';
                document.getElementById("logout-link").addEventListener("click", function (e) {
                    e.preventDefault();
                    fetch("api/logout.php", { credentials: "include" }).then(() => window.location.reload());
                });
            } else {
                navSlot.innerHTML = '<a href="login.html">Login</a> / <a href="register.html">Register</a>';
            }
        });
});
