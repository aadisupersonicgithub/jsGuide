// attributes vs properties 
// basically jo html me hai wo attributes hai, baki jo dom uska corresponding elementNode banta uspe corresponding attribute ki jagah properties add hoti
// eg <input class="c1" id="id1" value="v1">  
// const Input; 
// Input.className (diff but live sync ie if class changes className changes and vv)
// Input.value (1 way sync ie if in prop changes html changes but not shown in code )
// Input.id (live sync) 
const Input = document.getElementById('id1');
Input.id = "okay"
Input.className = "aadi"
Input.setAttribute('name', 'power')

Input.value = "hi buddy"; // will reflect in DOM properties thus in UI, but not in attributes
Input.setAttribute('value', 'this will reflect in attributes so in UI')

// 1. NOTE so for cases like value, use setAttribute separately to set (as htm rendered ie set the property done, but corresponding attribute of html still not set)




