var order = document.getElementById('cart-items');
var total_price = 0;

window.addEventListener("DOMContentLoaded", () => {
    food_items = JSON.parse(localStorage.getItem("order"));
    console.log("enter event listener")
    food_items.forEach(element => {
        item_name = element.name;
        if (item_name != "mod_burger" && item_name != "mod_pizza") {
            var item_price = parseFloat(element.price);
            // calculates total price
            total_price += item_price;

            // creating box for all item information
            const order_item = document.createElement('div');
            order_item.classList.add('cart-item');

            // adds image
            const img = document.createElement('img');
            img.classList.add('cart-img');
            img.src = getImage(item_name);
            img.alt = item_name;

            // adding other details
            const item_info = document.createElement('div');
            item_info.classList.add('item-info');

            const item_name1 = document.createElement('h1');
            item_name1.textContent = item_name;

            const item_price1 = document.createElement('h2');
            item_price1.textContent = '$ ' + item_price.toFixed(2);

            const remove_btn = document.createElement('button');
            remove_btn.textContent = 'Remove';
            remove_btn.classList.add('remove-btn');
            remove_btn.addEventListener('click', (ev) => {
                removeItem(food_items, element);
            });

            // appending information to box
            item_info.appendChild(item_name1);
            item_info.appendChild(item_price1);
            item_info.appendChild(remove_btn);

            // adding information to div element
            order_item.appendChild(img);
            order_item.appendChild(item_info);
            order.appendChild(order_item);

        }  else if (item_name == "mod_pizza") {
            modified_pizza(element)
        } else if (item_name == "mod_burger") {
            modified_burger(element);
        }
    });

    // total box
    const total_item = document.getElementById('total');
    // total information
    const order_item = document.createElement('div');
    order_item.classList.add('cart-total');
    const total_text = document.createElement('h1');
    total_text.textContent = 'Total:';
    const total_price_text = document.createElement('h2');
    total_price_text.textContent = "$" + total_price.toFixed(2);

    // create submits button
    const submit_button = document.createElement('button');
    submit_button.textContent = 'Submit';
    submit_button.classList.add('submit-btn');
    submit_button.addEventListener('click', ev => {
        submitOrder();
    });

    // adding information to total box
    order_item.appendChild(total_text);
    order_item.appendChild(total_price_text);
    order_item.appendChild(submit_button);
    total_item.appendChild(order_item);
})


// finds the image link for display and returns it
function getImage(text) {
    var image_link = "";
    switch (text) {
        case 'Burger':
        case 'Cheeseburger':
            image_link = '../../images/Foods/burger.jpg';
            break;
        case 'Veggie Wrap':
            image_link = '../../images/Foods/veggie_wrap.jpg';
            break;
        case 'Grilled Chicken Sandwich':
            image_link = '../../images/Foods/grilled_chicken_sandwich.jpg';
            break;
        case 'Caesar Salad':
            image_link = '../../images/Foods/caesar_salad.jpg';
            break;
        case 'mod_pizza':
        case 'Pepperoni Pizza':
            image_link = '../../images/Foods/pepperoni_pizza.jpg';
            break;
        case 'Pizza':
            image_link = '../../images/Foods/pepperoni_pizza.jpg';
            break;
        case 'Fish and Chips':
            image_link = '../../images/Foods/fish_and_chips.jpg';
            break;
        case 'Veggie Wrap':
            image_link = '../../images/Foods/veggie_wrap.jpg';
            break;
        case 'Chicken Tenders':
            image_link = '../../images/Foods/chicken_tenders.jpg';
            break;
        case 'Club Sandwich':
            image_link = '../../images/Foods/club_sandwich.jpg';
            break;
        case 'Steak':
            image_link = '../../images/Foods/steak.avif';
            break;
        case 'Honey BBQ Wings':
            image_link = '../../images/Foods/honey_bbq.jpg';
            break;
        case 'Water':
            image_link = '../../images/Drinks/water.jpg';
            break;
        case 'Iced Tea':
            image_link = '../../images/Drinks/iced_tea.avif';
            break;
        case 'Coke':
            image_link = '../../images/Drinks/coke.webp';
            break;
        case 'Fruit Punch':
            image_link = '../../images/Drinks/fruit_punch.avif';
            break;
        case 'Dr. Pepper':
            image_link = '../../images/Drinks/dr_pepper.jpeg';
            break;
        case 'Sprite':
            image_link = '../../images/Drinks/sprite.webp'
            break;
        case 'Lemonade':
            image_link = '../../images/Drinks/lemonade.webp';
            break;
        case 'Coffee':
            image_link = '../../images/Drinks/coffee.webp';
            break;
        case 'Orange Juice':
            image_link = '../../images/Drinks/orange_juice.jpg';
            break;
        case 'Root Beer':
            image_link = '../../images/Drinks/root_beer.jpg';
            break;
        case 'Chocolate Cake':
            image_link = '../../images/Desserts/chocolate_cake.jpeg';
            break;
        case 'Cheesecake':
            image_link = '../../images/Desserts/cheesecake.webp';
            break;
        case 'Ice Cream Sundae':
            image_link = '../../images/Desserts/ice_cream_sundae.jpg';
            break;
        case 'Brownie':
            image_link = '../../images/Desserts/brownie.jpg';
            break;
        case 'Apple Pie':
            image_link = '../../images/Desserts/apple_pie.jpg';
            break;
        case 'Cookies (3)':
            image_link = '../../images/Desserts/cookies.avif';
            break;
        case 'Tiramisu':
            image_link = '../../images/Desserts/tiramisu.jpg';
            break;
        case 'Ice Cream Cake':
            image_link = '../../images/Desserts/ice_cream_cake.jpg';
            break;
        case 'Banana Pudding':
            image_link = '../../images/Desserts/banana_pudding.jpg';
            break;
        case 'Milkshake':
            image_link = '../../images/Desserts/milkshake.jpg';
            break;
    }
    return image_link;
}

