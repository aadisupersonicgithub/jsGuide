// GLOBAL is more recommened. function are objects, so global scoped object (/functions) 
// perforamnce, data and scoping later discuss this.
const add = (a, b, c) => {
    const validate = (x) => {
        return isNaN(x) ? -1 : x;
    }
    return validate(a) + validate(b) + validate(c)
}
console.log(add(3, 0, "boom"))