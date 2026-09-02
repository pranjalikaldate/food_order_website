document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    const category = params.get("category") || "";

    // keep the search box showing what was searched
    document.getElementById("search-input").value = q;

    let url = "api/foods.php?";
    if (q) url += "q=" + encodeURIComponent(q) + "&";
    if (category) url += "category=" + encodeURIComponent(category);

    fetch(url)
        .then(res => res.json())
        .then(foods => {
            const wrap = document.getElementById("food-list");

            if (foods.length === 0) {
                wrap.innerHTML = '<p class="text-center">No food items found.</p>';
                return;
            }

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
