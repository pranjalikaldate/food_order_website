document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const form = e.target;

        fetch("api/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                full_name: form.full_name.value,
                email: form.email.value,
                password: form.password.value
            })
        })
            .then(res => res.json())
            .then(result => {
                const msg = document.getElementById("auth-message");
                msg.textContent = result.message;
                msg.style.color = result.success ? "green" : "red";
                msg.style.display = "block";

                if (result.success) {
                    window.location.href = "index.html";
                }
            });
    });
});
