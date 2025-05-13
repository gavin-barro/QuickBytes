const foodItems = document.querySelectorAll(".order-btn");

foodItems.forEach(item => {
    item.addEventListener("click", () => {
        const food_items = get_food_items();

        add_item(food_items, item);
    });
});

function add_item(arr, item, curr_price) {
    const item_text = item.getAttribute("data-food");
    const item_price = parseFloat(item.getAttribute("data-price"));

    arr.push({ name: item_text, price: item_price });

    localStorage.setItem("order", JSON.stringify(arr));
    
    // Show alert when the item is added
    alert(item_text + " has been added to the cart!");

}

const submit_info = document.getElementById('burgerForm');
submit_info.addEventListener('submit', (ev)=> {
    const food_items = get_food_items();

    const test = document.querySelector('#bun');
    const bread = test.value;
    const burger_items = []
    var total_price = 5.00;

    if (bread == "gluten-free") {
        total_price += 1;
    } else if (bread == "wheat") {
        total_price += .5
    }

    burger_items.push(bread);

    const check_boxes = document.querySelectorAll('.checkbox');
    check_boxes.forEach(item => {
        if (item.checked) {
            to_add = item.getAttribute('name');
            burger_items.push(to_add);
            total_price += parseFloat(item.getAttribute('data-price'));
        }
    });

    let arr = get_food_items();
    arr.push({name: "mod_burger", price: total_price, toppings: burger_items.toString()});

    localStorage.setItem("order", JSON.stringify(arr));
});


function get_food_items() {
    let food_items = [];

    if (localStorage.getItem("order")) {
        food_items = JSON.parse(localStorage.getItem("order"));
    }

    return food_items;
}

const bunSelect = document.getElementById("bun");
const checkboxes = document.querySelectorAll(".checkbox");
const totalPriceSpan = document.getElementById("totalPrice");

function updateTotalPrice() {
    let total = 5.00;

    // Bun price
    const selectedOption = bunSelect.options[bunSelect.selectedIndex];
    const bunPrice = parseFloat(selectedOption.getAttribute("data-price")) || 0;
    total += bunPrice;

    // Toppings/fries prices
    checkboxes.forEach(cb => {
        if (cb.checked) {
            total += parseFloat(cb.getAttribute("data-price")) || 0;
        }
    });

    totalPriceSpan.textContent = `$${total.toFixed(2)}`;
}

// Add event listeners to trigger price updates
bunSelect.addEventListener("change", updateTotalPrice);
checkboxes.forEach(cb => cb.addEventListener("change", updateTotalPrice));

// Initialize price on page load
updateTotalPrice();


// ===== Pizza Form Live Price Update =====

const pizzaForm = document.getElementById("pizzaForm");
const pizzaTotalPrice = pizzaForm.querySelector("#pizzaTotalPrice");

// Update total price on change
pizzaForm.addEventListener("change", updatePizzaPrice);

function updatePizzaPrice() {
    let total = 10.00; // base price

    // Crust price
    const crust = pizzaForm.querySelector("#crust");
    const crustPrice = parseFloat(crust.options[crust.selectedIndex].dataset.price);
    total += crustPrice;

    // All checkboxes in this form
    const checkboxes = pizzaForm.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb.checked) {
            total += parseFloat(cb.dataset.price);
        }
    });

    pizzaTotalPrice.textContent = `$${total.toFixed(2)}`;
}

// ===== Pizza Form Submit Event =====

pizzaForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const pizzaItems = [];
    let total = 10.00;

    const crustSelect = pizzaForm.querySelector("#crust");
    const crustType = crustSelect.value;
    const crustPrice = parseFloat(crustSelect.options[crustSelect.selectedIndex].dataset.price);
    total += crustPrice;

    pizzaItems.push(crustType);

    const checkboxes = pizzaForm.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb.checked) {
            pizzaItems.push(cb.value);
            total += parseFloat(cb.dataset.price);
        }
    });

    let arr = get_food_items();
    arr.push({
        name: "mod_pizza",
        price: total,
        toppings: pizzaItems.toString()
    });

    localStorage.setItem("order", JSON.stringify(arr));
});