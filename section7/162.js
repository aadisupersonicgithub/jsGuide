const ul = document.querySelector('ul');
ul.innerHTML = ul.innerHTML + "<li> item 4 </li>";
// cons : it rerenders entire list elements (ie performance issue later and not efficient ofc)
// cons2 : if any input Value , ie will be lost due to rerendering.

const myDiv = document.querySelector('div');
// will be inside some callback etc to see its effect visible to us o/wbfast
myDiv.innerHTML += '<p> something went wrong </p>';


// beforebegin <H1> afterbegin <p></p> beforeend </H1> afterend 
myDiv.insertAdjacentHTML('beforebegin', "<p> beforebegin of myDiv </p>")

// cons1 : if added, to reaccess, do querySelector (as DOM nodes not altered only html) so 2 steps instead of 1
// soln : 1 step ie createElement

// createElement : always called on document (not any other dom object/node)

// customElement, only 1 arg ie tag {is: } very advanced topic 
const myItem = document.createElement('li');
// have not been inserted in UI, have no content so far...

ul.appendChild(myItem);
// PROs use myItem to modify any style of this newly added DOM node here
myItem.style.color = 'blue';
myItem.textContent = 'Item 5';
