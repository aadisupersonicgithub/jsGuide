const lis1 = document.querySelectorAll('li');
console.dir(lis1);

const lis2 = document.getElementsByTagName('li');
console.dir(lis2);

// lis1 is static nodeList (ie even if its some elem delete, it wont reflect)

// static hai to removal ka koi nahi farq padega (to reflect this chagne, call querySelector again)
for (const el of lis1) {
    console.dir(el);
    el.remove();
}

// live hai to element hata to oopar ki query me apne app reflect 
for (const el of lis2) {
    console.dir(el);
    el.remove();

}

console.log("lis1: ", lis1.length, " and lis2 : ", lis2.length);


const body = document.body;
// TIP: now on body instead of HTml, do similar dom manipulation
document.head.textContent = 'Assignment - Solved!'
