// inserting dom elements

const ul = document.querySelector('ul');
const li = document.createElement('li');
li.textContent = "Power1";

// ul.append(li); // after 3, in last 
// ul.prepend(li); // before 1 NOTE: It removes last one, as li is referenced.
// ul.lastElementChild.before(li); // between 2, 3 
// ul.firstElementChild.after(li); // between 1, 2 

// ul.firstElementChild.replaceChildren(li); // 1->power 
// ul.firstElementChild.nextElementSibling.replaceWith(li); // 2->power, 1->empty (as power moved and no ways to restore 1)

const li2 = document.createElement('li');
li2.textContent = 'power2';
// ul.append({ li, li2 }), ul.append("nice")  // multiple insertion, text insertion explore MDN

// if before, after dont work as in safari use insertAdjacentelement  

ul.children[1].insertAdjacentElement('beforebegin', li);

// Cloning : deep?true -> saare childs bhi copied of all nesting o/w not 
const li3 = li.cloneNode(true);
li3.textContent = "power3"
// ul.lastElementChild.after(li3, li2, li)   // WORKS 
ul.append(li, li2, li3); 