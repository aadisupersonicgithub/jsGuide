// 0. EARLIER SPREAD operator : was used in object / array to copy existing keys/elemenets.
// 1.REST related to function, if not known how many argumetns coming.. eg add(2), add(3, 4), add(9, 0, 0, 0); NEVER RELY ON HOPE.

// can use array 
const add = (ar) => {
    let ans = 0;
    for (const el of ar) {
        ans += el;
    }
    return ans;
}
// console.log(add([2, 4, -3, 5, 0, 11, -17]))

// 2. Traditional Not Scalable 

// const add2 = (a, b, c, d, e) => { 
//     return a + b + c + d + e;
// }


// const add2 = (...c, a, b) => { // ERRROR
const add2 = (a, b, ...c) => { // ERRROR
    let ar = 0
    for (const e of c) {
        ar += e;
    }

    // return a + b + ar;
    return ar;
}

// const add3 = () => {
function add3() {
    let ar = 0;
    for (const el of arguments) {
        ar -= el;
    }
    return ar;
}
console.log(add2(4, 6, 7, 0, -2, 8))
console.log(add3(4, 6, 7, 0, -2, 8))

//3. Rest operator must be last element o/w error
// 4. Dont use, Builtin array like `arguments` which contains, even without passing rest, we can use.NOTE: [not in arrow(/functionExpression), but function declartion]
