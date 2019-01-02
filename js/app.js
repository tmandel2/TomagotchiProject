// Tomagotchi Mini-Project
// Description
// Let's use our front-end web development skills to create a "living" pet! We'll use HTML, CSS, and JavaScript/jQuery to interact with our pet.

// Requirements
// Create a repo for your tomagotchi pet
// make a commit after you finish each one of the following




// Create a Class (JS Class, look at your notes if your forget) for your tomagotchi
class tomagotchi {
	constructor (petName) {
		this.name = petName;
		this.hunger = 1;
		this.sleepiness = 1;
		this.boredom = 1;
		this.age = 0;
		$('h1').text(`${petName}`);
		$('#hunger').text(`My hunger is ${this.hunger} out of 10`);
		$('#sleepiness').text(`My sleepiness is ${this.sleepiness} out of 10`);
		$('#boredom').text(`My boredom is ${this.boredom} out of 10`);
		$('#age').text(`I am ${this.age} years old!`);
		startAging(this.age);
	}
}
// const game = {
// }


// Instatiate your Tomagotchi
// let pet = new tomagotchi('Charlie');

function startAging (age) {
	const ageIncrease = setInterval(() => {
		age++;
		pet.age = age;
		$('#age').text(`I am ${age} years old!`);
	}, 5000)
}
// Display a character of your choice on the screen to represent your pet

$('#pet').append('<img src="images/dog.png"/>');

// Display the following metrics for your pet:
// Hunger (1-10 scale)
// Sleepiness (1-10 scale)
// Boredom (1-10 scale)
// Age



// Add buttons to the screen to feed your pet, turn off the lights, and play with your pet.

// DONE IN HTML


// Add the ability to name your pet.

$('input').on('keypress', (e) => {
    if(e.which == 13) {
       e.preventDefault();
       let pet = new tomagotchi($('#petName').val());
    }
});

// Style the page.
// Increase your pet's age every x minutes




// Increase your pet's Hunger, Sleepiness, and Bored metrics on an interval of your choosing.
// You pet should die if Hunger, Boredom, or Sleepiness hits 10.
// Morph your pet at certain ages.
// Animate your pet across the screen while it's alive.
// Extras
// Have your tomagotchi give birth to baby tomagotchi...
// ...with special powers (extend the class)!
// Add an excercise() method to your tomagotchi, that affects certain properties
// Add anything you can think of... use your imagination!
