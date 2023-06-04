// 201 split, join [string methods not array , but converts into array to useful to know] 
// eg data from excel 
const data = 'new york;10.99;2000';
const transformedData = data.split(';'); // space, comma, semicolon, colon any separator is fine 
console.log(transformedData);

const nameFragments = ['aadi', 'baba']; // merge eg fetched from ui 2 places 
const actualName = nameFragments.join(); // convert to string even if number 
console.log(actualName);

const numArgs = [2, 4, 3, 5, 1, 6];
const actualNumber = numArgs.join();
console.log(actualNumber, typeof actualNumber);



// 202 spread operator : pulls out array and give to array ie comma separate elemebts 

// cant use raw, cant assign to constants eg ...nameFragments, 

const nameFragments_ = [...nameFragments];
nameFragments.push(2);
console.log(nameFragments, nameFragments_);

console.log(Math.min(1, 17, -4), Math.min(numArgs), Math.min(...numArgs));

// note new elemnts are not copied, but the existing elements which got copied are copied by address so any change in that will appear 

const a2 = [{ age: 2 }, 4];
const a2Copy = [...a2];
a2.push(3); // wont reflect 
a2[0].age++; // reflect in both 
console.log(a2, a2Copy) // aka SHALLOw COPY (not deep copy)

const b2 = [{ age: 2 }, { age: 4, hobbies: ['chess', 'cp'] }];
const b2Copy = [...b2.map(el => ({ age: el.age, hobbies: el.hobbies ? el.hobbies : null }))]; // this will FAIL too if again array or object in that property again ... 
b2[0].age++;
b2.push({ age: 6 });
b2[1].hobbies.push('power');
b2[1].hobbies.push('powerx'); // reflect in both , do again map for that key as well 
console.log(b2, b2Copy)


// 203. array destructuring 
const fullName = ['aadi', 'upadhyay', 'kingmaker'];
// const firstName = fullName[0];
// const lastName = fullName[1];
const [firstName, lastName, ...otherInfo] = fullName; // left to right read 
console.log(firstName, lastName, otherInfo);


// 204. maps and sets
// 3 major iterables : arrays(objects), sets, maps
// arrya : nested data of any kind/length .... iterable + lots of methods ... order fix , duplicates allow, 0 based index
// sets : same .... iterable , special methods  .... order not fix , duplicates NOT allowed, no index access
// maps  any kinda key/value both  ...... iterable, speical methods .... order sorted fix, duplicate not allowed, key based access 
// when and how , ahead 

// 205 sets : add, delete, has, values, entries UNIQUE 
// const ids = new Set(); // [] or something NOT available, must way to create set 
const ids = new Set([1, 2, 3]) // pass any iterable array/nodelist etc 
// ids[1] dont work 
ids.add(2);
console.log(ids.has(2)) // data storage logN if present or not 
// ids.entries => returns iterable 
for (const el of ids.entries()) { // use values for once, it gives 2 to be consistent with maps 
    console.log(el);
}
ids.delete(2); // ignore if not present
for (const el of ids.values()) { // ids.values() yields all seet values ONCE
    console.log(el)
}

// usecase track ids or unique kinda values in sets (o/w arrays best)


// 206 maps 
const p1 = { name: "aadi" };
const p2 = { name: "sha" };
// linking 2 related info 
const personData = new Map([[p1, { date: "23/4", price: 234 }]]); // array of array(key/value) any kind to any kind 
personData.set(p2, "23");
console.log(personData, personData.get(p1))

// printing 3 ways 
// A. 
for (const el of personData.entries()) {
    console.log(el)
}
// arrray destructruing 
for (const [key, value] of personData.entries()) {
    console.log(key, "=>", value)
}
// get keys only 
for (const key of personData.keys()) {
    console.log(key);
}
for (const values of personData.values()) {
    console.log(values)
}
/// clear : delete all keys , delete : deletes 1 key , has -> check if key present , size -> count of keys 
// press dot on any object and see suggestion methods 



// 207 maps vs objects 
// in maps : use any values (and types) as keys                      in objects : only use strings , numbeer, Symbols  ... 
// in maps : better performing for large data                       only for small/medium size data (eg upto 100)
// 98% arrays and objects 


// 208 weakset vs weakmap 

// release memory automatic if not using anymore 

let me = { name: 'aadi' }
let god = new WeakSet(); // cant pass number/string, but objects 
god.add(me);

console.log(god)
me = null; // if key is null, weakset will garbage clear [but not clear in map/sets]
console.log(god)
// browser does garbage collection but not immediate 



// 209 weakmap 

let you = { name: "tate" };
const semiGod = new WeakMap();
semiGod.set(you, "extra info");
console.log(semiGod)
you = null;
// weakmap, weakset, very advanced thing, rarely use on big scale maybe



let sc = [2, 3, 5, 10, -4, -3];

const sc1 = sc.filter(e => e <= 5);
console.log(sc1);
const sc2 = sc1.map(e => ({ marks: e }));
console.log(sc2)
const sc3 = sc2.reduce((a, e) => a * e.marks, 1);
console.log(sc3)

function findMax(u) {
    console.log(u)
    u.sort((a, b) => {
        if (a > b) return 1;
        else if (a == b) return 0;
        else return -1;
    })
    // return u[u.length - 1];
    return [u[0], u[u.length - 1]]
}
console.log(findMax(sc))
const [mn, mx] = findMax(sc);
console.log(mn, mx);

const ar = {
    val: [],
    add: function (x) {
        if (!this.val.includes(x)) {
            this.val.push(x);
        }
    }
}
console.log(ar.val)
ar.add(2);
ar.add(2);
ar.add(2);
ar.add(4);
ar.add(3);
console.log(ar.val)

const st = new Set();
st.add(3);
// st.add(4);
if (!st.has(4)) {
    st.add(5);
}
st.delete(5);
console.log(st.size)
// st.clear();
for (const [key, values] of st.entries()) {
    console.log(key, values)
}