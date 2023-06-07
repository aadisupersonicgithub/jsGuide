
class Product {
    constructor(name, image, price, desc) {
        this.name = name;
        this.url = image;
        this.price = price;
        this.description = desc;
    }
}
/* 
console.log(new Product())
console.log(new Product('power', 'www.com', 'MUST to have', 'blood, tears and sweat'))
 */

class ProductItem {
    constructor(product) {
        this.product = product;
    }
    addToCart() {
        console.log("Adding to cart");
        // const cartEl = new ShoppingCart(); // static method type 
        // cartEl.addProduct(prod);
        // ShoppingCart.addProduct(prod); 
        App.addProductToCart(this.product);

        /* 
        console.log(this, " and product = ", this.product)
        console.log(this.product.name)
        const myCart = new ShoppingCart();
        document.body.append(myCart.render()); 
        */
    }
    render() {
        const prodEl = document.createElement('li');

        prodEl.className = 'product-item';
        const prod = this.product;
        prodEl.innerHTML = `
            <div>
                <img src="${prod.url}" alt="${prod.name}" height="1300" width="8 00" />
                <div class="product-item__content">
                    <h2> ${prod.name} </h2>
                    <h3> \$${prod.price} </h3>
                    <p> ${prod.description} </p>
                    <button> Add to Cart </button>
                </div>
            </div>
        `;
        /* 
        const ProductItemThis = this;
        addToCartBtn.addEventListener('click', this.addToCart.bind(ProductItemThis));
        */
        const addToCartBtn = prodEl.querySelector('button');
        addToCartBtn.addEventListener('click', this.addToCart.bind(this, prod));
        return prodEl;
    }
}


class ProductList {

    products = [
        new Product("monitor", "https://images.philips.com/is/image/PhilipsConsumer/271V8_94-IMS-en_IN?$jpglarge$&wid=1250", 34000, "enhance productivity"),
        new Product("headphone", "https://vlebazaar.in/image/cache/catalog/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Bl/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Black-Rock-1100x1100.jpg", 4500, "quality experience while listening music")
    ]

    render() {
        const productListEl = document.createElement('ul');

        productListEl.className = 'product-list';

        for (const prod of this.products) {
            const prodEl = new ProductItem(prod);
            productListEl.append(prodEl.render());
        }

        return productListEl;
    }

};

class ShoppingCart {
    items = [];
    // TODO: items update to re render. simple WHY communication is tough b/w components ? // this.render(); // will return html here, wont rerender in app 
    addProduct(product) {
        this.items.push(product);
        const total = this.items.length;
        this.totalAmount.innerHTML = ` <h2> Total: \$${total}</h2>`
    }

    render() {
        const cartEl = document.createElement('section');

        cartEl.className = 'cart';
        cartEl.innerHTML = `
            <h2> Total: \$${0}</h2>
            <button> Order now </button>
        `;

        this.totalAmount = cartEl.querySelector('h2');
        return cartEl;
    }
}

class Shop {

    render() {
        const renderHook = document.getElementById('app');

        // const cartList = new ShoppingCart(); const cartListEl = cartList.render(); 
        // later store in property of shop for ??? so use addProductToCart from productItem -> app to rerender directly.
        this.cart = new ShoppingCart();
        const cartListEl = this.cart.render();
        renderHook.append(cartListEl)

        const productList = new ProductList();
        const productListEl = productList.render();
        renderHook.append(productListEl);
    }
}


class App {
    static cart = 'DEFAULT_CART'; // looks better from readability
    static init() {
        const myShop = new Shop();
        myShop.render();
        this.cart = myShop.cart; // NOTE access to cart, came from shoppingCart -> shop -> App (using this.key passing upwards) ... aka  store reference to cart in property 
    }

    // NOTE: passed productToBeAddedToCart to app with STATIC , then served it to shoppingCart line 126.
    static addProductToCart(product) {
        this.cart.addProduct(product)
    }
}

App.init(); // instead of const app = new App(); app.init() ie solo reason STATIC exists for.

/*
app  - shop - shoppingCart 
            - productList   - productItem  -Product 
 
* thinking in js terms bit boring/long... 
* code separate pieces(earlier objects now classes) and link those object/classes  
* and combine later 
order of class dont matter, js engine aware of all classes beforehand. but before creating objects

Learning : declutter, krna kya hai EXACTLY , focus 20-80 features , root->leaf if stuck 
*/