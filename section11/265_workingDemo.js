class Person2 {
    name = 'aadi';
    constructor() {
        this.age = 23;
    }
    greet() {
        console.log("Hi, I am ", this.name + " and i am " + this.age + ' years old !!')
    }
}
const c = new Person2();
console.log(c)

function Person() {
    // this = {}
    this.name = 'aadi';
    this.age = 23;
    this.greet = function () {
        console.log("Hi, I am ", this.name + " and i am " + this.age + ' years old !!')
    }
    // return this 
}


const p = new Person();
/*  
const p = new person(); // lowercase fun is fine too 
only unique thing about constructur function is, its called with 'new' here , o/w as its not returning anything no object will be created 
FIELD , converted to PROPERTIES , once object of class created. 
TODO though currently constructorFunction not exact equivalent 
    Because name and greet are bit technically different. 
    Lets understand later. 


class is syntactial sugar for constructor function (as thats complex when scaled), also other langs Class exist 
class also does inherits (ie prototypes handling too)


prototypes
================

js uses prototypical inhertical , class is just syntactical sugar (construct function and prototypes POWERS js)
IMP: prototype is not property of functionBody, but property of function object 

when object created that same function property (aka prototype) by default assigned to object 
    object ka prototype is accessed via __proto__ property (all objects have this __proto__ property) 
    eg Person.prototype (default tha) , p.__proto__ ko bhi default hi assigned when object p got created , ie why both same. 

prototype objects = fallback objects (ie if object dont find any key/methods in its constructor, it looks in its prototype and chained similarly ahead)
prototypes exist for sharing code b/w various constructors (as extends does in classes)

prototype chain : ie for objects , lookup its baseclass (/prototype) ie p.__proto__ ...and so on until null (p.__proto__.__proto__.__proto__)
*/

console.dir(Person); // as construction is function and every function is object 
Person.prototype.sayHello = () => {
    console.log("hi aadi");
};
console.log(p);
// const p2 = new Person();
// console.log(p2);


console.log(Person.prototype.constructor === Person); // true 

// __proto__ present on every js object, no matter how you created it.

// Person.prototype thing will be assigned to any object created with this construtor function.
// note : still they DONT have same fallbakck object ie 
console.log(p.__proto__ == Person.prototype)

// Person.prototype.added = () => console.log('aadi');
// Person.prototype = {
// overwrites prototype entirely so Person.prototype is newCurValue, but p.__proto__ still earlier one, so wont match 
//     IE: console.log(p.__proto__, " and person.prototype = ", Person.prototype) 
//     same prototype assignment done by 'extends' keyword when inheriting in classes.


//     subtracted: () => console.log("subtracted"),
//     multiply: () => console.log("multiplied")
// }

console.log(p.__proto__ == Person.prototype)
// ie prototype dont shows connected object, but sets the prototypeObject of (to be created object) 
// to access prototype Object, only __proto__  

// console.log(p.toString())
/* 
prototype is not something which Person would reach out if called 
eg Person.toString(); // toString() is not on object itself


Prototype property of our function object, used to assign an object , which then be assigned as prototype.

REWINE and reunderstand, whats missing... if something IMPORANT.
Planning : Declutter and Plan for AHEAD.
*/
console.log(Person.toString());
console.log(Person.__proto__.toString())

console.log(Person.prototype)
console.log(typeof Person.__proto__)
// constructor function ka connected prototype is function , whose further connecte prototype is Object then null 
console.log(typeof Person.__proto__.__proto__, typeof Person.__proto__.__proto__.__proto__, typeof null)
const k1 = null;
console.log(typeof k1, typeof undefined)
// k1.forEach(key => console.log(key))



/* 


MAX summary : Prototypes - Summary
Prototypes can be a confusing and tricky topic - that's why it's important to really understand them.

A prototype is an object (let's call it "P") that is linked to another object (let's call it "O") - it (the prototype object) kind of acts 
as a "fallback object" to which the other object ("O") can reach out if you try to work with a property or method that's not defined 
on the object ("O") itself.

EVERY object in JavaScript by default has such a fallback object (i.e. a prototype object) - more on that in the next lectures.

It can be especially confusing when we look at how you configure the prototype objects for "to be created" objects based on constructor 
functions (that is done via the .prototype property of the constructor function object).

Consider this example:

function User() {
    ... // some logic, doesn't matter => configures which properties etc. user objects will have
}
User.prototype = { age: 30 }; // sets prototype object for "to be created" user objects, NOT for User function object
The User function here also has a prototype object of course (i.e. a connected fallback object) - but that is NOT the object the 
prototype property points at. Instead, you access the connected fallback/ prototype object via the special _proto_ property which 
EVERY object (remember, functions are objects) has.

The prototype property does something different: It sets the prototype object, which new objects created with this User constructor 
function will have.

That means:

const userA = new User();
userA._proto_ === User.prototype; // true
userA._proto_ === User._proto_ // false
*/