document.addEventListener("DOMContentLoaded", function () {
    function loadCategories() {
        fetch("../api/admin-categories-list.php", { credentials: "include" })
            .then(res => res.json())
            .then(categories => {
                const body = document.getElementById("categories-body");
                body.innerHTML = "";
                categories.forEach(cat => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td><img src="../images/${cat.image}" alt="${cat.name}"></td>
                        <td>${cat.name}</td>
                        <td class="row-actions">
                            <button class="btn-edit" data-id="${cat.id}" data-name="${cat.name}">Edit</button>
                            <button class="btn-delete" data-id="${cat.id}">Delete</button>
                        </td>
                    `;
                    body.appendChild(row);
                });
            });
    }

    loadCategories();

    document.getElementById("add-category-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        fetch("../api/add-category.php", { method: "POST", credentials: "include", body: formData })
            .then(res => res.json())
            .then(result => {
                const msg = document.getElementById("form-message");
                msg.textContent = result.message;
                msg.style.color = result.success ? "green" : "red";
                msg.style.display = "block";
                if (result.success) {
                    e.target.reset();
                    loadCategories();
                }
            });
    });

    document.getElementById("categories-body").addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-edit")) {
            document.getElementById("edit-id").value = e.target.getAttribute("data-id");
            document.getElementById("edit-name").value = e.target.getAttribute("data-name");
            document.getElementById("edit-modal").style.display = "flex";
        }

        if (e.target.classList.contains("btn-delete")) {
            if (!confirm("Delete this category?")) return;
            fetch("../api/delete-category.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id: e.target.getAttribute("data-id") })
            })
                .then(res => res.json())
                .then(result => {
                    alert(result.message);
                    if (result.success) loadCategories();
                });
        }
    });

    document.getElementById("cancel-edit").addEventListener("click", function () {
        document.getElementById("edit-modal").style.display = "none";
    });

    document.getElementById("edit-category-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        fetch("../api/update-category.php", { method: "POST", credentials: "include", body: formData })
            .then(res => res.json())
            .then(result => {
                alert(result.message);
                if (result.success) {
                    document.getElementById("edit-modal").style.display = "none";
                    loadCategories();
                }
            });
    });
});
