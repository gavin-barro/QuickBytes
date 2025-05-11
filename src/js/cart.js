window.addEventListener("DOMContentLoaded", () => {
    let str_food = localStorage.getItem("order");
    let food_items = JSON.parse(str_food);
    food_items.forEach(element => {
        console.log(element);
    });
})