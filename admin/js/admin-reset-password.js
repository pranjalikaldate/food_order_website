document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    document.getElementById("admin-reset-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const password = document.getElementById("password").value;

        fetch("../api/admin-reset-password.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password })
        })
            .then(res => res.json())
            .then(result => {
                const msg = document.getElementById("auth-message");
                msg.textContent = result.message;
                msg.style.color = result.success ? "green" : "red";
                msg.style.display = "block";

                if (result.success) {
                    setTimeout(() => window.location.href = "login.html", 1500);
                }
            });
    });
});
