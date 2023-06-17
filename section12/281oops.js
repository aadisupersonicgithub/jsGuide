class Component {

}

class Tooltip {

}

class DOMHelper {
    static clearEventListeners(btn) {
        let _btn = btn.cloneNode(true);
        btn.replaceWith(_btn);
        return _btn;
    }
}
class Project {
    constructor(id, switchProject, type) {
        // FIX 
        this.id = id;
        this.type = type;
        // change per instance 
        this.switchProject = switchProject;
        this.connectSwitchButton(type);

    }

    connectSwitchButton(type) {
        // add and remove listener on primary Switch/Active button 
        const prj = document.getElementById(this.id);
        console.log("id: ", this.id, prj)

        let btn1 = prj.querySelector(`button:last-of-type`);
        btn1 = DOMHelper.clearEventListeners(btn1);
        btn1.textContent = type == 'active' ? "Finish" : "Activate";
        btn1.addEventListener('click', this.switchProject.bind(null, this.id))
        // this is like calling its parent switch(addInOther, removeInSelf) with telling its id to its parent 

    }

    update(switchProject, type) {
        this.switchProject = switchProject;
        // calling this is required, o/w if is project pe koi call krta (to ye wapas se isi instance me jud jayega) 
        this.connectSwitchButton(type);
        // this is required to reset the event listener, ensuring its binded to correct correctSwitchProject again 


    }
}
class ProjectList {
    projects = [] // contains elem of all project list elements.

    constructor(type) {
        this.type = type;
        const projs = document.querySelectorAll(`#${type}-projects li`);
        for (const proj of projs) {
            // this.projects.push(proj.id);
            const _proj = new Project(proj.id, this.switchProject.bind(this), this.type);
            this.projects.push(_proj);
        }
    }

    addProject(proj) {
        // addProject yaha call ni hua, addInOther call hua jo ek variable rakhe 
        // us variable me binded addProject of other instance is present , ie 'this' uska wala hai ye 
        console.log("=> of other", this)
        this.projects.push(proj)
        proj.update(this.switchProject.bind(this), this.type);
        // NOTE: update just ensures ki 'this' doosre instance ka lage for 'this' project

    }

    removeProject(projId) {
        console.log("=> of self ", this)
        this.projects.filter(e => e.id !== projId);

    }

    setAddInOther(addInOther_) {
        // arg is binded addProject of other instance 
        this.addInOther = addInOther_;
    }

    switchProject(projId) {
        // add in other instance, remove from this instance 
        const proj = this.projects.find(e => e.id === projId);
        this.addInOther(proj);
        this.removeProject(projId);
    }


}

class App {
    static init() {
        const activeProjectsList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');
        activeProjectsList.setAddInOther(finishedProjectsList.addProject.bind(finishedProjectsList));
        finishedProjectsList.setAddInOther(activeProjectsList.addProject.bind(activeProjectsList));

    }
}

App.init();

/* 
 * create lists (id collection)
 * create list items (type, move)
 * do we need nested bind if passing 'this' how assignment works if binded function milta for assignment = 
 * 
*/
