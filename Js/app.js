// Close Toggle for Navebar
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
var products = [
  {
    id: 1,
    image: "img/products/f1.jpg",
    name: "adidas",
    t_shirts: "Cartoon T-shirts",
    price: "$2008",
    stoks: 150,
  },
  {
    id: 2,
    image: "img/products/f2.jpg",
    name: "adidas",
    t_shirts: "Cartoon T-shirts",
    price: "$2008",
    stoks: 550,
  },
  {
    id: 3,
    image: "img/products/f3.jpg",
    name: "adidas",
    t_shirts: "Cartoon T-shirts",
    price: "$2008",
    stoks: 500,
  },
  {
    id: 4,
    image: "img/products/f4.jpg",
    name: "adidas",
    t_shirts: "Cartoon T-shirts",
    price: "$2008",
    stoks: 10,
  },
  {
    id: 5,
    image: "img/products/f5.jpg",
    name: "adidas",
    t_shirts: "Cartoon T-shirts",
    price: "$2008",
    stoks: 50,
  },
  {
    id: 6,
    image: "img/products/f6.jpg",
    name: "adidas",
    t_shirts: "Cartoon T-shirts",
    price: "$2008",
    stoks: 500,
  },
  {
    id: 7,
    image: "img/products/f7.jpg",
    name: "adidas",
    t_shirts: "Cartoon T-shirts",
    price: "$2008",
    stoks: 20,
  },
  {
    id: 7,
    image: "img/products/f8.jpg",
    name: "adidas",
    t_shirts: "Cartoon T-shirts",
    price: "$2008",
    stoks: 20,
  },
];

//console.log(products);

/// homeProductCards.js
const productcontainer = document.querySelector("#product-container");
const productTemplate = document.querySelector("#prduct11");

products.forEach((curProd) => {
  const { id, name, t_shirts, image, price, stoks } = curProd;

  const productClone = document.importNode(productTemplate.content, true);

  productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);

  productClone.querySelector(".productImage").src = image;
  productClone.querySelector(".productImage").alt = image;
  productClone.querySelector(".name").textContent = name;
  productClone.querySelector(".productName").textContent = t_shirts;
  productClone.querySelector(".productPrice").textContent = price;
  productClone.querySelector(".productStock").textContent = stoks;

  productClone
    .querySelector(".stockElement")
    .addEventListener("click", (event) => {
      homeQualityToggle(event, id, stoks);
    });

   /*productClone.querySelector(".cart").addEventListener("click", (event) => {
    addToCart(event, id, stoks);
  });
  */
  productcontainer.append(productClone);
});

// HomeQuantityToggle.js
const homeQualityToggle = (event, id, stocks) => {
  const currentCardElement = document.querySelector(`#card${id}`);
  // console.log(currentCardElement);
  const productQuantity = currentCardElement.querySelector(".productQuantity");
  // console.log(productQuantity);
  let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

  if (event.target.className === "cartIncrement") {
    if (quantity < stocks) {
      quantity++;
    } else if (quantity === stocks) {
      quantity = stocks;
    }
  }

  if (event.target.className === "cartdecrement") {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  productQuantity.innerText = quantity;
  // console.log(quantity);
  productQuantity.setAttribute("data-quantity", quantity.toString());
  return quantity;
};
//getCartProductFromLS();
/// addtocart.js
const addToCart = (event, id, stocks) => {
  let arrLocalStorageProduct = getCartProductFromLS();

  const currentProdElement = document.querySelector(`#card${id}`);
  //  console.log(currentProdElement);
  let quantity = currentProdElement.querySelector(".productQuantity").innerText;
  let price = currentProdElement.querySelector(".productPrice").innerText;
  //console.log(quantity, price);
  price = price.replace("$", "");
  let existingProd = arrLocalStorageProduct.find(
    (curProd) => curProd.id === id,
  );
  if (existingProd && quantity > 1) {
    quantity = Number(existingProd.quantity) + Number(quantity);
    price = Number(price * quantity);
    let updatedCart = { id, quantity, price };

    updatedCart = arrLocalStorageProduct.map((curProd) => {
      return curProd.id === id ? updatedCart : curProd;
    });
    //console.log(updatedCart);
    localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));
  }
  if (existingProd) {
    alert("duplicate");
    return false;
  }
  //console.log(existingProd);
  price = Number(price * quantity);
  quantity = Number(quantity);
  //  console.log(price);

  arrLocalStorageProduct.push({ id, quantity, price });
  localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
  updateCartValue(arrLocalStorageProduct);
};

////getCartProductFromLS.js ///////////////////////
const getCartProductFromLS = () => {
  let cartProducts = localStorage.getItem("cartProductLS");
  if (!cartProducts) {
    return [];
  }
  cartProducts = JSON.parse(cartProducts);
  //updateCartValue(cartProducts);
  return cartProducts;
};
///// updateCartValue.js////////////////////////////

/*const cartValue = document.querySelector("#cartValue");
const updateCartValue = (cartProducts) => {
  return (cartValue.innerHTML = `<i class="bi bi-bag">${cartProducts.length}</i>`);
};
*/
//////Html add to cart

let cartProducts = getCartProductFromLS();
let filterProducts = products.filter((curProd) => {
  console.log(curProd.name);
  console.log(cartProducts);
});



let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector("._cart");
let closecart = document.querySelector("#close-cart");
//Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
//close cart

closecart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  //console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //Quantatiy changes
  var quantityInput = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var input = quantityInput[i];
    input.addEventListener("change", quantityChanged);
  }
  //Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  // buy Button
  document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
  alert("Your Order is Placed");
  var cartContent=document.getElementsByClassName('cart-content')[0];
  while(cartContent.hasChildNodes())
  {
cartContent.removeChild(cartContent.firstChild)
  }
  updatetotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}
//Add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var p_image = shopProducts.getElementsByClassName("productImage")[0].src;
  var p_title = shopProducts.getElementsByClassName("productName")[0].innerText;
  // var name = shopProducts.getElementsByClassName("name")[0].innerText;
  var p_price = shopProducts.getElementsByClassName("productPrice")[0].innerText;
  console.log(p_title, p_price, p_image);
  addProductToCart(p_image,p_title, p_price);
  updatetotal();
}

function  addProductToCart(p_image,p_title, p_price){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    alert("you have already and this item to cart");
    if (cartItemNames[0].innerText == p_title) {
     return;
   }
  }

var cartBoxContent = `<img src="${p_image}" alt="" class="cart-img"/>
<div class="detail-box">
<div class="cart-product-title">${p_title}</div>
 <div class="cart-price">${p_price}</div>
   <input type="number" value="1" class="cart-quantity">
   </div>
    <i class="bi bi-archive-fill cart-remove"></i>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
  .getElementsByClassName("cart-remove")[0]
  .addEventListener("click", removeCartItem);

cartShopBox
  .getElementsByClassName("cart-quantity")[0]
  .addEventListener("change", quantityChanged);
}

//Update Total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = document.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var _price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + _price * quantity;
  }
    //if price contain Cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  
}
