/* 
* attaching data to elements
* working with element coordinates and sizes 
* templates and dynamic scripts 
* navigator, location, window.history  
 */
class Component {
    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }

    detach() {
        console.log("detaching : ", this)
        this.element.remove();

    }
    attach() {
        this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);

    }

}
class Tooltip extends Component {
    constructor(closeNotifierFunction, text, hostElementId) {

        super(hostElementId, true)
        this.hasTooltip = true;
        this.closeNotifier = closeNotifierFunction;
        this.text = text;
        this.create();
    }

    closeTooltip = () => {

        this.detach();
        this.closeNotifier();
    }

    create() {
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';

        // tooltipElement.innerHTML = `
        //     <h2> More info </h2>
        //     <p> ${this.text} </p>
        // `;
        const tooltipTemplate = document.getElementById('tooltip');
        const tooltipBody = document.importNode(tooltipTemplate.content, true);
        tooltipBody.querySelector('p').textContent = this.text;
        console.log(tooltipBody)
        tooltipElement.append(tooltipBody);


        // tooltipElement.textContent = this.text;
        tooltipElement.addEventListener('click', this.detach.bind(this));

        // console.log(this.hostElement.getBoundingClientRect())
        this.element = tooltipElement;

        // positioning tooltip 
        const _left = this.hostElement.offsetLeft;
        const _top = this.hostElement.offsetTop;
        const _height = this.hostElement.clientHeight;
        const _scroll = this.hostElement.parentElement.scrollHeight;

        const x = _left + 20;
        const y = _top + _height - 10 - _scroll;
        // tooltipElement.offsetTop = x; // DONT , READ ONLY , use css instead 
        // tooltipElement.style.position = 'absolute';
        // tooltipElement.style.left = x + 'px';
        // tooltipElement.style.top = y + 'px';

        /* 
        Make tooltip take no space ie why absolute display 
        Make tooltips sticky wrt element when scrolling>..advanced in event listeners and stuff required for that 
        Understand CSS, NodeJS meanwhile, roadmap BE/FE/Devops/CyberSecurity.

        */



    }
}

class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        const elem = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(elem);
        // elem.scrollIntoView() // by default auto 
        elem.scrollIntoView({
            behavior: "smooth"
        })

    }

    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }
}

class ProjectItem {
    constructor(id, updateProjectsListFunction, type) {

        this.id = id;
        this.updateProjectsListHandler = updateProjectsListFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
    }

    showMoreInfoHandler() {
        if (this.hasTooltip) {
            return;
        }

        const projElement = document.getElementById(this.id);

        // setting htmls data- dataset directly 
        projElement.dataset.addInfoViaJs = "becoming PRO";

        const tooltipText = projElement.dataset.extraInfo;

        const tooltip = new Tooltip(() => {
            this.hasTooltip = false;
        }, tooltipText, this.id);

        tooltip.attach();

    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
    }

    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent = type == 'active' ? 'Finish' : 'Activate';
        switchBtn.addEventListener('click', this.updateProjectsListHandler.bind(null, this.id));
    }

    update(updateProjectListFn, type) {
        this.updateProjectsListHandler = updateProjectListFn;
        this.connectSwitchButton(type);
    }
}

class ProjectList {
    projects = []

    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)), this.type)
        }
        const someone = document.querySelector(`#${type}-projects`).children[1];
        console.log(someone)
        // someone.scrollTo(0, 90)// wont repeat itself 
        // someone.scrollBy(0, 45); // repeat itself 
        // usecase, get to any element via scrolling and use scrollTo to tell js to scroll upto it
        someone.scrollTo({
            top: 50,
            left: 100,
            behavior: "smooth"
        });
        // scroll for showing content to user, whichi you want them to see 
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        console.dir(switchHandlerFunction)
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        console.log(project)
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);

    }

    switchProject(projectId) {
        this.switchHandler(this.projects.find(p => p.id == projectId));
        this.projects = this.projects.filter(p => p.id !== projectId);
    }
}

class App {
    static init() {
        const activeProjectsList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');
        activeProjectsList.setSwitchHandlerFunction(finishedProjectsList.addProject.bind(finishedProjectsList));
        finishedProjectsList.setSwitchHandlerFunction(activeProjectsList.addProject.bind(activeProjectsList));


        // type1; const someScript = document.createElement('script');
        // someScript.textContent = `alert("Hi there");`
        // document.head.append(someScript);

        // type2. its useful when other script files and we want to download when js loads Condtionally 
        // note scripts downloading in networks tab to validate 

        // type3.warning:A dynamically created user scripts, dont inject without validating/sanitizing, later in security 

        // document.body.children[0].addEventListener('click', () => {
        //     App.startAnalytics();
        // })


        // type4 timers , async execution so wont block remaining code, 3rd arg is array of arg to be passed in 1st arg 
        // a. ONCE setTimeout 
        let t1 = setTimeout(this.startAnalytics, 3000); //after 3sec executes this function 

        // b. repeat : setInterval
        // let k = 1;
        // let t2 = setInterval(() => {
        //     console.log("printing : ", k);
        //     k++;
        // }, 1000)

        // document.body.children[1].addEventListener('click', () => {
        //     clearTimeout(t1);
        //     clearInterval(t2); // clearTimeout(t2) works too 
        // })
    }

    static startAnalytics() {
        const analyticsScript = document.createElement('script');
        analyticsScript.src = './analytics.js';
        analyticsScript.defer = true;
        document.head.append(analyticsScript);
    }
}

App.init()

console.log(" work hard every waking minute, or die trying... ");

// document.body.scrollTo(0, 3000) 