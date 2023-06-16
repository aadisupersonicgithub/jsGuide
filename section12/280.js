class Tooltip {
    constructor(closeNotifierFunction) {
        this.closeNotifier = closeNotifierFunction;
    }

    show(id) {
        console.log("showing tooltip for... ", id)
    }

    detach() {
        console.log("detaching : ", this)
        this.element.remove();
    }

    closeTooltip = () => {
        this.detach();
        this.closeNotifier();
    }

    attach() {
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';
        tooltipElement.textContent = 'POWERFUL AADI';
        tooltipElement.addEventListener('click', this.detach.bind(this));
        // tooltipElement.addEventListener('click', this.detach2);
        this.element = tooltipElement;
        document.body.append(tooltipElement);
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
        // const tooltipUtility = () => {
        //     this.has 
        // }
        const tooltip = new Tooltip(() => {
            this.hasTooltip = false;
        });

        tooltip.show(this.id);
        tooltip.attach();
        this.hasTooltip = true;
    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler);
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