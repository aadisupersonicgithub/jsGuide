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
function taxCalcu(tax) {
    function getVat(amt) {
        return amt * tax;
        // have access to tax and everything outside this function 
    }
    return getVat;
}
const companyTax = taxCalcu(15);
const personalTax = taxCalcu(20);

console.log(companyTax(100));
console.log(companyTax(200));
console.log(personalTax(100))
console.log(personalTax(200))