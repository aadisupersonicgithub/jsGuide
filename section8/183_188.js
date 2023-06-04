// arrays and iterables 

// 183, 184, 185 
// creating, working with, imp methods , maps/sets (iterables)
// array, iterables, arrayLike are 3 diff concepts

// creating 
const a1 = [1];
const a4 = ['hi'];

const a2 = Array(1);
const a5 = Array('hi');

const a3 = new Array(1);
const a6 = new Array("hi");

const a7 = Array.of(1);
const a8 = Array.of('hi');

const a9 = Array.from('hi')
const aa = Array.from(1);

console.log(a1, a2, a3, a4, a5, a6, a7, a8, a9, aa);

const ar1 = [1, 2, 3];
const ar2 = new Array(); // []
const ar3 = new Array(1, "hi");[1, "hi"]

console.log(ar1, ar2, ar3);

const ar4 = new Array(5); // STRANGE not equals [5], rather size 5 array with [empty * 5]
const ar5 = new Array(5, 6); // [5, 6]
// NOTE: ```new``` is OPTIONAL (may be differ in advanced usecases)

const ar4_ = Array(5); // [5 * empty]
const ar5_ = Array(5, 6); // [5, 6]

// of : slow 
const ar6 = Array.of(1, 2); // [1, 2]
const ar7 = Array.of(5); // [5]
console.log(ar4_, ar5_, ar6, ar7)


//  NOTE, of, new, Array [very niche cases where dynamic arrays etc needs this] o/w good

// const ar8 = Array.from(2, 2);// ERROR  
const ar9 = Array.from([1, 2, 3]); // works, but not needed 
const ar9_ = Array.from("Hi!"); // ['h', 'i', '!']
console.log(ar9, ar9_)

// IMP pass dom nodes array into real array with this ARray.from method, as thats Array like ohbject 
const myList = document.querySelector('#myList').children;
console.log(myList, Array.from(myList))

// Summary : use standard [], and Array.from to convert array like to array.



// 186 what to store (numbers, strings, object, mixed of above)
const hobbies = ['cricket', 'chess', 'coding'];
const personalData = [24, 'aadi', { moreDetails: [] }];

const analyticsData = [[1, 1.6], [-5.4, 2.1]];
for (const data of analyticsData) {
    for (const dataPoints of data) {
        console.log(dataPoints);
    }
}
// cut short : mix anything, ie flexible
// 0 based indexing , maxIndex = length - 1
// push, pop, shift, unshift , boi[n + 5] 

const boi = [2, 3, 6, 8];
boi.push(9);
boi.push(10);
const x = boi.pop();
const y = boi.shift();
// x, y optional ie returned value if dont store, not an issue 
boi.unshift(1);
console.log(boi);
console.log(x, y)
// push, pop o1. shift/unshift o(n) 

// if to vary at specific index 
boi[2] = "god";
console.log(boi)
boi[10] = "wtf"; // leftout will be filled 'Empty' eg 
// boi -> [1, 3, 'god', 8, 9, empty * 5, 'wtf']
// boi[8] -> undefined

console.clear()
// 188 splice : only on arrays (not arrayLike , iterables) use Array.from becomes useful now on arrayLikes etc to use this
// ie start from 2nd index (remove 12 (can be 0 or >n OR whole suffix if not given) elements) and baaki args ko 2nd arg se hi add krdo 
console.log(boi)
boi.splice(2, 12, 44, 12, 9, "power"); // start, count, replaceWith 
// negative indexing works 
console.log(boi)
boi.splice(-1, 4); // removes last 2 elements (-1 just to specify index, delete to right se hi krega)
console.log(boi)
// NOTE negative indexing worrks for splice and couple of other methods (but not on arrays to access)












