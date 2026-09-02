document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("admin-login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const form = e.target;

        fetch("../api/admin-login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username: form.username.value, password: form.password.value })
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    window.location.href = "dashboard.html";
                } else {
                    const msg = document.getElementById("auth-message");
                    msg.textContent = result.message;
                    msg.style.color = "red";
                    msg.style.display = "block";
                }
            });
    });
});
