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
        tooltipElement.textContent = this.text;
        tooltipElement.addEventListener('click', this.detach.bind(this));

        console.log(this.hostElement.getBoundingClientRect())
        this.element = tooltipElement;


    }
}

class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        const elem = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(elem);
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
    }
}

App.init()

/* work hard every waking minute, or die trying... */