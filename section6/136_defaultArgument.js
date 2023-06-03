// if instead of some value, undefined is expected to return, use this 
const VIP = 5;
const add = (a, b = VIP) => {
    b = b || VIP; // is like default argument alternative, only undefined gets overwritten (not other falsy values);
    return a + b;
}
// can use first argument in 2nd argument (it must come before)
const add2 = (a, b = (a == VIP ? VIP + 1 : VIP)) => {
    console.log(a + b);
}
console.log(add(2, 3))
console.log(add(2));
add2(5);
add2(4);

// always put default arguments in last, as if 1st arg passed its default argument gets overwritten, remaining arg will stay undefined.
// IMP: learn to put debugger to understand behaviour from beginning itself.
