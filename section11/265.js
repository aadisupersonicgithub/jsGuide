/*  
* 1a. BehindTS of Classes/Objects (as class keyword recent, understand legacy)
* 1b. Constructor function (ie without 'class' keyword) to understand core
* 1c. Prototypes/Prototypical Inheritance (ie extends keyword) 


* 1d. same behave, kinda alternate of Class is 'constructor function standalone' , different from constructor in Class we saw 
* 1e. currently funs are as properties, later we see how to make that distinct too 

*/

// class Person {
//     name = 'aadi';
//     constructor() {
//         this.age = 23;
//     }
//     greet() {
//         console.log("Hi, I am ", this.name + " and i am " + this.age + ' years old !!')
//     }
// }

function Person() {
    this.name = 'aadi';
    this.age = 23;
    this.greet = function () {
        console.log("Hi, I am ", this.name + " and i am " + this.age + ' years old !!')
    }
}


/* 
* 2a. Person = person any object name is fine.
* 2b 'new' keyword is backbone here, behind scenes 
* 2c. 1. sets this = object created  2. sets properteies etc 3. returns that objects  
* 2d. class = sugarcoating of constructor function, to keep it simple and intuitive 
* 2e. classes also helps with prototypes. 
* 2f. NOTE: methods eg greet created in class, are treated differently than properties as 1e


* Prototypes 
* JS use 'prototypical inheritance'  => class syntax is syntactic sugar => constructorFun & prototypes power JS objects     
* function Person(){}  
---default prototype--->         
        Person.prototype  ({...})       
----constuctor prototype is assigned to class instance upon creation--->    
        class Person{} aadi = new Person()

* why prototypes needed ? 
    To share code, 
    its connected object to normal object, which is used as fallback object (if normal object dont have it)
    in prototypes , can also have prototypes 
    for any level of object, its fallback upto its prototype dont become null

    * __proto__ : property to set values 

* PrototypeChain :  obj -> obj.prototype -> obj.prototype.prototype -> null 
* every obj 1 inbuilt prototype, even if we dont assign it
* baseClass > connected object

* __proto__ always present in object , either created via new constructor, array , class object etc 
* prototype => dont exist on every object, only exist on function object 
* Person.prototype refers to the FutureLinkedObject of (objects yet to be created eg aadi) 
* aadi.__proto__ shows already linked object to aadi 

*/



// this is what 'extend' keywords implicitly
// Person.prototype = {
//     say() {
//         console.log("say my name", this.name);
//     }
// }
// const aadi = new Person();

// console.log("=> ", aadi.__proto__ === Person.prototype)
// console.log(aadi.__proto__ === Person.__proto__);
// console.log(aadi.__proto__.__proto__ === Person.__proto__)
// aadi.greet();
// console.log(aadi.__proto__ === Person.prototype)
// console.log(aadi.prototype)
// console.log(aadi.__proto__)
// aadi.say()
// // class Power {
// //     name = 'aadi'
// // }
// // const aadi2 = new Power();
// // console.log(aadi2)

// class c1 {
//     constructor() { }
//     f1() { }
// }
// class c2 extends c1 {
//     constructor() { super() }
//     f2() { }
// }
// const p1 = new c1();
// const p2 = new c2();
// c2.prototype = {
//     f3() {

//     }
// }
// const p3 = new c2();

// console.log(p1.___proto__, p2.__proto__, p3.__proto__) 


/* 

===========================================================================================================
understand 1. what extends do explicity 2. what is function direct and function being in prototype means 
prototypes are kinda implementation of INHERITance ... from js beginning itself

prototype is property of functionObject aka constructorFunction ONLY , ie NOT defined in function body like usual 
ONLY means, prototype is not present in object which are created by any other means ...eg class c1{} new c1()

hr constructorFunction pe hoti prototype property by default (not object)
object ko yahi function wali assign hoti default jaise hi wo create hota 

jaroorat of prototype : taaki code share kr ske ie inheritance bana ske (like extends keyword ki behindTS )
prototype objects : jaise fallback object smjho, agar actual object me nahi mila koi prop/functin, 
to wo isme aake check krega ki isme hai ya nahi 

every object have prototype in js 
prototype is just another object 
YES <3, prototypes can have their prototypes further , wahi prootype chain bolte
if chain mee nhi mila to , propertyp -=> UNDEFINED , function -> ERROR 

__proto___ tells the baseclass/baseObject property kinda 

if have some construterFun/Class on which created object eg const p = new Person; // Person is constructFun / class fine both 
if some method not present in it, it calls p.breate() -> p.__proto__.breathe() -> p.__proto__.__proto__.breathe() until reaches NULL 




2. 
any js fun in end is object



*/
const aadi = new Person();
console.log(aadi.__proto__ === aadi.prototype)      // false 
console.log(aadi.__proto__ === Person.prototype)    // true 




/* 


let k1 = {
    n1: "n1"
};
// console.log(k1.prototype)
console.dir(Object)

let k2 = {
    // n1: "n1 twice",
    n2: "n2"
}
k2.__proto__ = k1;
console.log(k2.n1);


console.log(k1.__proto__ == Object.prototype)
console.log(k1.__proto__.__proto__, Object.prototype)

// function Object() {
//     boom: 2
// };
// const o1 = new Object();
// console.log(o1, o1.__proto__, o1.__proto__.__proto__ == Object.prototype)
// console.log(k2.boom)

*/