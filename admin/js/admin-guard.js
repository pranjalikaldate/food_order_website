document.addEventListener("DOMContentLoaded", function () {
    fetch("../api/admin-session-check.php", { credentials: "include" })
        .then(res => res.json())
        .then(session => {
            if (!session.logged_in) {
                window.location.href = "login.html";
                return;
            }
            const nameSlot = document.getElementById("admin-name");
            if (nameSlot) nameSlot.textContent = session.username;

            const logoutLink = document.getElementById("logout-link");
            if (logoutLink) {
                logoutLink.addEventListener("click", function (e) {
                    e.preventDefault();
                    fetch("../api/admin-logout.php", { credentials: "include" })
                        .then(() => window.location.href = "login.html");
                });
            }
        });
});
