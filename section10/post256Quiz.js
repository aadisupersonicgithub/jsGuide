class Course {
    #creator = 'aadi';
    // title = "video editing";
    // length = 34;
    // price = 3605;

    set title(val) {
        this._title = `'PREMIUM: ${val}'`;
    }

    get title() {
        return this._title;
    }

    constructor(title, length, price) {
        this.title = title;
        this.length = length;
        this.price = price;
        // this.#author = "aadi" // CANT do like this 
        console.log("GOD: ", this.#creator);


    }


    showCourse() {
        // this.#author = "aadi";
        console.log("Current course title is ", this.title, " whose length is ", this.length, " Hrs. costing only Rs. ", this.price);
    }

    valueByCost() {
        // console.log(this.#creator);

        const val = this.length * 60 * 60 / this.price;
        console.log("You get ", val.toFixed(2), " seconds content for every Rs. paid");
    }

}

const jsCourse = new Course("JS", 45, 3600);
const reactCourse = new Course("REACT", 43, 3700);
// console.log(jsCourse.#creator)

jsCourse.showCourse();
reactCourse.showCourse();

jsCourse.valueByCost();
reactCourse.valueByCost();


class PracticalCourse extends Course {
    constructor(title, length, price, exer = 2) {
        super(title, length, price);
        this.numOfExercise = exer;
    }

    showContent() {
        this.showCourse();
        console.log("It also provides ", this.numOfExercise, " exercises for hands on")
    }
}

class TheoreticalCourse extends Course {
    // #creator = 'aadi';
    constructor(title, length, price, chapters) {
        super(title, length, price);
        this.chapters = chapters;
    }

    publish() {
        console.log("We give ideas about publishing steps of your theory / research paper with ", this.chapters, " demonstrations of existing usecases")
    }
}

const prac = new PracticalCourse("Cooking", 23, 2340, 4);
prac.showCourse();
prac.valueByCost();
prac.showContent();

const theo = new TheoreticalCourse("Vim", 11, 1000, 3);
theo.showCourse();
theo.valueByCost();
theo.publish();
// console.log(theo.creator)