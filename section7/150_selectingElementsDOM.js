// we dont need symbol along with id in getEbId  
console.dir(document.getElementById('myTitle'))

const h1 = document.getElementById('myTitle');
// if to search in childs of this 
let insideH1 = h1.querySelector('p');

// old but used
let listItems = document.getElementsByClassName('list-item');  // array like, for loop works



let firstTitle = document.querySelector('.list-item'); // myTitle 
let allTitles = document.querySelectorAll('.list-item');

// can be complex selector  
let firstListItem = document.querySelector('ul li:first-of-type');


// 2. instead of reloading, modifying portion of DOM is what helpful here.
// use variety of css selectors
// div p (for p inside div)
// div.class1 p.class2 (div with class1 , containing ; p with class class2) 