document.addEventListener("DOMContentLoaded", function () {
    function loadAdmins() {
        fetch("../api/list-admins.php", { credentials: "include" })
            .then(res => res.json())
            .then(admins => {
                const body = document.getElementById("admins-body");
                body.innerHTML = "";
                admins.forEach(admin => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${admin.id}</td>
                        <td>${admin.username}</td>
                        <td class="row-actions">
                            <button class="btn-change" data-id="${admin.id}">Change Password</button>
                            <button class="btn-delete" data-id="${admin.id}">Delete</button>
                        </td>
                    `;
                    body.appendChild(row);
                });
            });
    }

    loadAdmins();

    // Add new admin
    document.getElementById("add-admin-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("new-username").value;
        const password = document.getElementById("new-password").value;

        fetch("../api/create-admin-account.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(result => {
                const msg = document.getElementById("form-message");
                msg.textContent = result.message;
                msg.style.color = result.success ? "green" : "red";
                msg.style.display = "block";
                if (result.success) {
                    document.getElementById("add-admin-form").reset();
                    loadAdmins();
                }
            });
    });

    // Change password / delete (event delegation)
    document.getElementById("admins-body").addEventListener("click", function (e) {
        const id = e.target.getAttribute("data-id");
        if (!id) return;

        if (e.target.classList.contains("btn-change")) {
            const newPassword = prompt("Enter new password (min 6 characters):");
            if (!newPassword) return;

            fetch("../api/update-admin-password.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id, password: newPassword })
            })
                .then(res => res.json())
                .then(result => alert(result.message));
        }

        if (e.target.classList.contains("btn-delete")) {
            if (!confirm("Delete this admin account? This can't be undone.")) return;

            fetch("../api/delete-admin.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id })
            })
                .then(res => res.json())
                .then(result => {
                    alert(result.message);
                    if (result.success) loadAdmins();
                });
        }
    });
});
