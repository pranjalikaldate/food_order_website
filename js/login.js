document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const form = e.target;

        fetch("api/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email: form.email.value, password: form.password.value })
        })
            .then(res => res.json())
            .then(result => {
                const msg = document.getElementById("auth-message");
                msg.textContent = result.message;
                msg.style.color = result.success ? "green" : "red";
                msg.style.display = "block";

                if (result.success) {
                    const params = new URLSearchParams(window.location.search);
                    const redirect = params.get("redirect") || "index.html";
                    window.location.href = redirect;
                }
            });
    });
});
