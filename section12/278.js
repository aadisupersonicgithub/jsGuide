class Component {
    // create element here take common out , but first create raw 
}

class Header {
    render(hook) {
        const elem = document.createElement('header');
        elem.setAttribute('id', 'main-header');
        elem.innerHTML = `<h1> Project Planner </h1>`
        document.body.append(elem);
        return html;
    }
}

// class ToolTip {

// }

// class ProjectItem {

//     COMPLETE = [
//         new ProjectItem('C1', 'D1', false)
//     ]

//     constructor(title, description, status = false) {
//         this.title = title;
//         this.desc = description;
//         this.status = status; // false->incomplete         
//     }
//     toggleStatus() {
//         this.status = !this.status;
//     }
// }

// class ActiveProject extends ProjectItem {
//     ACTIVE = []
// }

// class CompletedProject extends ProjectItem {
//     render() {

//     }
// }

// class ProjectList {

// }

class App {
    static init() {
        const header = new Header();
        header.render('app');
        // const pl = new ProductList();
        // document.getElementById('')

    }
}

App.init();

/*

START very small.
PLAN 3 lines => 30 lines codes. 
Accuracy > speed ie why think more. 

1. productList me saare ek saath 
2. bs active=[], done[] in inherited project , and update whenever toggling occurs 


 */