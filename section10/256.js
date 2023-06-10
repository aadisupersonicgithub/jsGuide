
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

    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) this.render();

    }

    render() {
        console.log("called")
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
        super(renderHookId, false);
        this.product = product;
        this.render();
    }

    addToCart() {
        App.addProductToCart(this.product);

    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item');

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
        return prodEl;
    }
}


class ProductList extends Component {
    #products = []

    constructor(renderHookId) {
        super(renderHookId);
        this.fetchProducts();

    }

    fetchProducts() {
        this.#products = [
            new Product("monitor", "https://images.philips.com/is/image/PhilipsConsumer/271V8_94-IMS-en_IN?$jpglarge$&wid=1250", 34000, "enhance productivity"),
            new Product("headphone", "https://vlebazaar.in/image/cache/catalog/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Bl/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Black-Rock-1100x1100.jpg", 4500, "quality experience while listening music")
        ]
        this.renderFetchedProducts()
    }

    renderFetchedProducts() {
        for (const prod of this.#products) {
            const prodEl = new ProductItem(prod, 'product-list');
        }
    }

    render() {
        const productListEl = this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'product-list')]);
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
        this.items = val; this.totalAmount.innerHTML = ` <h2> Total: \$${this.totalPrice.toFixed(2)}</h2>`
    }

    constructor(renderHookId) {
        super(renderHookId, false);
        // declaring fun as Arrow in properties (but the way super works, it will restart after super, so render may get issue)
        this.orderProducts = () => {
            console.log("Ordering...")
            console.log(this)
            console.log(this.items)
        }
        this.render();
    }

    #fuckingPrivate() {
        console.log("i am private function bitch...")
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }


    // for sol1, 2 
    // orderProducts() {
    //     console.log("Ordering...")
    //     console.log(this)
    //     console.log(this.items)
    // }

    render() {
        this.#fuckingPrivate();
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
            <h2> Total: \$${0}</h2>
            <button> Order now </button>
        `;
        const orderBtn = cartEl.querySelector('button');
        // orderBtn.addEventListener('click', this.orderProducts.bind(this)) // so11,  below (as arrow dont know this , so it will assign of class)
        // orderBtn.addEventListener('click', () => this.orderProducts()) // sol2
        orderBtn.addEventListener('click', this.orderProducts)

        this.totalAmount = cartEl.querySelector('h2');
    }
}

class Shop {
    constructor() {
        this.render();
    }

    render() {
        this.cart = new ShoppingCart('app');
        const productList = new ProductList('app');
        // console.log(productList.#products) cant access private variables from outside.
        // productList.#fuckingPrivate();
        // usecase of private: eg if changing some variable wont rerender , so to avoid such behaviour by user. 
    }
}


class App {
    static cart = 'DEFAULT_CART';
    _psuedoPrivate = "boi";

    static init() {
        const myShop = new Shop();
        this.cart = myShop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product)
    }
}
console.log(App._psuedoPrivate); // technically feasible, but not advisable... bcz underscore as prefix tells its private(pseudo)
App.init();

const p2 = new App('lo');
console.log(typeof p2, p2 instanceof App, p2 instanceof Component)

const myBtn = document.querySelector('button')
console.log(myBtn)
console.dir(myBtn)

console.log(myBtn instanceof HTMLButtonElement);
console.log(myBtn instanceof HTMLElement);
// baseClass : HTMLElement 
console.log(HTMLButtonElement instanceof HTMLElement)

// call these HTMLElement etc classes, but technically something else... Prototypes , DOM deepdive module 


