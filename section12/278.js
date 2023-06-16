

class Project {
    constructor(title, description, primary, secondary, status = false, extra) {

        this.title = title;
        this.description = description;
        this.primary = primary;
        this.secondary = secondary;
        this.status = status; // false->incomplete  
        this.id = Math.random().toString();
        this.extra = extra;
    }

    toggleStatus(cb) {
        this.status = !this.status;
        cb()
    }
}
class Projects {

    COMPLETE = [
        new Project('C1', 'D1', 'e1', 'f1', false, "extra1"),
        new Project('C2', 'D2', 'e2', 'f2', false, "extra2"),
        new Project('C3', 'D3', 'e3', 'f3', true, "extra3"),
        new Project('C4', 'D4', 'e4', 'f4', true, "extra4")
    ]

    constructor() {
        this.active = '';
        this.complete = '';
    }

    render(filterProject, c) {
        let ul = document.createElement('ul');
        ul.className = c

        let totalProjs = this.COMPLETE;
        if (filterProject != undefined) {
            console.log(totalProjs)
            totalProjs = totalProjs.filter(proj => {
                console.log(proj.status, filterProject)
                return proj.status == filterProject
            });
            console.log(totalProjs);
        }

        for (const el of totalProjs) {
            const li = document.createElement('li');
            li.setAttribute('id', el.id);
            li.setAttribute('data-extra-info', el.extra);
            li.className = 'card';
            li.innerHTML = `
                    <h2>${el.title}</h2>
                    <p>${el.description}</p>
                    <button class="alt">${el.secondary}</button>
                    <button>${el.primary}</button>
            `;
            li.lastElementChild.addEventListener('click', () => {
                console.log("clicked: ", li.id)
                console.log("COMP: ", this.COMPLETE)
                const cb = () => {

                    this.active = this.render(true);
                    this.render(false);
                }
                el.toggleStatus(cb);
                console.log(this.active)
            })
            ul.append(li);
        }

        return ul;
    }

}

class ActiveProjects extends Projects {
    constructor() {
        super();
        this.status = true;
    }

    renderActiveOnes() {
        return this.render(this.status, 'active-projects')
    }
}

class CompletedProjects extends Projects {
    constructor() {
        super();
        this.status = false;
    }

    renderCompletedOnes() {
        console.log(this.render(this.status));
        return this.render(this.status, 'finished-projects');
    }
}

class App {
    static init() {

        const proj = new Projects();

        const projs = proj.render();
        // document.getElementById('app').append(projs);


        const activated = document.createElement('h1');
        activated.innerHTML = 'Active';
        document.getElementById('app').append(activated);

        const activeProjs = new ActiveProjects();
        this.active =
            document.getElementById('app').append(activeProjs.renderActiveOnes());
        this.active = document.getElementById('active-projects');



        const completed = document.createElement('h1');
        completed.innerHTML = 'Completed';
        document.getElementById('app').append(completed);

        const completedProjects = new CompletedProjects();
        document.getElementById('app').append(completedProjects.renderCompletedOnes());
        this.finished = document.getElementById('finished-projects')
    }
}

App.init();

/*

START very small.
PLAN 3 lines => 30 lines codes. 
Accuracy > speed ie why think more. 

1. productList me saare ek saath 
2. bs active=[], done[] in inherited project , and update whenever toggling occurs 
3. if got finished just 

How to create big projects quick and good... make lot of them and learn tips alongside.

 */