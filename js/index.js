document.addEventListener("DOMContentLoaded", function () {
    // ---- Categories (limit 3, same as original index.html) ----
    fetch("api/categories.php?limit=3")
        .then(res => res.json())
        .then(categories => {
            const wrap = document.getElementById("category-list");
            categories.forEach(cat => {
                const a = document.createElement("a");
                a.href = "food-search.html?category=" + cat.id;

                a.innerHTML = `
                    <div class="box-3 float-container">
                        <img src="images/${cat.image}" alt="${cat.name}" class="image-responsive img-curve">
                        <h3 class="float-text text-white"></h3>
                    </div>
                `;
                wrap.appendChild(a);
            });
        });

    // ---- Food menu ----
    fetch("api/foods.php")
        .then(res => res.json())
        .then(foods => {
            const wrap = document.getElementById("food-list");
            foods.forEach(food => {
                const box = document.createElement("div");
                box.className = "food-menu-box";
                box.innerHTML = `
                    <div class="food-menu-img">
                        <img src="images/${food.image}" alt="Food Image" class="image-responsive img-curve">
                    </div>

                    <div class="food-menu-desc">
                        <h4>${food.name}</h4>
                        <p>Rs.${Math.round(food.price)}</p>

                        <p>
                            ${food.description}
                        </p>

                        <br>

                        <a href="order.html?id=${food.id}" class="btn btn-primary">Order Now</a>
                    </div>
                `;
                wrap.appendChild(box);
            });
        });
});
