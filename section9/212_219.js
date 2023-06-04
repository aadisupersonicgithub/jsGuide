console.log("welcome")

const movieList = document.querySelector('#movie-list')

// movieList.style.backgroundColor = 'red';
// movieList.style[backgroundColor] = 'red';  NOT work as backgroundColor variable not found 
// movieList.style['backgroundColor'] = 'red'; // WORKS as translated keys present 
movieList.style['background-color'] = 'red';

movieList.style.display = 'block';

// mostly real life usecases are objects and relatable
// dom, movie etc mostly are objects 
// symbol, undefined, null, number, string : primitve 
// everything else : reference type 

const userChosenKey = 'level';
const person = {
    [userChosenKey]: 'god',
    'first name': "aadi",
    age: 23,
    hobbies: ['hacking', 'cp'],
    greet: function () {
        alert("hi there");
    },
    5: "23",
    1.5: 'numbersAsKeyWoah not negative number'
};
// 216, adding modiyfing, deleting properties 
// person.greet() 
person.isAdmin = true; // 1 adding 
person.age = 24; // 2 modify  

delete person.greet;
/* 
delete keyword se like above  // 3a 
person.greet = undefined; // 3b 
person.greet = null; // 3c 

properties be there if null, delete removes the key as well 
null -> reset , its clear that its there 
undefined -> there, but does not matter anymore 
*/

console.log(person)
// objects keys are inbuilt keys behind the scenes string only...

// special keys properties 
console.log(person['first name-king'])
// NOTE: keys Always Sorted If Numbers as keys Otherwise Insertion Order
console.log(person[1.5], person['1.5'], person[5])

// 218 property types and orders 
let keyType = 'first name';
/* 
NOTE 
person.keyType wont work as keyType key is not present 
person['keyType'] WONT work equal to above one 
person[keyType] it will work 
 */
console.log(person[keyType], person['keyType'], person.keyType)
console.log(person.level, person['level'], person[userChosenKey])
