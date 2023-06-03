// styling dom elements

//1. elem.style  (like inline)


const header = document.querySelector('section');
// header.style.backgroundColor = 'pink';
// header.style.color = 'white';
// header.classList.add('red');



//2. manipulate classes (css styles will be affected)

// eg classList (add / remove etc), className 
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
    if (header.classList.contains('invisible'))
        header.className = 'red visible';
    else
        header.className = 'red invisible'
})