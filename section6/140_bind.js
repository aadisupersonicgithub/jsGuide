// 1. bind is preconfigured function creation and always 1st arg , REASON as fun is object (object have functions/methods)
// 2. can call arg in that fucntion eg sum(x, res) , but there needs conditions checking(ternary or if else) for what x ie why pass direclty using add 
// 3. sum.bind(this, x) => x will be first arg... when called like sum(res) [CONVERTS to ie => sum(x, res);] later

const add = (handler_cb, a, b) => {
    const sum = a + b;
    handler_cb(sum);
}
const sub = (handler_cb, a, b) => {
    const res = a - b;
    handler_cb("Without binding, pass manually when calling back", res);
    return "congrats"
}
const storeInDb = (a, b) => {
    console.log(" msg =  " + a + " and res = " + b);
}

add(storeInDb.bind(this, "Binding ie preconfigured 1st arg of callback"), 2, 4);
sub(storeInDb, 3, -5);



