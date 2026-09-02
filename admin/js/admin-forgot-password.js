document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("admin-forgot-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;

        fetch("../api/admin-request-reset.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
        })
            .then(res => res.json())
            .then(result => {
                const msg = document.getElementById("auth-message");
                msg.textContent = result.message;
                msg.style.color = result.success ? "green" : "red";
                msg.style.display = "block";

                const linkBox = document.getElementById("reset-link-box");
                if (result.reset_link) {
                    linkBox.innerHTML = 'Reset link: <a href="' + result.reset_link + '">' + result.reset_link + '</a>';
                    linkBox.style.display = "block";
                }
            });
    });
});
