const foodItems = document.querySelectorAll(".order-btn");

foodItems.forEach(item => {
    item.addEventListener("click", () => {
        // Initialize order and total
        let food_items = [];

        // Retrieve existing data if it exists
        if (localStorage.getItem("order")) {
            food_items = JSON.parse(localStorage.getItem("order"));
        }


        addItem(food_items, item);
    });
});

function addItem(arr, item, curr_price) {
    const itemName = item.getAttribute("data-food");
    const itemPrice = parseFloat(item.getAttribute("data-price"));

    arr.push({ name: itemName, price: itemPrice });

    localStorage.setItem("order", JSON.stringify(arr));
}