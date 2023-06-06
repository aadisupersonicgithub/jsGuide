// "use strict"
const addMovieBtn = document.querySelector('#add-movie-btn');
const searchBtn = document.querySelector('#search-btn');


let movies = [];

const addMovieHandler = () => {
    const title = document.querySelector('#title').value;
    const extraName = document.querySelector('#extra-name').value;
    const extraValue = document.querySelector('#extra-value').value;

    // console.log(title, extraValue, extraName)

    if (title.trim() === '' || extraName.trim() === '' || extraValue.trim() === '') {
        return;
    }
    const newMovie = {
        info: {
            title,
            [extraName]: extraValue
        },
        id: Math.random().toString()
    };
    movies.push(newMovie);
    console.log(newMovie);
    renderMovies(movies);
};

addMovieBtn.addEventListener('click', addMovieHandler);

const renderMovies = (_movies) => {

    const list = document.querySelector('#movie-list');

    if (movies.length === 0) {
        // console.log("add some movies, nothing to render kid");
        list.classList.remove('visible');
    } else {
        list.classList.add('visible');
        // console.log("rendering : ", movies);

    }
    list.innerHTML = '';

    _movies.forEach(movie => {
        const movieEl = document.createElement('li');
        movieEl.textContent = movie.info.title;
        for (const key in movie.info) {
            console.log(key)
            if (key != 'title' || key != '_title') {
                movieEl.textContent += `  , ${key}: ${movie.info[key]}`
            }
        }
        list.append(movieEl);
    })
}

// 223 
// const searchText = () => {
const searchText = function () {
    console.log("searchText: ", this)
    const txt = document.querySelector('#filter-title').value;
    console.log(txt);
    const movies_ = movies.filter(movie => {
        for (const key in movie.info) {
            // console.log(key, movie.info[key]);
            if (key.includes(txt) || movie.info[key].includes(txt)) {
                return movie;
            }
        }
    })
    // console.log(movies_)
    renderMovies(movies_);
}

searchBtn.addEventListener('click', searchText);


// 224. chaning 
// movie.info.key 
// 225 spread with objects (to copy keys) 

const person = { aadi: 2 };
const aontherPerson = person;
const sha = { ...person, k: 2 };
person.age = 23;
// console.log(person, aontherPerson, sha)
// arr => [...arr] .. arr = {k1, k2, k3} = > {...arr}




// 226 object.assign 

// copying values another method  
const person2 = Object.assign({}, person, sha);
const person3 = Object.assign(person, sha);
// console.log(person2, person, person3, person === person3, person3 === sha)


// 227 object destructuring 
const obj = { k: 2, l: 3, m: 4, n: { n1: { n2: 3 } } };
const { k, l: newL, n: { n1: n_ }, ...m } = obj;

/* 
make sure keys on left exists in key
 order does not matter
but actual comparing happens for each keys
remaining can be passed to spread too
can assign new name to keys too
*/
// console.log(k, newL, m, n, n_); 






// 228 checking for property existence  (eg if key deleted and want to validate, or dyanmic user keys have)
// // m1 
// if ('k' in sha) {
//     console.log("key k is present in sha")
// }
// // m2 . if not there , deleted , or manually set to undefined 
// if (!(sha.k === undefined)) {
//     console.log("k presnet")
// }








// 229 this  
// this will refer to , whoever/whatever calls that function 
const aadi = {
    name: "aadi",
    level: "high",
    power: function () {
        console.log(this)
        console.log(this.level == "high" ? this.name + " is billionare" : this.name + " is still billionare")
    },
    power2: () => {
        console.log(this);
        console.log("aadi : ", this.name);
    },
    power3(c1, c2) {
        console.log(this)
        console.log("also can declare like this, advanced", c1, c2, c1 + c2)
    }
}

// aadi.power()  as object calls so this -> object


// // 2 what if destructure power then call , then it will be window ig
// let { power } = aadi; // as implicit call so this -> window
// console.log("window -> function")
// power = power.bind(aadi);
// power();


// TODO: // 1 what if power is arrow function
// aadi.power2();
// const { power2 } = aadi;
// power2();


/*
why using name(){} syntax in object says not defined. while normal one catches
reason did not destructure and was not available on global
 */




// 232 call and apply


// aadi.power3(4, 5)
// const { power3 } = aadi // windows , calls later, just preconfiguring if using bind 
// // 1c. power3 = power3.bind(aadi, anyArg); later call power3() 
// power3(5, 6)
// power3.call(aadi, 5, 6); // this->aadi ...also calls immediate 
// // 1a. apply is just instead of comma separated arguments, uses array of args ie ONLY 1 args
// power3.apply(aadi, [8, 9]);
// // 1b. NOTE: if using call ...args could be helpful ...for apply stored things [args] could be helpful 










// 233 what browser (sometimes) does to "this"


