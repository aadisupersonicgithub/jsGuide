
class Product {

    constructor(name, image, price, desc) {
        this.name = name;
        this.url = image;
        this.price = price;
        this.description = desc;
    }
}

class ElementAttribute {

    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {

    constructor(renderHookId) {
        console.log("constructor: component")
        this.hookId = renderHookId;
        // NOTE: render will call childs render, as `new` keywords assigns `this` of caller to the object created eg here its childrens classes so their methods will overwrite 
        this.render();
    }

    render() {
        console.log(" render: component")
    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}

class ProductItem extends Component {

    constructor(product, renderHookId) {
        console.log(" constructer: productItem")
        super(renderHookId);
        // this.product = product;
        this.fetchProduct(product);

    }

    addToCart() {
        if (this.product) {

            App.addProductToCart(this.product);
        }


    }

    fetchProduct(product) {
        this.product = product;
        this.render();
        App.addProductToCart(product);
    }

    renderFetchProduct(prodEl) {


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

        const addToCartBtn = prodEl.querySelector('button');
        addToCartBtn.addEventListener('click', this.addToCart.bind(this, prod));

    }

    render() {
        console.log(" render: productItem")
        const prodEl = this.createRootElement('li', 'product-item');

        // const prod = this.product;
        // prodEl.innerHTML = `
        //     <div>
        //         <img src="${prod.url}" alt="${prod.name}" height="1300" width="8 00" />
        //         <div class="product-item__content">
        //             <h2> ${prod.name} </h2>
        //             <h3> \$${prod.price} </h3>
        //             <p> ${prod.description} </p>
        //             <button> Add to Cart </button>
        //         </div>
        //     </div>
        // `;

        // const addToCartBtn = prodEl.querySelector('button');
        // addToCartBtn.addEventListener('click', this.addToCart.bind(this, prod));
        if (this.product) {
            this.renderFetchProduct(prodEl);
        }

        return prodEl;
    }
}


class ProductList extends Component {

    // FAIL 1a this wont work as super classs ke baad ye initialize hota 
    // products = [
    //     new Product("monitor", "https://images.philips.com/is/image/PhilipsConsumer/271V8_94-IMS-en_IN?$jpglarge$&wid=1250", 34000, "enhance productivity"),
    //     new Product("headphone", "https://vlebazaar.in/image/cache/catalog/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Bl/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Black-Rock-1100x1100.jpg", 4500, "quality experience while listening music")
    // ]

    constructor(renderHookId) {
        // FAIL 1b pahle kia, but its NOT allowed to call 'this' before calling super()
        // this.products = products = [
        //     new Product("monitor", "https://images.philips.com/is/image/PhilipsConsumer/271V8_94-IMS-en_IN?$jpglarge$&wid=1250", 34000, "enhance productivity"),
        //     new Product("headphone", "https://vlebazaar.in/image/cache/catalog/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Bl/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Black-Rock-1100x1100.jpg", 4500, "quality experience while listening music")
        // ]
        super(renderHookId);
        // FAIL 1c again same issue, like declaring in class (as render there is not able to find these) 
        // this.products = [
        //     new Product("monitor", "https://images.philips.com/is/image/PhilipsConsumer/271V8_94-IMS-en_IN?$jpglarge$&wid=1250", 34000, "enhance productivity"),
        //     new Product("headphone", "https://vlebazaar.in/image/cache/catalog/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Bl/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Black-Rock-1100x1100.jpg", 4500, "quality experience while listening music")
        // ]
        this.fetchProducts();
        console.log("constructor: productList")

    }

    fetchProducts() {
        this.products = [
            new Product("monitor", "https://images.philips.com/is/image/PhilipsConsumer/271V8_94-IMS-en_IN?$jpglarge$&wid=1250", 34000, "enhance productivity"),
            new Product("headphone", "https://vlebazaar.in/image/cache/catalog/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Bl/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Black-Rock-1100x1100.jpg", 4500, "quality experience while listening music")
        ]
        this.renderFetchedProducts();
    }

    renderFetchedProducts() {

        for (const prod of this.products) {
            const prodEl = new ProductItem(prod, 'product-list');
        }
    }

    render() {
        console.log("render: productList")
        const productListEl = this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'product-list')]);

        // this.products as for class fields, only gets converted to this.x=x form after super() call 
        // ie why not able to access any of these fields 
        // can only use 'this' in subclass, once 'super' is called 
        // if (this.products && this.products.length > 0) {
        //     this.renderFetchedProducts();
        // }

        return productListEl;
    }

};

class ShoppingCart extends Component {
    items = [];

    get totalPrice() {
        const sum = this.items.reduce((prev, curItem) => prev + curItem.price, 0);
        return sum;
    }

    set cartItems(val) {
        this.items = val;
        // NOTE when cartItems change, setter trigger, and change h2 content ie reference, so seems Rerender.
        this.totalAmount.innerHTML = ` <h2> Total: \$${this.totalPrice.toFixed(2)}</h2>`
    }

    constructor(renderHookId) {
        console.log("constructor: shoppingCart");
        super(renderHookId);
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        console.log("render: shoppingCart")
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
            <h2> Total: \$${0}</h2>
            <button> Order now </button>
        `;

        this.totalAmount = cartEl.querySelector('h2');
    }
}

// class Shop extends Component {
//     constructor() {
//         super();
//     }
class Shop {
    constructor() {
        console.log("constructor: shop")
        this.render();
    }
    render() {
        console.log("render: shop")
        this.cart = new ShoppingCart('app');

        const productList = new ProductList('app');
    }
}


class App {
    static cart = 'DEFAULT_CART';

    static init() {
        console.log("called init")
        const myShop = new Shop();
        console.log("called after myShop")
        console.log(this.cart)
        this.cart = myShop.cart;
        console.log(this.cart)
    }

    static addProductToCart(product) {
        console.log("addProductToCart")
        // this.cart.addProduct(product)
    }


    // something = 2;
    // constructor() { this.b = 5; }
    // goHere() {
    //     console.log(this);
    // }
}

App.init();

// Below is how class fields works
// const app = new App();
// app.goHere()

// app.init(); cant call static methods on objects
// que : why 'prod' of productItemList getting used, even though its class field and not called via class instead via object
