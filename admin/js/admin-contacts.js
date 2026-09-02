document.addEventListener("DOMContentLoaded", function () {
    fetch("../api/admin-contacts.php", { credentials: "include" })
        .then(res => res.json())
        .then(contacts => {
            const body = document.getElementById("contacts-body");
            contacts.forEach(c => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${c.id}</td>
                    <td>${c.full_name}</td>
                    <td>${c.email}</td>
                    <td>${c.phone}</td>
                    <td>${c.submitted_at}</td>
                `;
                body.appendChild(row);
            });
        });
});
