// practice project
let modal = document.querySelector('#add-modal');
// can do document.getElementById('add-modal') FASTER 

let addBtn = document.querySelector('header button');
// document.querySelector('#buttonIdIfHave')
// document.querySelector('header').lastElementChild; not recommended as last element may change 

let cancelBtn = document.querySelector('.btn.btn--passive')
let addMovieBtn = cancelBtn.nextElementSibling;

// 174 : validating inputs 
const inputs = document.querySelectorAll('input');

// 175 : adding and storing movies 
let movies = []

// 173 : controlling backdrop 
let backdrop = document.querySelector("#backdrop"); // document.body.firstElementChild


// 176 render items on screen 
const entryTextSection = document.querySelector('#entry-text');
const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}
const renderNewMovieElement = (title, imageUrl, rating) => {
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
    const movieRoot = document.querySelector('#movie-list');
    movieRoot.append(newMovieElement);
}

const toggleBackdropModal = () => {
    backdrop.classList.toggle('visible'); // alt : add/remove/className 
}
//173b close modal 1. on clicking backdrop or 2. on clicking cancel 
const backdropClickHandler = () => {
    toggleMovieModal();
};
const cancelBtnClickHandler = () => {
    toggleMovieModal();
    clearInputs()
}

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
    clearInputs()
    updateUI();
    renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating)
}

// 172 : controlling modal 
const toggleMovieModal = () => {
    modal.classList.toggle('visible'); // alt : add/remove/className 
    toggleBackdropModal();

}


backdrop.addEventListener('click', backdropClickHandler);
cancelBtn.addEventListener('click', cancelBtnClickHandler);
addMovieBtn.addEventListener('click', addMovieBtnClickHandler)
addBtn.addEventListener('click', toggleMovieModal)





