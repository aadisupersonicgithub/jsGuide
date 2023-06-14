/* class base2 {
    sayHello2() {
        console.log("hello")
    }
}
class Person2 {
    name = 'aadi';
    constructor() {
        // super()
        this.age = 23;
    }
    greet() {
        console.log("Hi, I am ", this.name + " and i am " + this.age + ' years old !!')
    }
}
Person2.prototype = base2; // what else .. alternate to super()+prototypical , so that sayHello2 appear in c2 
 */

class base2 {
    sayHello2() {
        console.log("hello")
    }
}
class Person2 extends base2 {
    name = 'aadi';
    constructor() {
        super()
        this.age = 23;
    }
    greet() {
        console.log("Hi, I am ", this.name + " and i am " + this.age + ' years old !!')
    }
}


const c2 = new Person2();
console.log(c2)
console.log("c2 __proto__", c2.__proto__)

function Person() {
    this.name = 'aadi';
    this.age = 23;
    this.greet = function () {
        console.log("Hi, I am ", this.name + " and i am " + this.age + ' years old !!')
    }
}


const p = new Person();
Person.prototype.sayHello = () => {
    console.log("hi aadi");
};

// DONT do this , as its overwriting, previous is adding 1 dynamic property 
/* Person.prototype = {
    sayHello() {
        console.log("hi aadi")
    }
}
 */
// console.log(Person.prototype.constructor === Person); // true
// console.log(p.__proto__ == Person.prototype) // true 

console.log(p)
// Just remember, classes add functions in prototype directly, while constructor function addd at object itself (not 1 layer deep ie prototype)

console.log("super creates an object of parent class, and set that as prototypal object of child class")


class Person3 {
    name = 'aadi';
    constructor() {
        this.age = 23;
    }
    greet() {
        console.log("Hi, I am ", this.name + " and i am " + this.age + ' years old !!')
    }
}
const p3 = new Person3();
console.log(p3.__proto__, " also p3 : ", p3)

const p3se = new p3.__proto__.constructor(); // new object of person, without using new Person3()
console.log(p3se)
console.log(p3se === p3)

// builtin constructor : Object
// static methods is like Person.myFun = ()=>{} ... wont affect inheritance , wont be available to object (only to class)