// removes an item from the order
function removeItem(food_items, element) {
    const newItems = []
    var removedItem = false;
    food_items.forEach(item => {
        if (!removedItem) {
            if (element.name != item.name) {
                newItems.push(item)
            } else {
                removedItem = true;
            }
        } else {
            newItems.push(item);
        }
    });
    localStorage.setItem("order", JSON.stringify(newItems));
    window.location.reload(true);
}

// function submitOrder() {
//     const total_item = document.getElementById('total');
//     total_item.innerHTML = '';
//     total_item.classList.add('cart-submit');

//     const total_text = document.createElement('h1');
//     total_item.textContent = 'Your order has been submitted';
//     total_item.style.color = 'green';

//     total_item.appendChild(order_item);
// }

function submitOrder() {
    localStorage.setItem("order", JSON.stringify([])); 

    const order = document.getElementById('cart-items');
    order.innerHTML = ''; 

    total_price = 0;

    const total_price_text = document.querySelector('#total h2');
    total_price_text.textContent = "$" + total_price.toFixed(2);

    alert("Your order has been submitted!");
}

function modified_burger(element) {
    // calculates total price
    var item_price = parseFloat(element.price);
    total_price += item_price;

    // creating box for all item information
    const order_item = document.createElement('div');
    order_item.classList.add('cart-item');

    // adds image
    const img = document.createElement('img');
    img.classList.add('cart-img');
    img.src = getImage('Burger');
    img.alt = 'burger';

    // details on the left
    const item_info = document.createElement('div');
    item_info.classList.add('item-info');

    // Item name and toppings
    const item_name1 = document.createElement('h1');
    // item_name1.textContent = 'Modified Burger: ' + element.toppings;
    item_name1.textContent = 'Modified Burger: ' + element.toppings
        .split(',') // Split the string into an array at commas
        .map(topping => 
            topping
            .split('-') // Split hyphenated words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' ') // Join hyphenated words with space
        )
        .join(', '); // Join toppings with comma and space

    // Item price
    const item_price1 = document.createElement('h2');
    item_price1.textContent = '$ ' + item_price.toFixed(2);


    // remove button
    const remove_btn = document.createElement('button');
    remove_btn.textContent = 'Remove';
    remove_btn.classList.add('remove-btn');
    remove_btn.addEventListener('click', (ev) => {
        removeItem(food_items, element);
    });

    // appending information to box
    item_info.appendChild(item_name1);
    item_info.appendChild(item_price1);
    item_info.appendChild(remove_btn);

    // adding information to div element
    order_item.appendChild(img);
    order_item.appendChild(item_info);
    order.appendChild(order_item);
}

function modified_pizza(element) {
    // calculates total price
    var item_price = parseFloat(element.price);
    total_price += item_price;

    // creating box for all item information
    const order_item = document.createElement('div');
    order_item.classList.add('cart-item');

    // adds image
    const img = document.createElement('img');
    img.classList.add('cart-img');
    img.src = getImage('Pizza');
    img.alt = 'Modified Pizza';

    // details on the left
    const item_info = document.createElement('div');
    item_info.classList.add('item-info');

    // Item name and toppings
    const item_name1 = document.createElement('h1');
    item_name1.textContent = 'Modified Pizza: ' + element.toppings
        .split(',') // Split the string into an array at commas
        .map(topping => 
            topping
            .split('-') // Split hyphenated words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' ') // Join hyphenated words with space
        )
        .join(', '); // Join toppings with comma and space

    // Item price
    const item_price1 = document.createElement('h2');
    item_price1.textContent = '$ ' + item_price.toFixed(2);

    // remove button
    const remove_btn = document.createElement('button');
    remove_btn.textContent = 'Remove';
    remove_btn.classList.add('remove-btn');
    remove_btn.addEventListener('click', (ev) => {
        removeItem(food_items, element);
    });

    // appending information to box
    item_info.appendChild(item_name1);
    item_info.appendChild(item_price1);
    item_info.appendChild(remove_btn);

    order_item.appendChild(img);
    order_item.appendChild(item_info);
    order.appendChild(order_item);
}
