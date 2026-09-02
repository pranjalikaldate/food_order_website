document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const form = e.target;
        const payload = {
            full_name: form.full_name.value,
            email: form.email.value,
            phone: form.phone.value
        };

        fetch("api/contact.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(result => {
                const msg = document.getElementById("contact-message");
                msg.textContent = result.message;
                msg.style.color = result.success ? "#2575fc" : "red";
                msg.style.display = "block";

                if (result.success) {
                    form.style.display = "none";
                }
            });
    });
});
