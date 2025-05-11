const foodItems = document.querySelectorAll(".order-btn");
foodItems.forEach(item => {
    item.addEventListener("click", ()=>{
        if (!localStorage.getItem("order")) {
            food_items = []
            addItem(food_items, item)
        } else {
            let str_food = localStorage.getItem("order");
            let food_items = JSON.parse(str_food);
            addItem(food_items, item)
        }
    });
});

function addItem(arr, item) {
    const itemName = item.getAttribute("data-food");
    arr.push(itemName);
    let str = JSON.stringify(arr);
    localStorage.setItem("order", str);
}
