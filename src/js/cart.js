var order = document.getElementById('cart-items');
var total_price = 0;

window.addEventListener("DOMContentLoaded", () => {
    food_items = JSON.parse(localStorage.getItem("order"));
    food_items.forEach(element => {
        item_name = element.name;
        item_price = parseFloat(element.price);
        total_price += item_price;
        let order_item = document.createElement('div');
        order_item.classList.add('cart-item');
        let img = document.createElement('img');
        img.classList.add('cart-img');
        img.src = getImage(item_name);
        img.alt = item_name;

        order_item.appendChild(img);
        order.appendChild(order_item);

    });
})

function getImage(text) {
    var image_link = "";
    switch (text) {
        case 'Burger':
        case 'Cheeseburger':
            image_link = '../../images/Foods/burger.jpg';
            break;
        case 'Grilled Chicken Sandwich':
            image_link = '../../images/Foods/grilled_chicken_sandwich.jpg';
            break;
        case 'Caesar Salad':
            image_link = '../../images/Foods/caesar_salad.jpg';
            break;
   }
   return image_link;
}
