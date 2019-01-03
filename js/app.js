// Tomagotchi Mini-Project
// Description
// Let's use our front-end web development skills to create a "living" pet! We'll use HTML, CSS, and JavaScript/jQuery to interact with our pet.

// Requirements
// Create a repo for your tomagotchi pet
// make a commit after you finish each one of the following



// Create a Class (JS Class, look at your notes if your forget) for your tomagotchi

// Instatiate your Tomagotchi




// Display a character of your choice on the screen to represent your pet



// Display the following metrics for your pet:
// Hunger (1-10 scale)
// Sleepiness (1-10 scale)
// Boredom (1-10 scale)
// Age



// Add buttons to the screen to feed your pet, turn off the lights, and play with your pet.

// DONE IN HTML


// Add the ability to name your pet.

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

class Tomagotchi {
	constructor (petName) {
		this.name = petName;
		this.hunger = 1;
		this.sleepiness = 1;
		this.boredom = 1;
		this.age = 0;
		$('h1').text(`Your Loyal Pet: ${this.name}`);
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
		if (this.sleepiness > 1) {
			this.sleepiness--;
		} else {
			game.lightsOn();
		}
	}
	getFed () {
		if (this.hunger > 1) {
			this.hunger--;
		}
		this.eating();
	}
	getPlay () {
		if (this.boredom > 1) {
			this.boredom--;
		}
	}
	die () {
		$('#pet img').attr("src","images/dead-cow.jpg");
		$('h1').text('YOU DIED!!!');
		clearInterval(game.secondsIncrease);
		$('button').hide();
		$('#pet img').velocity({
			height: "1000px",
		}, {
			duration: 5000,
		});
		$('body').css('background-color', 'darkred');
		window.setTimeout(function() {game.reloadBoard()}, 5000);
	}
	changeLook () {
		if (this.age === 5) {
			game.currentPhoto = "images/dog.png";
			if (game.lights === 1) {
				$('#pet img').attr("src","images/dog.png");
				this.fadeAppearance();
			}
		}
		if (this.age === 10) {
			game.currentPhoto = "images/olderdog.png";
			if (game.lights === 1) {
				$('#pet img').attr("src","images/olderdog.png");
				this.fadeAppearance();
			}
		}
		if (this.age === 20) {
			game.currentPhoto = "images/olderstill.jpg";
			if (game.lights === 1) {
				$('#pet img').attr("src","images/olderstill.jpg");
				this.fadeAppearance();
			}
		}
		if (this.age === 30) {
			game.currentPhoto = "images/dogphoto.jpg";
			if (game.lights === 1) {
				$('#pet img').attr("src","images/dogphoto.jpg");
				this.fadeAppearance();
			}
		}
		if (this.age === 40) {
			game.currentPhoto = "images/max2.jpg";
			if (game.lights === 1) {
				$('#pet img').attr("src","images/max2.jpg");
				this.fadeAppearance();
			}
		}
	}
	workOut () {
		this.getHungry();
		this.getHungry();
		this.getSleepy();
		this.getSleepy();
		this.getPlay();
		this.getPlay();
		this.getPlay();
		this.getPlay();
		this.excited();

	}
	fadeAppearance () {
		$('#pet img').velocity(
			"fadeIn", {
			duration: 1000,
			}
		)
	}
	wag () {
		$('#pet img').velocity({
			translateX: 100,
		}, {
			duration: 50,
		});
		$('#pet img').velocity({
			translateX: -100,
		}, {
			duration: 50,
		});
		$('#pet img').velocity({
			translateX: 0,
		}, {
			duration: 10,
		});
	}
	eating () {
		$('#pet img').velocity({
			opacity: 0.25,
		}, {
			duration: 50,
		});
		$('#pet img').velocity({
			opacity: 1,
		}, {
			duration: 50,
		});
	}
	excited () {
		$('#pet img').velocity({
			opacity: 0.25,
			translateX: 400,
		}, {
			duration: 50,
		});
		$('#pet img').velocity({
			opacity: .75,
			translateX: -400,
		}, {
			duration: 50,
		});
		$('#pet img').velocity({
			opacity: 1,
			translateX: 0,
		}, {
			duration: 50,
		});
	}
}

const game = {
	pet: null,
	gameTime: 0,
	lights: 1,
	secondsIncrease: null,
	currentPhoto: null,
	timePassing () {
		this.secondsIncrease = setInterval(() => {
			this.gameTime++;
			if (this.gameTime % 3 === 0) {
				this.pet.getHungry();
			};
			if (this.gameTime % 2 === 0) {
				this.pet.getBored();
			};
			if (this.gameTime % 4 === 0 && this.lights === 1) {
				this.pet.getSleepy();
			};
			if (this.lights === 0) {
				this.pet.getRested();
			};
			this.pet.getOld();
			this.displayStats();
			this.checkDeath();
			this.pet.changeLook();
		}, 1000)
	},
	displayStats () {
		$('#hunger').text(`My hunger is ${this.pet.hunger} out of 10`);
		$('#boredom').text(`My boredom is ${this.pet.boredom} out of 10`);
		$('#sleepiness').text(`My sleepiness is ${this.pet.sleepiness} out of 10`);
		$('#age').text(`I am ${this.pet.age} years old!`);
	},
	takeCare (e) {
		if ($(e.target).is('#feed') && this.lights === 1) {
			this.pet.getFed();
		} 
		if ($(e.target).is('#play') && this.lights === 1) {
			this.pet.getPlay();
			this.pet.wag();
		}
		if ($(e.target).is('#lights')) {
			if (this.lights === 1) {
				this.lightsOff();
			} else if (this.lights === 0) {
				this.lightsOn();
			}
		}
		if ($(e.target).is('#workOut') && this.lights === 1) {
			this.pet.workOut();
		}
		this.checkDeath();
		this.displayStats();
	},
	lightsOff () {
		this.lights = 0;
		$('body').css('background-color', 'rgb(211, 211, 211)');
		$('#pet img').attr("src","images/sleepingpanda.png");
	},
	lightsOn () {
		this.lights = 1;
		$('body').css('background-color', 'lightyellow');
		$('#pet img').attr("src", this.currentPhoto);
		this.pet.fadeAppearance();
	},
	checkDeath() {
		if (this.pet.hunger >= 10 || this.pet.boredom >= 10 || this.pet.sleepiness >= 10) {
			this.pet.die();
		}
	},
	reloadBoard() {
		location.reload();
	}
}



function startGame () {
		$('.stats').css("visibility", "visible");
		$('.actions').css("visibility", "visible");
		$('#pet').append('<img src="images/SFPET-1.gif"/>');
		$('#pet img').velocity(
			"fadeIn", {
			duration: 1000,
			}
		);
		game.pet = new Tomagotchi($('#petName').val());
		game.currentPhoto = "images/SFPET-1.gif";
    	game.timePassing();
    	game.displayStats();
}



$('input').on('keypress', (e) => {
    if(e.which == 13) {
    	e.preventDefault();
    	startGame();
    }
});

$('#petSubmit').on('click', (e) => {
	e.preventDefault();
	startGame();
});

$('button').on('click', (e) => {
	game.takeCare(e);
});


