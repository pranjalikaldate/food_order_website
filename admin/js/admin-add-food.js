document.addEventListener("DOMContentLoaded", function () {
    // Load categories into the dropdown
    fetch("../api/categories.php")
        .then(res => res.json())
        .then(categories => {
            const select = document.getElementById("category-select");
            categories.forEach(cat => {
                const opt = document.createElement("option");
                opt.value = cat.id;
                opt.textContent = cat.name;
                select.appendChild(opt);
            });
        });

    document.getElementById("add-food-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        fetch("../api/add-food.php", {
            method: "POST",
            credentials: "include",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                const msg = document.getElementById("form-message");
                msg.textContent = result.message;
                msg.style.color = result.success ? "green" : "red";
                msg.style.display = "block";

                if (result.success) {
                    form.reset();
                }
            });
    });
});
