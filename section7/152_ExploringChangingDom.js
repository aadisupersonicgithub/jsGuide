// NOTE: explore change rendered code without need of rerendering.


const i1 = document.querySelector('#i1');
//  i1.textContent => HI 
//  i1.id => i1 
//  i1.className => c1  

console.log(i1.textContent, i1.id, i1.className);

// 2. replace text node with new text node behind scenes
i1.textContent = "changing Hi to Aadi baba";

// 3. h1.style to get access to all css styles. (TIP change hyphen to camelCase)
i1.style.backgroundColor = 'Green';
i1.style.color = 'white'

// 4. console.dir(i1) to know all the properties
// 5. use MDN docs to understand further behaviour. 