/* 
2a. this refers to fun caller if we call explicitly... ie 
    aadi.sum() => this : aadi 
    sum()  this: windows 
    sum.call(aadi)=> this: windows      Configured and called just 
    sum.bind(aadi), sum() => this : aadi          Preconfigured and called later 

2b. if implicit call eg event listenere etc then event/browser calls that 
         ie event>button is real caller see 2c.  

2c. summary: browser binds 'this' for you (on event listeneres) 
  to the DOM element that triggered the event 

2d. again ONLY if NOT using ARROW function (special) ie only function(){} 
  NOT arrow : this is bound to whatever is executing function 
  ARROW : this is bound to none  ie this->window (really this->undefined if strict mode). 
     Arrow fun literally dont know wtf 'this' is. Thus 'this' though inside function , but behave like outside itself
    how arrow not knowing 'this' helps, in later part.

2e Outside objects etc context behave like below  

   
const p1 = () => {
    console.log(this) // dont have own this, so assigns wherever its present currently in global ..so this->global
}
const p2 = function () {
    console.log(this) // undefined(strict), window(non strict)
}
p1()
p2()



*/













// 234 : this and arrow functions 


const members = {
    team: "Elite",
    people: ["Shantanu", "Aadi"],
    getTeamMembers() {
        console.log(this)
        this.people.forEach(function (p) { // members.getTeamMmebers ie this->window 
            console.log(p + ' - ' + this?.team); // aadi - undefined 
            // console.log(this) this->window (as this bounded (so binds when function executes ie forEach cb) 
            // so wrt forEach calls and browser calls BehindScenes and assigns this->global 
        })
        this.people.forEach((p) => { // members.getTeamMmebers ie this->members 
            console.log(p + ' - ' + this?.team);
            // console.log(this) // this->arroow dont give a fuck to this, just assign whoever outside ie getTeamMembers  
        })
    }
}

// members.getTeamMembers()



// practice 
// console.log(this) // this->global 
function c1() {
    console.log("c1: ", this); // this->global(undefined if strict mode) as binded where its called  
}
const c2 = () => {
    console.log("c2: ", this); // this->global as NOT BINDED but takes wherever called ie global...
}

const power1 = {
    m1: 2,
    m2: function () {
        console.log("m2: ", this, this.m1); // BINDED to who called 
        // this->power1 if power1.m2();
        // this->global if const {m2} = power1; m2();  
    },
    m3: () => {
        console.log("m3: ", this); // this->global ...where called 
    },
    m4: function () {

        // case1: m4 is power1
        console.log(" m4: ", this)
        function m2a() {
            console.log("m2a : ", this); // m2a global as nonArrow so bounded to caller , due to m2a() ie browser;
        }
        const m3a = () => {
            console.log("m3a: ", this) // this->same as m4 , as khudka nahi exist 
        }
        m2a(); // binded but calling here via browser context ie this->global 
        m3a();
    }

}



// c1();
// c2();

// power1.m2(); // power1
// const { m2 } = power1;
// m2(); // global

// power1.m3(); // global
// const { m3 } = power1;
// m3(); // global


// console.log('case1[power1.m4()]')
// power1.m4();


// console.log('case1[m4()]')
// const { m4 } = power1;
// m4();

// IMP summary : If doubt in any 'this' eg, use console.log(this);
// summary: BINDED ie who called, NONbinded (ie arrow) to where present (idgaf for who called me) same as that..
// summary2: if browser involved then DOM elements eg eventListneres.
// summary3 : forEach etc me global as again its cb and browser handles
// 3a. this inside object of function(){} =--> gives access to callers
/*
tip:if O1 copies function of O2 and stores and calls that own version of copied function ...
function of O2 will be executed with this of O1.

const power1a = {
    m1: 5
};
power1a.oye = power1.m2;
power1a.oye();
console.log(power1a.oye === power1.m2)

*/



// 236 getters and setters
/* 
1. how to assign a value ,  
how to access it , we want to control  
we can use another internal variable to control behaviour on key further
use default fallback values and add some transformation on raw inputs of those values
can create read only by creating getter only (no setter), wont allow updations saying getter not defined.

2. FEATURES : 
a. can throw error, 
b. can assign default values, 
c. kisi bhi (nested) object pe create kr skte
d. create read only values (ie dont put setter)  */
try {

    const p1 = {
        info: {

            // 3a. title: "",  no need to initialize if using getters / setters , name of getters/setters is the key name
            get title() {
                return this._title;
            },
            set title(val) {
                if (val) {
                    this._title = val;
                    // 2d. apply some default transition/effects on raw text 
                } else {
                    // 2b default value / error 
                    this._title = "nicething"
                    // 2a throw new Error("something went wrong buddy")
                }
            }
        },
        // 2c nsted object pe getters / setter ie 'name'here , oopar on 'title' 
        // name: 'aadi', NOT needed if getters/setters 
        get name() {
            return this._name;
        },
        set name(val) {
            if (val) {
                this._name = val;
            } else {
                this._name = "munna bhai"
            }
        }
    }
    p1.info.title = ""; // 1a. invokes setter of title, whenever property with getter / setter is accessed / updated.
    console.log(p1.info.title); // invokes getter of title  , shows default _title if not set anything 

    // 2. even if call solo (ie p1. avoid) still gets correct values 
    const { info } = p1;
    const { title } = info;
    console.log(title)

    // 3. calling getter ONCE is kinda must o/w initialized with undefined initially
    p1.name = ''
    console.log(p1.name)
} catch (er) {
    console.log(er.message)
}














/* 
dont complicate
beman se start kro
topics count > hours count 
remove > add 
 */