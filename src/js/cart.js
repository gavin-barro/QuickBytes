var order = document.getElementById('order');
parent_div = document.createElement("food-options");

window.addEventListener("DOMContentLoaded", () => {
    let str_food = localStorage.getItem("order");
    let food_items = JSON.parse(str_food);
    food_items.forEach(element => {
        let order_item = document.createElement('div');
        order_item.classList.add('food-option');
        let img = document.createElement('img');
        img.classList.add('food-img');
        img.src = getImage(element);
        img.alt = element;
        order_item.innerText = element;

        order_item.appendChild(img);
        order.appendChild(order_item);
    });
})


function getImage(text) {
    image_path = "";
    switch (text) {
        case "Burger":
            image_path = "../../images/Foods/burger.jpg";
            break;
    }

    return image_path;
}