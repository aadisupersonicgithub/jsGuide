// eg addEventListenner. pointer to another function aka callback
// browser calls it 

const add = (handler_cb, a, b) => {
    const sum = a + b;
    // return sum 
    handler_cb(sum);
    return "congrats"
}
const storeInDb = (a) => {
    // api call
    let apiCallSuccess = true;
    if (apiCallSuccess) alert("saved your data in DB");
}

console.log(add(storeInDb, 2, 4));
