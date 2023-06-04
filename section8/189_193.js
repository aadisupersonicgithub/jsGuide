const boi = [1, 2.4, -3.4, 100, { a: 2 }];
const boiDeepCopy = boi.slice(); // to avoid changing the earlier array if changed this.
const boiRef = boi;
console.log(boi, boiDeepCopy, boi === boiDeepCopy, boi == boiDeepCopy)
console.log(boi, boiRef, boi === boiRef, boi == boiRef)
const boi3 = boi.slice(3, 4); // a[3] 
// slice(3, 2) nothing 
// slice(-3, 2)
console.log(boi3)
// IMP slice(st, en) => st, (en + n)%n => [st, en_)  if st < en_ then fine o/w empty 
const boi4 = boi.slice(2, -1);
console.log(boi4)

// 190 copy of merged arrays ; CONCAT 
const a1 = [2, 3, 4, 2, 2, 5, 24];
const a2 = a1.concat([5, 6]);
a1.push(7);
console.log(a1, a2); // 7 wont be in a2, a2 wiill be merge of a1 snapshot and its own stuff ie 5, 6


// 191 indexOf, lastIndexOf 
console.log(a1.indexOf(2), a1.lastIndexOf(2));

// TODO: find all occ of 2 ? 
// let b1 = a1.slice();
// console.log("b1 length : ", b1)
// let id = -2;
// while (b1.length > 0) {
//     if (id == -2) id++;
//     b1 = b1.splice(id + 1);
//     let nxt = b1.indexOf(2);
//     console.log("nxt of 2 : ", nxt)
//     if (nxt == -1) break;
//     id = nxt + 1;
// }


const persons = [{ name: "sam" }, { name: "tom" }]
const tom = persons.indexOf({ name: "tom" }); // dont work if searching object 
// as {a: 2} == {a: 2} false 
console.log(tom) // -1 


// 192 index ELEMENT_MATCHED, findIndex INDEX_MATCHED

//1 find takes cb, js calls that cb 
const tom2 = persons.find((person, idx, persons) => {
    console.log(person, idx, persons) // return true for found data 
    return person.name === 'tom'; // only 1st occ
    // NOTE 2. comparing objects have issues, primitive values comparing is fine  
})
// NOTE 3. it returns ref element, not copy, if changed will be changed in array too 
console.log(tom2)
tom2.name = "carry";

console.log(tom2, persons)

// 4. for index 
const tom2Index = persons.findIndex((person, idx, persons) => {
    console.log(person, idx, persons) // return true for found data 
    return person.name === 'sam'; // only 1st occ
    // NOTE 2. comparing objects have issues, primitive values comparing is fine  
})
console.log(tom2Index)

// 5. includes: neither index nor value, just want to know if its present or not boolean 
console.log(a1.includes(5), a1.includes(50))