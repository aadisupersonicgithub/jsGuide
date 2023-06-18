
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
        const tooltipTemplate = document.getElementById('tooltip');
        const tooltipBody = document.importNode(tooltipTemplate.content, true);
        tooltipBody.querySelector('p').textContent = this.text;

        tooltipElement.append(tooltipBody)
        tooltipElement.addEventListener('click', this.detach.bind(this));
        this.element = tooltipElement;
    }
}

class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        const elem = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(elem);
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
        this.connectDrag();
    }
    connectDrag() {
        const projItem = document.getElementById(this.id);
        projItem.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', this.id)
            e.dataTransfer.effectAllowed = 'move'
            // console.log("HERE connectDrag: ")
            // let img = new Image();
            // img.src = "/../../Users/devip/Downloads/nuclear.jpg";
            // e.dataTransfer.setDragImage(img, 10, 10);


            /* 
            configure drag event 
            1. data you want to append (to know what was dragged initially whereever this is dropped)
            2. which type of operation its, ie cursor type 
            3. preview image, default dom visual itself
            4. drag and drop modules in last to dive deeper 
             */
        })
        projItem.addEventListener('dragend', e => {
            console.log("dragend: ", e)
            if (e.dataTransfer.dropEffect == 'none') {
                console.log("Did not dropped...")
            } else {
                console.log('Dropped successfully')
            }
        })

    }

    showMoreInfoHandler() {
        if (this.hasTooltip) {
            return;
        }

        const projElement = document.getElementById(this.id);
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
        // const someone = document.querySelectorAll(`#${type}-projects`).children[1];
        // someone.scrollTo({
        //     top: 50,
        //     left: 100,
        //     behavior: "smooth"
        // });
        this.connectDroppable();
    }
    connectDroppable() {

        const list = document.querySelector(`#${this.type}-projects ul`);

        list.addEventListener('dragenter', e => {
            if (e.dataTransfer.types[0] == 'text/plain') {
                console.log("fine enough")
                e.preventDefault();
            }
            list.parentElement.classList.add('droppable');
        })

        list.addEventListener('dragover', e => {
            if (e.dataTransfer.types[0] == 'text/plain') {

                e.preventDefault();
            }
        })

        list.addEventListener('dragleave', e => {
            if (e.relatedTarget.closest(`#${this.type}-projects ul`) != list) {

                list.parentElement.classList.remove('droppable');
            }
        })

        list.addEventListener('drop', e => {
            console.log(e.dataTransfer)
            const prjId = e.dataTransfer.getData('text/plain');
            // if dragged to other list , only then add there , if same list ignore 
            if (this.projects.find(p => p.id == prjId)) {
                return;
            }
            // implement a function to mvoe element around , or just click finish as already implemented for that 

            document.getElementById(prjId).querySelector('button:last-of-type').click();
            list.parentElement.classList.remove('droppable');
            e.preventDefault(); // OPTIONAL: ignore any behaviour eg if image etc drop and page switch//load etc there 

        })
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        // console.dir(switchHandlerFunction)
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

/* 
1. set draggable = 'true', now it can be dragged 
2.    as dragging starts, 'dragstart' event triggers. ->> Describe operation/ append data 
NOTE: user can drop it anywhere in DOM, but we cant just add it everywhere, only specific elements eg X.
3. On all such X elements, where it can be dropped 
-> accept drop via 'dragenter' and 'dragover' events 
->  dragover works for child elements  , dragenter dont 
 NOTE: preventDefault, as default drop is not allowed by browser 
4. optional: listen to 'dragleave' event , 
eg update ui styles when its dragged away for over any element 
5. listen to 'drop' event and update data/UI 

*/