// practice project
const modal = document.querySelector('#add-modal');
// can do document.getElementById('add-modal') FASTER 

const addBtn = document.querySelector('header button');
// document.querySelector('#buttonIdIfHave')
// document.querySelector('header').lastElementChild; not recommended as last element may change 

const cancelBtn = document.querySelector('.btn.btn--passive')
const addMovieBtn = cancelBtn.nextElementSibling;

// 174 : validating inputs 
const inputs = document.querySelectorAll('input');

// 175 : adding and storing movies 
let movies = []

// 173 : controlling backdrop 
const backdrop = document.querySelector("#backdrop"); // document.body.firstElementChild

const deleteModal = document.querySelector('#delete-modal')
const deleteNo = deleteModal.querySelector('.btn--passive')
const deleteYes = deleteModal.querySelector('.btn--danger')
console.dir(deleteYes, deleteNo)

// 176 render items on screen 
const entryTextSection = document.querySelector('#entry-text');
const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}

const deleteMovie = (newMovie, newMovieElement) => {
    let idx = 0;
    for (let movie of movies) {
        if (newMovie.id === movie.id) {
            break;
        }
        ++idx;
    }
    // delete index = idx from movies 
    movies.splice(idx, 1);
    console.log(movies);
    // now re render the movies in UI and update in DOM 
    const movieRoot = document.querySelector('#movie-list');
    movieRoot.removeChild(newMovieElement)
    deleteModal.classList.toggle('visible');
    toggleBackdropModal();
    updateUI();
}


let reqMovie, reqMovieElement;
// 177 deleting elements movie 
const deleteMovieHandler = (newMovie, newMovieElement) => {

    // show delete confirmation modal 
    deleteModal.classList.toggle('visible');
    toggleBackdropModal();
    reqMovie = newMovie;
    reqMovieElement = newMovieElement;



};

const renderNewMovieElement = (newMovie) => {
    const { title, image: imageUrl, rating } = newMovie;
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}" >
        </div>
        <div class="movie-element__info">
            <h1> ${title} </h1>
            <p> ${rating} / 5 stars </p>
        </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(this, newMovie, newMovieElement));
    // js will clear this listener if the node is not in DOM, ie when 
    const movieRoot = document.querySelector('#movie-list');
    movieRoot.append(newMovieElement);
}

const toggleBackdropModal = () => {
    backdrop.classList.toggle('visible'); // alt : add/remove/className 
}
//173b close modal 1. on clicking backdrop or 2. on clicking cancel 
const backdropClickHandler = () => {
    toggleBackdropModal();
    modal.classList.toggle('visible');
};
const cancelBtnClickHandler = () => {
    toggleMovieModalAndBackdrop();
    clearInputs()
}


const toggleDeleteModal = () => {
    deleteModal.classList.toggle('visible');
}


const deleteClickHandler = () => {
    console.log("Delete it for sure")
    debugger;
    deleteMovie(reqMovie, reqMovieElement);
}

const dontDeleteClickHandler = () => {
    console.log("Change of plans, DONT Delete");
    toggleDeleteModal();
    toggleBackdropModal();

}
deleteYes.addEventListener('click', deleteClickHandler);
deleteNo.addEventListener('click', dontDeleteClickHandler);

// 175b clear inputs 
const clearInputs = () => {
    for (let i = 0; i < 3; ++i) inputs[i].value = ''
}

const addMovieBtnClickHandler = () => {
    console.log("clicked")
    const titleValue = inputs[0].value;
    const imageURLValue = inputs[1].value;
    const ratingValue = inputs[2].value;
    console.log(titleValue, imageURLValue, ratingValue)
    if (titleValue.trim() === '' ||
        imageURLValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5) {
        alert("pls enter valid values...")
        return;
    }

    // 175 creating and storing movies 
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageURLValue,
        rating: ratingValue
    }
    movies.push(newMovie);
    console.log("new movies length : ", movies.length);
    for (let e of movies) {
        console.log(e)
    }
    console.log(movies);
    toggleMovieModal();
    toggleBackdropModal();
    clearInputs()
    updateUI();
    renderNewMovieElement(newMovie)
}

// 172 : controlling modal 
const toggleMovieModal = () => {
    modal.classList.toggle('visible'); // alt : add/remove/className 


}
const toggleMovieModalAndBackdrop = () => {
    toggleBackdropModal();
    toggleMovieModal()
}


backdrop.addEventListener('click', backdropClickHandler);
cancelBtn.addEventListener('click', cancelBtnClickHandler);
addMovieBtn.addEventListener('click', addMovieBtnClickHandler)
addBtn.addEventListener('click', toggleMovieModalAndBackdrop)





