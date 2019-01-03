// Tomagotchi Mini-Project
// Description
// Let's use our front-end web development skills to create a "living" pet! We'll use HTML, CSS, and JavaScript/jQuery to interact with our pet.

// Requirements
// Create a repo for your tomagotchi pet
// make a commit after you finish each one of the following



// Create a Class (JS Class, look at your notes if your forget) for your tomagotchi
class Tomagotchi {
	constructor (petName) {
		this.name = petName;
		this.hunger = 1;
		this.sleepiness = 1;
		this.boredom = 1;
		this.age = 0;
		$('h1').text(`${petName}`);
		// $('#hunger').text(`My hunger is ${this.hunger} out of 10`);
		// displayHunger();
		// // $('#sleepiness').text(`My sleepiness is ${this.sleepiness} out of 10`);
		// displaySleepy();
		// // $('#boredom').text(`My boredom is ${this.boredom} out of 10`);
		// displayBored();
		// // $('#age').text(`I am ${this.age} years old!`);
		// displayAge();
		// startAging(this.age);
		// getHungry(this.hunger);
		// getSleepy(this.sleepiness);
		// getBored(this.boredom);
	}
	getHungry () {
		this.hunger++;
	}
	getSleepy () {
		this.sleepiness++;
	}
	getBored () {
		this.boredom++;
	}
	getOld () {
		this.age++;
	}
	getRested () {
		this.sleepiness--;
	}
	die () {
		$('#pet img').attr("src","images/dead-cow.jpg");
		$('h1').text('YOU DIED!!!');
		clearInterval(game.secondsIncrease);
	}
}

const game = {
	pet2: null,
	gameTime: 0,
	lights: 1,
	secondsIncrease: null,
	timePassing () {
		this.secondsIncrease = setInterval(() => {
			this.gameTime++;
			if (this.gameTime % 2 === 0) {
				this.pet2.getHungry();
			};
			if (this.gameTime % 3 === 0) {
				this.pet2.getBored();
			};
			if (this.gameTime % 4 === 0 && this.lights == 1) {
				this.pet2.getSleepy();
			};
			if (this.gameTime % 4 === 0 && this.lights == 0) {
				this.pet2.getRested();
			}
			this.pet2.getOld();
			this.displayStats();
			this.displayAge();
			this.checkDeath();
			// game.getHungry();
			// game.getSleepy();
			// game.getBored();
			// game.getOld();
		}, 1000)
	},
	displayAge () {
		$('#age').text(`I am ${game.pet2.age} years old!`)
	},
	displayStats () {
		$('#hunger').text(`My hunger is ${this.pet2.hunger} out of 10`);
		$('#boredom').text(`My boredom is ${this.pet2.boredom} out of 10`);
		$('#sleepiness').text(`My sleepiness is ${this.pet2.sleepiness} out of 10`);
	},
	takeCare (e) {
		if ($(e.target).is('#feed')) {
			this.pet2.hunger--;
		} 
		if ($(e.target).is('#play')) {
			this.pet2.boredom--;
		}
		if ($(e.target).is('#lights')) {
			if (this.lights == 1) {
				this.lightsOff();
			} else if (this.lights == 0) {
				this.lightsOn();
			}
		}
		this.displayStats();
	},
	lightsOff () {
		this.lights = 0;
		$('body').css('background-color', 'rgb(211, 211, 211)');
	},
	lightsOn () {
		this.lights = 1;
		$('body').css('background-color', 'lightyellow');
	},
	checkDeath() {
		if (this.pet2.hunger >= 10 || this.pet2.boredom >= 10 || this.pet2.sleepiness >= 10) {
			this.pet2.die();
		}
	}
}



function startGame () {
		$('#pet').append('<img src="images/dog.png"/>');
		game.pet2 = new Tomagotchi($('#petName').val());
    	game.timePassing();
}

// Instatiate your Tomagotchi
// let pet = new tomagotchi('Charlie');

// function startAging (age) {
// 	setInterval(() => {
// 		age++;
// 		pet2.age = age;
// 		// $('#age').text(`I am ${pet2.age} years old!`);
// 		displayAge();
// 	}, 5000)
// }
// function displayAge () {
// 	$('#age').text(`I am ${pet2.age} years old!`)
// }


// function getHungry (hunger) {
// 	const hungerIncrease = setInterval(() => {
// 		hunger++;
// 		pet2.hunger = hunger;
// 		// $('#hunger').text(`My hunger is ${pet2.hunger} out of 10`);
// 		displayHunger();
// 	}, 2000)
// }
// function displayHunger () {
// 	$('#hunger').text(`My hunger is ${pet2.hunger} out of 10`);
// }

// function getSleepy (sleepy) {
// 	const sleepyIncrease = setInterval(() => {
// 		sleepy++;
// 		pet2.sleepiness = sleepy;
// 		// $('#sleepiness').text(`My sleepiness is ${pet2.sleepiness} out of 10`);
// 		displaySleepy();
// 	}, 6000)
// }
// function displaySleepy () {
// 	$('#sleepiness').text(`My sleepiness is ${pet2.sleepiness} out of 10`);
// }


// function getBored (bored) {
// 	const boredIncrease = setInterval(() => {
// 		bored++;
// 		pet2.boredom = bored;
// 		// $('#boredom').text(`My boredom is ${pet2.boredom} out of 10`);
// 		displayBored();
// 	}, 3000)
// }
// function displayBored () {
// 	$('#boredom').text(`My boredom is ${pet2.boredom} out of 10`);
// }




// Display a character of your choice on the screen to represent your pet



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
    	startGame();
  //   	startAging();
		// getHungry();
		// getSleepy();
		// getBored();
    }
});

$('button').on('click', (e) => {
	game.takeCare(e);
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
