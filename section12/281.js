/* 
iterate on each list , for each list element, create 2 listeners for buttons E1, E2 
E2 for tooltip is common 
E1 for adding project to list1, adding to list2  
catch in E1 is elementMoves, but listener remains of earlier list, 2 step soln for that
step1: cloneNode to remove earlier event listeners / created fresh copied node (without listeners). 
step2 : now call others lists addingEventMechanism (add1/add2) corr. 
 */

const activeProjects = document.querySelector('#active-projects').children[1];
const finishedProjects = document.querySelector('#finished-projects').children[1];

const tooltipForButton = (btn, project) => {
    btn.addEventListener('click', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'card';
        tooltip.textContent = 'Tooltip goes here...';
        tooltip.addEventListener('click', () => {
            tooltip.remove();
        })
        project.insertAdjacentElement('afterbegin', tooltip);
    })
}

const add1 = (project) => {
    const btn1 = project.querySelector('button:last-of-type');
    const btn2 = project.querySelector('button:first-of-type');

    btn1.addEventListener('click', () => {
        btn1.innerHTML = 'Activate';
        const _project = project.cloneNode(true);
        add2(_project);
        finishedProjects.append(_project);
        project.remove();
    })

    tooltipForButton(btn2, project);
}

Array.from(activeProjects.children).forEach((project) => {
    add1(project);
})

const add2 = (project) => {
    const btn1 = project.querySelector('button:last-of-type');
    const btn2 = project.querySelector('button:first-of-type');

    btn1.addEventListener('click', () => {
        btn1.innerHTML = 'Finish';
        const _project = project.cloneNode(true);
        add1(_project);
        activeProjects.append(_project);
        project.remove();
    })

    btn2.addEventListener('click', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'card';
        tooltip.textContent = 'Tooltip goes here...';
        tooltip.addEventListener('click', () => {
            tooltip.remove();
        })
        project.insertAdjacentElement('afterbegin', tooltip);
        tooltipForButton(btn2);

    })
}

Array.from(finishedProjects.children).forEach((project) => {
    add2(project);
})



/* 
Know brute force ie JS -> then classes / react. 
Implement one (activeProjects), extend others simply copying(eg finishedProjects)
Use chatgpt for unknown terms to learn along the way, instead of watiting for course finishing.

*/