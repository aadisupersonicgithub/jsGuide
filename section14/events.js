const button = document.querySelector('button');
/* 
m1 inline in html itself as attributes 

m2 again 'on' attributes,  
button.onclick = function () {
    console.log("clicked")
}


const doClick = () => {
    alert("Button was clicked...!!");
}
const doClick2 = () => {
    alert("Button was clicked2...!!");
}
button.onclick = doClick;
button.onclick = doClick2; 
Overwrites, cant add multiple listners this way , will overwrite [workaround, call fun to add new listener]

m3 addEventListener : addEventListener, removeEventListener 


type1
 can add MULTIPLE listeners 

buttonClickHandler = () => {
    console.log("woah, this was clicked !!!")
}
buttonClickHandler2 = () => {
    console.log("woah, this was clicked2!!!")
}

button.addEventListener('click', buttonClickHandler);
button.addEventListener('click', buttonClickHandler2);

setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler);
}, 2000);

type2
FAIL in removing, as everytime new ananoymous function is created. 
button.addEventListener('click', () => {
    console.log("clicked");
});
setTimeout(() => {
    button.removeEventListener('click', () => {
        console.log("clicked");
    });
}, 2000);

PASS : store in variable 
const k1 = () => {
    console.log("clicked");
};
button.addEventListener('click', k1);
setTimeout(() => {
    button.removeEventListener('click', k1);
}, 2000);


type3: same with bind as above 

buttonClickHandler = () => {
    console.log("woah, this was clicked !!!")
}

FAIL: 
button.addEventListener('click', buttonClickHandler.bind(this));
setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler.bind(this));
}, 2000);

PASS: store in variable 
const k2 = buttonClickHandler.bind(this)
button.addEventListener('click', k2)
setTimeout(() => {
    button.removeEventListener('click', k2);
}, 2000);
*/


// type4 : target event data 
// const handler = (e) => {
//     console.log(e)
//     console.log("clicked : ", e.target);
//     // e.target.disabled = true;
//     // ctrlKey, altKey, MDN playaround, relatedTarget (last element)
// }
// const btns = document.querySelectorAll('button');
// btns.forEach(btn => btn.addEventListener('mouseenter', handler));



// type5 events types
// click, mouseenter 
// register events on button/div/window 

// window.addEventListener('scroll', () => {
//     console.log("scrolling...")
// })

// Basic infinite scrolling 
let curElementNumber = 0;

function scrollHandler() {
    const distanceToBottom = document.body.getBoundingClientRect().bottom;

    if (distanceToBottom < document.documentElement.clientHeight + 150) {
        const newDataElement = document.createElement('div');
        curElementNumber++;
        newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
        document.body.append(newDataElement);
    }
}

window.addEventListener('scroll', scrollHandler);

// form by default on submit, sends data to server ..here no server , rather file protocol 

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    // for submit : is submitting form data to server 
    // for link : goto that link 
    console.log("submitting...");
})


// DOM events : capturing and bubbling phase 
const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');

c1.addEventListener('click', (e) => {
    // e.stopPropagation();
    // e.stopImmediatePropagation(); // if multi listeners on this, wont even trigger its own next listeners 
    console.log("DIV: c1")
}, true);
c1.addEventListener('click', (e) => {
    // e.stopPropagation();
    // e.stopImmediatePropagation();
    console.log("DIV: c1a")
}, true);

c2.addEventListener('click', (e) => {
    // e.stopImmediatePropagation();
    // e.stopPropagation();
    console.log("P: c2")
})

c3.addEventListener('click', (e) => {
    // e.stopImmediatePropagation();
    // e.stopPropagation();
    // console.log("BUTTON: c3", c3, e)
    console.log("BUTTON: c3")
})

// c3.click();
c2.click();
// execution : c3 then c2 then c1 (ie bubbling)...ignores capturing phase by default as 3rd arg false
// stopPropogation: wont go further events in ANCESTORS
// stopImmediatePropogation : wont go fruther in anyside (child/ancestor)
// process of multiple listener for single event, is called propogation (ie capturing event -> bubbling phase)
// ie occured on child , but bubbled, ie all its ancestors get to know about it due to bubbling


// mouseEnter, dragEVents dont bubble up... common sense 
// const listItems = document.querySelectorAll('li');

// listItems.forEach(listItem => {
//     listItem.addEventListener('click', (e) => {
//         e.target.classList.toggle('highlight')
//     })
// })

// event delegation pattern, as bubble hoke aayega list pe , to usipe sunlo as e.target tb bhi sahi listItem hi dega 
const list = document.querySelector('ul');
list.addEventListener('click', e => {
    // e.target.classList.toggle('highlight')
    e.target.closest('li').classList.toggle('highlight');
    console.log(e.currentTarget);

    form.submit()
    // TODO why the preventDefault not working, if manual trigger (ie submit/clickc)
    // though on button click that works 

})

// but we face problem if list element have multiple tags ie h, p etc..so whoever gets clicked, only that will get highlight ie wrong , then only 1st approach is reliable

// e.currentTarget : list ie jispe listner laga hai wo element


// Trigger event programtically
// click any list item, click 1 event on button item too 
