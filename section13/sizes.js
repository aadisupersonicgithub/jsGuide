const home = document.getElementById('main-box');
console.log(home.getBoundingClientRect())

// offset considers  border/scroll 
console.log(home.offsetTop)
console.log(home.offsetLeft)

// offset ignores border/scroll 
console.log(home.clientLeft)
console.log(home.clientTop)

console.log(home.offsetWidth)
console.log(home.offsetHeight)

console.log(home.clientHeight)
console.log(home.clientWidth)

console.log(home.scrollHeight)
console.log(home.scrollTop)



// offset is always relative to your document start, not to the viewport(ie it does not change upon scrolling)


// wont subtract the scroll bar 
console.log(window.innerHeight);
console.log(window.innerWidth);

// to get only content width , height 
console.log(document.documentElement.clientWidth);
console.log(document.documentElement.clientHeight);


/* 
 * Refer Image 
 * Edgecase: Resize page, resize viewport etc for better understanding
 * Rewatch lecture when needed 
 * Refer some YT tutorial to udnerstand better 
 * Refer MDN docs.
 * Explore HTMLElement and how HTMLInputElement, Node etc inherits other methods, playaround. 
 * 
 */