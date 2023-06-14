
function Person() {
    this.name = 'aadi';
    this.age = 23;
    this.greet = function () {
        console.log("Hi, I am ", this.name + " and i am " + this.age + ' years old !!')
    }
}

Person.describe = () => {
    console.log("Describe...")
}

Person.prototype.printAge = () => {
    console.log("here")
    console.log(this.age)
}

console.dir(Person);

const p = new Person();
p.greet();
p.printAge();

console.log(p)
console.log(p.__proto__)

// console.log(p.toString())

// const p2 = new p.__proto__.constructor();
// console.dir(Object); // global inbuilt constructor, still not final prototype
// Object.prototype : is final prototype of all object iei Object.prototye.__proto__=null 

console.log(Object.prototype, Object.prototype.__proto__) // null 



/* 
Implementing inheritance in legacy (ie without extends keyword)
function Best() {
    this.best = "aadi";
}
Best.prototype = Person;
const aadi = new Best();
const _linkBestAndPerson = new Person();
aadi.__proto__ = _linkBestAndPerson;
console.log(aadi.greet()); */




// caller childClass so this.name will be of child.
class c1 {
    ok1() {
        console.log(this.name)
        this.ok1c = function () { console.log("ok1c") }
    }
    ok1a = () => { console.log("ok1a") }
    ok1b = function () { console.log("ok1b") }
}
class c2 extends c1 {
    constructor() { super(); this.name = "aadi" }
    ok2() { }
    clicked() {
        console.log(" => ", this.name);
    }
    // clicked = () => {
    //     console.log("=> ", this.name)
    // }
}
const c2o = new c2();
const c2oa = new c2();
console.log(c2o.__proto__ === c2oa.__proto__);; // saves memory and perform good, by storing funs in same proto 1 layer deep
c2o.ok1()
console.log(c2o)

const btn = document.getElementById('btn');
console.log(btn)
// btn.addEventListener('click', c2o.clicked); // works with arrow (non optimized ie in classObjectLevel , not in prototye)
btn.addEventListener('click', c2o.clicked.bind(c2o)); // works with arrow (non optimized ie in classObjectLevel , not in prototye)


/*
adding fun in prototypes (not in object) to add in object
M1. either in constructor this.greet = function(){}
M2. greet(){} in class => this default triggers to do optimizatino and add in prototype
greet = function(){} OR ()=>{} ... ...this will add default only
*/

// Builtin prototypes : Array, String  [],"" creates Array/String object, whose prototypes stores lot
// focus WHAT (not HOW)
// eg proto + own => newProto (explroe methods )


const course = {
    title: "js",
    rating: 5
}
// course.__proto__ = Object 
console.log(course.__proto__, course.__proto__.__proto__);
// 1. creates a in between prototype layer of object and prev prototype of object 
Object.setPrototypeOf(course, {
    // ...Object.getPrototypeOf(course), NOTE: but new objects anyway have this prototypes of object, so OPTIONAL here. 
    printRating: function () {
        console.log("printing", this.rating, "/5");
    }
});

// 2. NOT recommended : directly adds in object prototypes, thats bad... 
// Object.prototype.printRating = function () {
//     console.log(this.rating, "/5")
// }

console.log(course)
// sapne wo hai, jo sone nahi dete 



const m1 = {};
const m2 = new Object();
const m3 = Object.create({ call1: function () { console.log("call1") } }, {
    name: {
        configurable: true,
        enumerable: true,
        value: "aadi",
        writable: true
    }
}); // sets prototype for empty object
m3.newKey = "newValue";

Object.defineProperty(m3, 'call2', {
    configurable: true,
    enumerable: true,
    value: 0.8,
    writable: false
})

console.log(m1, m2, m3)

