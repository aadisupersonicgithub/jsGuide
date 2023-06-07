console.log('welcome')
// oops , class instance , properties fields methods, inheritance

// thinking in js terms bit boring/long... lets put things in separate pieces and combine later 
const productList = {
    products: [
        {
            name: "monitor",
            url: "https://images.philips.com/is/image/PhilipsConsumer/271V8_94-IMS-en_IN?$jpglarge$&wid=1250",
            price: 34000,
            description: "enhance productivity"
        }, {
            name: "headphone",
            url: "https://vlebazaar.in/image/cache/catalog/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Bl/boAt-Rockerz-370-Bluetooth-Wireless-On-Ear-Headphone-with-Mic-Buoyant-Black-Rock-1100x1100.jpg",
            price: 4500,
            description: "quality experience while listening music"
        }
    ],

    render() {
        const renderHook = document.getElementById('app');
        const productListEl = document.createElement('ul');

        productListEl.className = 'product-list';

        for (const prod of this.products) {
            const prodEl = document.createElement('li');

            prodEl.className = 'product-item';
            prodEl.innerHTML = `
            <div>
                <img src="${prod.url}" alt="${prod.name}" height="300" width="8 00" />
                <div class="product-item__content">
                    <h2> ${prod.name} </h2>
                    <h3> \$${prod.price} </h3>
                    <p> ${prod.description} </p>
                    <button> Add to Cart </button>
                </div>
            </div>
            `;

            productListEl.append(prodEl)
        }

        console.log(productListEl)
        renderHook.append(productListEl);
        // renderHook.append('<h1> hi </h1>');

    }
};
productList.render();

/* 
using object to create rendering, is its reusable though initial effort to understand.
classes : 
builds object based on some blueprint  ie Alternative to objects, 
objects thus instance/examples of classes, 
multi object creation easier 
 */

class Product {
    // CLASS FIELDS (NOTE optional as anyway autoCalled constructors create these so omit/comment these)
    title = 'DEFAULT'; // NOT title: 'default', here called fields (ie key)
    url; // undefined if not initizlied 
    description;
    price;

    // // someName() {} ...special method which js calls by default ie construcutr when `new Product()` 
    // CLASS METHODS 
    constructor(title, image, desc, price) {
        // this refers to class here, we cant make now mistakes in fields/typos etc
        // CLASS PROPERTIES (is what put in object when classInstance/object instantiate)
        this.title = title;
        this.url = image;
        this.description = desc;
        this.price = price;
    }

}
// to create objects based  
console.log(new Product())
console.log(new Product())

// // 243 constructro , to initialize diff object with diff fields o/w sb same hai so far , cons is just a method
console.log(new Product('power', 'www.com', 'MUST to have', 'blood, tears and sweat'))

// 244 classes fields/properties/methods
// done 

