// take parent , use traversal to select elements 
const ul = document.querySelector('ul')
console.dir(ul);
console.log(ul.chilren)
// ul.children -> HtmlColection (no text nodes, genuine tags)
// ul.childNodes -> NodeList (text nodes etc)

// Note: whiteSpace: pre -> renders hidden (before/after whitespaces which dont get rendered by default)


// firstChild -> childNodes[0] , firstElementChild -> children[0]

