document.addEventListener("DOMContentLoaded", function () {
    fetch("api/categories.php")
        .then(res => res.json())
        .then(categories => {
            const wrap = document.getElementById("category-list");
            categories.forEach(cat => {
                const a = document.createElement("a");
                a.href = "food-search.html?category=" + cat.id;

                a.innerHTML = `
                    <div class="box-3 float-container">
                        <img src="images/${cat.image}" alt="${cat.name}" class="image-responsive img-curve">
                        <h3 class="float-text text-white">${cat.name}</h3>
                    </div>
                `;
                wrap.appendChild(a);
            });
        });
});
