console.log("aadi")
// revisit mdn wrap up pages of modules to get links for mdns and explroe em

/*
1. pure function and side effects
2. factory functions
3. closures (& scope revisited)
4. recursion
 */

// pure fun : same input pe same output, dont change anything outside fun

// impure : adding any side effects (eg http request, storing in db, or trivial like changing varible outside function)

// pure 
const add = (n1, n2) => {
    return n1 + n2;
}

// impure 
const randomAdd = (n1) => {
    return n1 + Math.random(); // same i/p diff o/p 
}

let prev = 0;
// impure 
const addMore = (n1, n2) => {
    prev += n1 + n2; // changing outside 
    return n1 + n2;
}

// impure 
const hobbies = ['a', 'b', 'c']
const printHobbies = () => {
    hobbies.push(Math.random());
    console.log(hobbies)
}

console.log(add(2, 3))
console.log(add(2, 3))
console.log(randomAdd(2));
console.log(randomAdd(2));

printHobbies();
printHobbies();
printHobbies();
// try having more pure 

// name says its side effects ie fine 
function sendDataToServer() {

}

// factory function : function producing function 

function taxCal(tax, amt) {
    return tax * amt;
}

let multiplier = 1.2;
function taxCalcu(tax) {
    console.log(tax);
    console.log(multiplier)

    function getVat(amt) {
        return amt * tax * multiplier;
        // have access to tax and everything outside this function 
    }
    return getVat;
}

const companyTax = taxCalcu(15);
// console.log("Closure: ", companyTax.__closure__);
// console.log("Script values: ", companyTax.__script__);

const personalTax = taxCalcu(20);


console.log(companyTax(100));
console.log(companyTax(200));
console.log(personalTax(300))
console.log(personalTax(400))

multiplier = 2.3;

console.log(companyTax(500));
console.log(companyTax(600));
console.log(personalTax(700))
console.log(personalTax(800))

// closures ..related to scope (like variables) for functions
// inner function can access , outer function variables and global variables
// outer function cant access inner function variables, but can access global variables
// diff lexical environment of each (in these env constants declared)

// inner functions CREATED FIRST TIME , when outer function calls ..also locks in values of outer function variables in insideFunction's lexical env
// note : dont lock any global value, ie common for all functions if global value change then recall that function only then that value change

// How to get events etc in debugger; chromeDevTools / vscode

// CLOSURE: becz function registers surrounding env values 

let user = 'aadi';
function greet() {
    console.log("Hi ", user);
    let _user = user;
    console.log("Hi ", _user);
}
greet();
user = 'a adi2'; // Global values not locked 

greet();


const k3 = 323;
(
    function () {
        console.log(k3);
        var age = 30;
        console.log(age); // 30
        function k2() {
            var age2 = 32;
            console.log(age2);
        }
        // console.log(age2);
    })()

// console.log(age)

// REVISE IIFE ... basically var (function scope)
// (let/const) ALTERNATIVE use { // any piece of code as block scope } 


// Recursion  TIP: use debugger to analyze values eg if finding some shadowroot and stuff which is recursive to print that 


function power(x, n) {
    if (n == 1) {
        return x;
    }

    return x * power(x, n - 1);
    // return n == 1 ? x : x * power(x, n - 1)
}
console.log(power(2, 4));

const myself = {
    name: 'aadi',
    friends: [
        {
            name: 'shantanu',
            friends: []
        },
        {
            name: 'nikhil',
            friends: [
                { name: 'adarsh', friends: [] },
                { name: 'abhinav', friends: [] }
            ]
        }

    ]
};
// now for loop wont help to iterate ie recursion  eg folder structure 
console.log(myself)

function showList(who) {
    if (JSON.stringify(who) === "{}") {
        return;
    }
    for (var key in who) {
        if (key === 'name') {
            console.log("myself : ", who[key]);
        } else if (key === 'friends') {
            // console.log("my friends are ...")
            for (var el of who[key]) {
                showList(el);
            }
        }
    }
}
// use debugger, and exit condition proper to understand better 
showList(myself)


// Mod16
// number: float default, 64bit(1bit sign, 1bit for .)  ie limit to numbers (not more than that in number and after decimal precision too)
console.log(Number.MAX_SAFE_INTEGER);

console.log(Math.pow(2, 53) - 1)
console.log(Math.pow(2, 53))
console.log(Math.pow(2, 53) + 1)

console.log(Number.MIN_SAFE_INTEGER);

console.log(Number.MAX_VALUE); // decimal 

console.log(0.2 + 0.4)
console.log(0.2 + 0.4 === 0.6); // works in binary , so false  
console.log((5).toString(2));
console.log((5).toString(10));
console.log(0.2.toString(2));
console.log((0.2).toString(2));
console.log((0.2234234).toFixed(3)); // show only that deciamls 

console.log((20.2).toFixed(20)) // still not precise ie amazon etc issue , use js librbary or handle on serverside (using some package etc)

// BigInt 
console.log((9230234234903284092349083240982349234232342342340).toFixed(34))
console.log(923023423490328409234908324098234923423234234234n)
// console.log(4n + 2) 
const k = parseInt(4n) + 2;
console.log(k)
console.log(10n - BigInt(4))
console.log(5n / 2n); // 2n ...NO decimal in bigInts 

// Number and Math [explore later when needed, just know it exists]

console.log(Number.POSITIVE_INFINITY)
console.log(Number.NEGATIVE_INFINITY)
console.log(5 / 0)
if (isFinite(5 / 0)) {

} else {
    console.log("its inifite buddy")
}
console.log(Math.PI)
console.log(Math.sqrt(2));
console.log(Math.sin(Math.PI / 6))
console.clear()
console.log(Math.random()); // expolore MDN and explore suggestions . use Math mostly (no need for pretty much any major math logic)


console.log(Math.random()) // [0, 1]  
function genBw(a, b) {
    // return Math.min(a, b) + (Math.max(a, b) - Math.min(a, b)) * Math.random(); 
    if (a < b) { let tmp = b; b = a; a = tmp; }
    return Math.floor(b + (a - b + 1) * Math.random());
}
console.log(genBw(3, 35).toFixed(0))

console.log(`${1}`)
console.log('aadi'.toUpperCase());
console.log('aadi'.startsWith('aadi')); // explore MDN 

function prt(strings, productName, productFixed) {
    return `This is a project`
}

const prod = prt`oye`
console.log(prod)

// TODO;  revise tagged templates

let userInput = 'aadisupersonic'
let reg = /^\S+@\S+\.\S+$/;
console.log(reg.test(userInput))

// 345 
let r1 = new RegExp("power");
const r2 = /power/
console.log(r1, r2, r1 == r2)
console.log(r2.test('hi there, are you aadi or not, aadi i mean power'))

// regex case sensistive defaulrt .. to avoid /(h|H)ello/  (PIPING) 
r1 = /.adi/; // ignore 1st char 

// escape in regex 

const emailReg = /^\S+@\S+\.\S+$/;
// regex rare use, just know exist and find email/url regex on google and use

// exec to find index 
console.log(r2.exec('oye power'));

// Tagged template  styled.div``

