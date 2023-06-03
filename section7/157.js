// parentNode, parentElement
// both works same
// textNode bhi ok
// document.documentElement.parentElement = null
// document.documentElement.parentNode = document
// liFirst.closest('body') gives Body node dom access
// liFirst.closest('body ul') gives ul node dom access
// liFirst.closes('header') NULL (as its not in ancestor chain, rather sibling of its parent)
const liFirst = document.querySelector('li');


