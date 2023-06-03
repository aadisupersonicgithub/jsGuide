console.log("Hello there")
const loginBtn = document.getElementById('login')
let msg;
let user = "aadi";
let isChecking = false;
function checkDetails() {
    return true;
}
const loginHandler = () => {
    // RealUsecase: add some middle ware codintion eg isChecking with isLogin
    console.log("logged in !! ")
    msg = `You logged in nicely ${user}`;
    let isChecking = checkDetails();
    if (isChecking) {
        msg = "checking...";
    } else {
        msg = "done"
    }
    alert(msg);
}
loginBtn.addEventListener('click', loginHandler)