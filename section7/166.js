const li = document.createElement('li');
// Cloning : deep?true -> saare childs bhi copied of all nesting o/w not 
const li3 = li.cloneNode(true);
li3.textContent = "power3"
// ul.lastElementChild.after(li3, li2, li)   // WORKS 


// live vs static node list

// query wale not update if any element add/remove EventCounts,
// but get wale does (ie live list) 

let ul = document.querySelector('ul');
let lis1 = document.querySelectorAll('li');
let lis2 = document.getElementsByTagName('li');


console.log(lis1.length, lis2.length);
ul.append(li3);
console.log(lis1.length, lis2.length);
