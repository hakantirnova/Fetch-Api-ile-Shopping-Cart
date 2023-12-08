//! Variables
const cartBtn = document.querySelector(".cart-btn")           // 1.Satır
const clearCartBtn = document.querySelector(".btn-clear")     // 2.Satır
const cartItems = document.querySelector(".cart-items")       // 3.Satır
const cartTotal = document.querySelector(".total-value")      // 4.Satır
const cartContent = document.querySelector(".cart-list")      // 5.Satır
const productsDOM = document.querySelector("#products-dom")   // 6.Satır

let buttonsDOM = []                                           // 30.Satır
let cart = []                                                 // 35.Satır

class Products {                                              // 7.Satır
  async getProducts() {                                       // 11.Satır
    try {                                                     // 12.Satır
      let result = await fetch("https://65719cc9d61ba6fcc0131667.mockapi.io/products")  // 15.Satır
      let products = await result.json()                                                // 16.Satır
      return products                                         // 17.Satır
    } catch(error) {                                          // 13.Satır
      console.log(error);                                     // 14.Satır
    }
  }
}

class UI {                                                    // 8.Satır
  displayProducts(products) {                                 // 22.Satır
    let result = ""                                           // 23.Satır
    products.forEach(item => {                                // 24.Satır
      result += `                                             
        <div class="col-lg-4 col-md-6">
          <div class="product">
            <div class="product-image">
              <img src="${item.image}" alt="product">
            </div>
            <div class="product-hover">
              <span class="product-title">${item.title}</span>
              <span class="product-price">$${item.price}</span>
              <button class="btn-add-to-cart" data-id=${item.id}>
                <i class="fas fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      `
    })
    productsDOM.innerHTML = result                            // 25.Satır
  }
  getBagButtons() {                                           // 26.Satır
    const buttons = [...document.querySelectorAll(".btn-add-to-cart")]  // 27.Satır
    buttonsDOM = buttons                                      // 31.Satır
    buttons.forEach(button => {                               // 32.Satır
      let id = button.dataset.id                              // 33.Satır
      let inCart = cart.find(item => item.id === id)          // 34.Satır
      if(inCart) {                                            // 36.Satır
        button.setAttribute("disabled","disabled")            // 37.Satır
        button.opacity = ".3"                                 // 38.Satır
      } else {                                                // 39.Satır
        button.addEventListener("click", event => {           // 40.Satır
          event.target.disabled = true                        // 41.Satır
          event.target.style.opacity = ".3"                   // 42.Satır
          //* get product from products
          let cartItem = {...Storage.getProduct(id), amount: 1} // 47.Satır
          //* add product to the cart
          cart = [...cart, cartItem]                          // 50.Satır
          //* save cart in localstorage
          Storage.saveCart(cart)                              // 51.Satır
          //* save cart values
          this.saveCartValues(cart)                           // 54.Satır
          //* display cart item       
          this.addCartItem(cartItem)                          // 63.Satır
          //* show the cart
          this.showCart()                                     // 67.Satır
        })
      }
    })
  }
  saveCartValues(cart) {                                      // 55.Satır
    let tempTotal = 0                                         // 56.Satır
    let itemsTotal = 0                                        // 57.Satır
    cart.map(item => {                                        // 58.Satır
      tempTotal += item.price * item.amount                   // 59.Satır
      itemsTotal += item.amount                               // 60.Satır
    })
    cartTotal.innerText = `$ ${parseFloat(tempTotal.toFixed(2))}`// 61.Satır
    cartItems.innerText = itemsTotal                          // 62.Satır 
  }
  addCartItem(item) {                                         // 64.Satır
    const li = document.createElement("li")                   // 65.Satır
    li.classList.add("cart-list-item")                        // 66.Satır
    li.innerHTML = `
      <div class="cart-left">
        <div class="cart-left-image">
          <img src="${item.image}" alt="product" />
        </div>
        <div class="cart-left-info">
          <a class="cart-left-info-title" href="#">${item.title}</a>
          <span class="cart-left-info-price">$ ${item.price}</span>
        </div>
      </div>
      <div class="cart-right">
        <div class="cart-right-quantity">
          <button class="quantity-minus" data-id="${item.id}">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity">${item.amount}</span>
          <button class="quantity-plus" data-id="${item.id}">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="cart-right-remove">
          <button class="cart-remove-btn" data-id="${item.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `
    cartContent.appendChild(li)
  } 
  showCart() {                                                // 68.Satır
    cartBtn.click()                                           // 69.Satır
  }
  setupAPP() {                                                // 70.Satır
    cart = Storage.getCart()                                  // 71.Satır
    this.saveCartValues(cart)                                 // 75.Satır
    this.populateCart(cart)                                   // 76.Satır
  }
  populateCart(cart) {                                        // 77.Satır
    cart.forEach(item => this.addCartItem(item))              // 78.Satır
  }
  cartLogic() {                                               // 79.Satır
    clearCartBtn.addEventListener("click", () => {            // 80.Satır
      this.clearCart()                                        // 81.Satır
    })
    cartContent.addEventListener("click", event => {          // 97.Satır
      if(event.target.classList.contains("cart-remove-btn")) {// 98.Satır
        let removeItem = event.target                         // 99.Satır
        let id = removeItem.dataset.id                        // 100.Satır
        removeItem.parentElement.parentElement.parentElement.remove() // 101.Satır
        this.removeItem(id)                                           // 102.Satır
      } else if(event.target.classList.contains("quantity-minus")) {  // 103.Satır
        let lowerAmount = event.target                                // 104.Satır
        let id = lowerAmount.dataset.id                               // 105.Satır
        let tempItem = cart.find(item => item.id === id)              // 106.Satır
        tempItem.amount = tempItem.amount - 1                         // 107.Satır
        if(tempItem.amount > 0) {                                     // 108.Satır
          Storage.saveCart(cart)                                      // 109.Satır
          this.saveCartValues(cart)                                   // 110.Satır
          lowerAmount.nextElementSibling.innerText = tempItem.amount  // 111.Satır
        } else {                                                      // 112.Satır
          lowerAmount.parentElement.parentElement.parentElement.remove()  // 113.Satır
          this.removeItem(id)                                             // 114.Satır
        }
      } else if(event.target.classList.contains("quantity-plus")) {       // 115.Satır     
        let addAmount = event.target                                      // 116.Satır
        let id = addAmount.dataset.id                                     // 117.Satır
        let tempItem = cart.find(item => item.id === id)                  // 118.Satır
        tempItem.amount = tempItem.amount + 1                             // 119.Satır
        Storage.saveCart(cart)                                            // 120.Satır
        this.saveCartValues(cart)                                         // 121.Satır
        addAmount.previousElementSibling.innerText = tempItem.amount      // 122.Satır
      }
    })
  }
  clearCart() {                                               // 82.Satır
    let cartItems = cart.map(item => item.id)                 // 83.Satır
    cartItems.forEach(id => this.removeItem(id))              // 84.Satır
    while(cartContent.children.length > 0) {                  // 94.Satır
      cartContent.removeChild(cartContent.children[0])        // 95.Satır
    }
  }
  removeItem(id) {                                            // 85.Satır
    cart = cart.filter(item => item.id !== id)                // 86.Satır
    this.saveCartValues(cart)                                 // 87.Satır
    Storage.saveCart(cart)                                    // 88.Satır
    let button = this.getSingleButton(id)                     // 89.Satır
    button.disabled = false                                   // 92.Satır
    button.style.opacity = "1"                                // 93.Satır
  }
  getSingleButton(id) {                                       // 90.Satır
    return buttonsDOM.find(button => button.dataset.id === id)// 91.Satır
  }
}

class Storage {                                                 // 9.Satır
  static saveProducts(products) {                               // 43.Satır
    localStorage.setItem("products", JSON.stringify(products))  // 44.Satır
  }
  static getProduct(id) {                                       // 46.Satır
    let products = JSON.parse(localStorage.getItem("products")) // 48.Satır
    return products.find(product => product.id === id)          // 49.Satır
  }
  static saveCart(cart) {                                       // 52.Satır
    localStorage.setItem("cart", JSON.stringify(cart))          // 53.Satır
  }
  static getCart() {                                            // 72.Satır
    return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []  // 73.Satır
  }
}

document.addEventListener("DOMContentLoaded", () => {         // 10.Satır
  const ui = new UI()                                         // 20.Satır
  const products = new Products()                             // 18.Satır
  ui.setupAPP()                                               // 74.Satır
  products.getProducts().then(products => {                   // 19.Satır
    ui.displayProducts(products)                              // 21.Satır
    Storage.saveProducts(products)                            // 45.Satır
  }).then(() => {                                             // 28.Satır
    ui.getBagButtons()                                        // 29.Satır
    ui.cartLogic()                                            // 96.Satır
  })                                      
})