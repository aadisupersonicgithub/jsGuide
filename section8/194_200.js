console.log('aadi')
// 194 forEAch 
const price = [100, 50, 90, 243, 23];
console.log(price.reverse()); // no arg, simply reverse

const tax = 0.19;
const finalPrice = [];

// TYPE 1 
for (const el of price) {
    // index not avail 
    finalPrice.push(el * (1 + tax))
}
console.log(finalPrice)


// TYPE2 
const _finalPrices = [];
price.forEach((price, idx, prices) => {
    // forEahc provides index (value, index, array) 
    const priceObj = { id: idx, price }; // idx is extra adv in forEach > forOf 
    _finalPrices.push(priceObj);
})
console.log(_finalPrices);


// TYPE 3 
// 195  map 
// converting array to another, without need of initializing another array  

// new copy of array with modification  
const finalPrices2 = price.map((price, idx, prices) => {
    const priceObj = { id: idx, price };
    return priceObj;
})
console.log("finalPrices2: ", finalPrices2);

const sortedPrice = price.sort(); // default convert to string then compare strings 10>3 BUT "10"<"3"
console.log(sortedPrice)
// comparator 
const properSortedPrice = price.sort((a, b) => {
    if (a > b) {
        return 1;
    } else if (a == b) {
        return 0;
    } else {
        return -1;
    }
})
// swap -1 , 1 for reverse sort (ie desc sort)
console.log(properSortedPrice)


console.log(price.reverse());



// 197 filter 

// cb is similar to find, map 
const filteredPrice = price.filter((el, idx) => {
    return el > 95; // elements than 95 will be kept, o/w dropped 
})
console.log(filteredPrice)

// 198 shiniging arrow
const filteredPrice2 = price.filter(el => el > 95)
console.log(filteredPrice2);

// 199 reduce 
// let sm = 0;
// price.forEach(e => {
//     sm += e
// });
// console.log(sm);

// const sm = price.reduce((prevVal, curVal, curIdx, price) => {}, init);
// reduce array to single array/string 

// const sm = price.reduce((a, e) => a + e, 0);
const sm = price.reduce((a, e, idx, price) => {
    console.log(a, e, idx, price); // pipeline a is like sm's all states, 2nd arg is like sm's initial state 
    return a + e
}, 0);

console.log("reduce: ", sm)

// map, reduce 

const c1 = [{ p: 1 }, { p: 2 }]
const c1map = c1.map(e => e.p);
console.log(c1map)
const c1mapreduce = c1map.reduce((a, e) => a + e, 100);
console.log(c1mapreduce); //103 

//  skip map 
const c1Reduce = c1.reduce((a, e) => a + e.p, 0);
console.log(c1Reduce)

// CHAINING: or just chain map and reduce as it returns array , ie dont use constant as not used anywhere else 
const c1reduce_ = c1.map(e => e.p).reduce((a, e) => a + e, 0);
console.log(c1reduce_);
