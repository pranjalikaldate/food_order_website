document.addEventListener("DOMContentLoaded", function () {
    let categories = [];

    function loadCategories() {
        return fetch("../api/categories.php")
            .then(res => res.json())
            .then(cats => { categories = cats; });
    }

    function loadFoods() {
        fetch("../api/admin-foods-list.php", { credentials: "include" })
            .then(res => res.json())
            .then(foods => {
                const body = document.getElementById("foods-body");
                body.innerHTML = "";
                foods.forEach(food => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td><img src="../images/${food.image}" alt="${food.name}"></td>
                        <td>${food.name}</td>
                        <td>Rs.${Math.round(food.price)}</td>
                        <td>${food.category_name || "-"}</td>
                        <td>${food.description}</td>
                        <td class="row-actions">
                            <button class="btn-edit" data-food='${JSON.stringify(food).replace(/'/g, "&apos;")}'>Edit</button>
                            <button class="btn-delete" data-id="${food.id}">Delete</button>
                        </td>
                    `;
                    body.appendChild(row);
                });
            });
    }

    loadCategories().then(loadFoods);

    document.getElementById("foods-body").addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-edit")) {
            const food = JSON.parse(e.target.getAttribute("data-food").replace(/&apos;/g, "'"));
            document.getElementById("edit-id").value = food.id;
            document.getElementById("edit-name").value = food.name;
            document.getElementById("edit-price").value = Math.round(food.price);
            document.getElementById("edit-description").value = food.description;

            const select = document.getElementById("edit-category");
            select.innerHTML = categories.map(c =>
                `<option value="${c.id}" ${c.id == food.category_id ? "selected" : ""}>${c.name}</option>`
            ).join("");

            document.getElementById("edit-modal").style.display = "flex";
        }

        if (e.target.classList.contains("btn-delete")) {
            if (!confirm("Delete this food item?")) return;
            fetch("../api/delete-food.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id: e.target.getAttribute("data-id") })
            })
                .then(res => res.json())
                .then(result => {
                    alert(result.message);
                    if (result.success) loadFoods();
                });
        }
    });

    document.getElementById("cancel-edit").addEventListener("click", function () {
        document.getElementById("edit-modal").style.display = "none";
    });

    document.getElementById("edit-food-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        fetch("../api/update-food.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                alert(result.message);
                if (result.success) {
                    document.getElementById("edit-modal").style.display = "none";
                    loadFoods();
                }
            });
    });
});
