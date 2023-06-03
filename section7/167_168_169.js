// 1. removal 
let ul = document.querySelector('ul');
let li = document.querySelector('li');
// 1.  removes dom node (universal exc IE)
// ul.remove();

// 2. khudke parent se khudko remove 
// li.parentElement.removeChild(li); // IE too 

// 3. innertHTML 
li.innerHTML = '';



// 168 inserttion and removal
// sbme supported
// appendChild, insertAdjacentElement, replaceChild, removeChild

// kuch browser eg IE me nahi :
// append, prepend, before, after, replaceWith, remove

// 169 summary  docs 

