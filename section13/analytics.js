console.log("Sending Analytics... !!");

let k = 1;
let t2 = setInterval(() => {
    console.log("printing : ", k);
    k++;
}, 1000)

document.body.children[1].addEventListener('click', () => {
    // clearTimeout(t1);
    clearInterval(t2); // clearTimeout(t2) works too 
})