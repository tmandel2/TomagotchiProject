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







// 
// 
// CLASS ESTABLISHED
// 
// 





class Tomagotchi {
	constructor (petName) {
		this.name = petName;
		this.hunger = 1;
		this.sleepiness = 1;
		this.boredom = 1;
		this.age = 0;
		this.currentPhoto = "images/SFPET-1.gif";
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
		if (this.age === 5) {
			this.currentPhoto = "images/dog.png";
		}
		if (this.age === 10) {
			this.currentPhoto = "images/olderdog.png";
		}
		if (this.age === 20) {
			this.currentPhoto = "images/olderstill.jpg";
		}
		if (this.age === 30) {
			this.currentPhoto = "images/dogphoto.jpg";
		}
		if (this.age === 40) {
			this.currentPhoto = "images/max2.jpg";
		}
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
		clearInterval(game.secondsIncrease);
		this.currentPhoto = "images/dead-cow.jpg";
		$('h1').text(`YOU DIED!!! ${game.round - 1} rounds completed`);
		$('#pet img').attr("src", this.currentPhoto);
		$('button').hide();
		$('#pet img').velocity({
			height: "1000px",
		}, {
			duration: 5000,
		});
		$('body').css('background-color', 'darkred');
		window.setTimeout(function() {game.reloadBoard()}, 5000);
	}
	goodDeath () {
		clearInterval(game.secondsIncrease);
		this.currentPhoto = "images/angelcat.jpg";
		$('#pet img').attr("src", this.currentPhoto);
		$('h1').text('You lived to a ripe old age');
		$('body').css('background-color', 'white');
		$('#pet img').velocity({
			height: "1000px",
		}, {
			duration: 1500,
		});
		$('#pet img').velocity({
			height: "0px",
		}, {
			duration: 1500,
		});
		window.setTimeout(game.resetGoodBoard, 5000);
	}
	workOut () {
		for (let i = 1; i <= 4; i++) {
			this.getPlay();
			if (i % 2 === 0) {
				this.getHungry();
				this.getSleepy();
			}
		}
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
		$('#action-display').text('I am a good boy');
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
		$('#action-display').text('Yum Yum Yum!');
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
		$('#action-display').text('What a workout!');
	}
	checkDeath() {
		if (this.hunger >= 10 || this.boredom >= 10 || this.sleepiness >= 10) {
			this.die();
		}
		if (this.age >= 50) {
			this.goodDeath();
		}
	}
}






// 
// 
// GAME OBJECT
// 
// 





const game = {
	pet: null,
	gameTime: 0,
	lights: 1,
	secondsIncrease: null,
	currentPhoto: null,
	bonusGame: false,
	pause: false,
	round: 1,
	startGame () {
		this.pet = new Tomagotchi($('#petName').val());
		$('.stats').css("visibility", "visible");
		$('.actions').css("visibility", "visible");
		$('#action-display').css("visibility", "visible");
		$('form').css("visibility", "hidden");
		$('form').css('height', '0px');
		$('#pet img').attr("src", this.pet.currentPhoto);
		$('#pet img').css("visibility", "visible");
		$('#pet img').css('height', '250px');
		$('#pet img').velocity(
			"fadeIn", {
				duration: 1000,
			}
		);
		this.timePassing();
		this.displayStats();
	},
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
			if (this.lights === 1) {
				$('#pet img').attr("src", this.pet.currentPhoto);
				this.randomDance();
			}
		}, 1000/this.round)
	},
	displayStats () {
		$('#hunger').text(`My hunger is ${this.pet.hunger} out of 10`);
		$('#boredom').text(`My boredom is ${this.pet.boredom} out of 10`);
		$('#sleepiness').text(`My sleepiness is ${this.pet.sleepiness} out of 10`);
		$('#age').text(`I am ${this.pet.age} years old!`);
		if (this.pet.sleepiness >= 8 || this.pet.boredom >= 8 || this.pet.hunger >= 8) {
			$('.stats').css('background-color', 'orangered');
		} else {
			$('.stats').css('background-color', 'lightblue');
		}
		this.pet.checkDeath();
		if (this.bonusGame) {
			$('body').css('background-color', `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`);
		}
	},
	takeCare (pressedButton) {
		if (pressedButton.is('#feed') && this.lights === 1 && this.pause === false) {
			this.pet.getFed();
		} 
		if (pressedButton.is('#play') && this.lights === 1 && this.pause === false) {
			this.pet.getPlay();
			this.pet.wag();
		}
		if (pressedButton.is('#lights') && this.pause === false) {
			if (this.lights === 1) {
				this.lightsOff();
			} else if (this.lights === 0) {
				this.lightsOn();
			}
		}
		if (pressedButton.is('#workOut') && this.lights === 1 && this.pause === false) {
			this.pet.workOut();
		}
		if (pressedButton.is('#pause') && this.pause === false) {
			return this.pauseGame();
		}
		if (pressedButton.is('#pause') && this.pause === true) {
			return this.unPauseGame();
		}
		this.pet.checkDeath();
		this.displayStats();
	},
	lightsOff () {
		this.lights = 0;
		$('body').css('background-color', 'rgb(211, 211, 211)');
		$('#pet img').attr("src","images/sleepingpanda.png");
		$('#action-display').text('Good Night, Moon');
		$('#lights').css('background-color', 'gray')
	},
	lightsOn () {
		this.lights = 1;
		$('body').css('background-color', 'lightyellow');
		$('#pet img').attr("src", this.pet.currentPhoto);
		$('#lights').css('background-color', 'yellow');
		this.pet.fadeAppearance();
	},
	pauseGame () {
		clearInterval(this.secondsIncrease);
		$('#pause').css("background-color", "black");
		$('#pause').css("color", "white");
		$('#pet img').attr("src", "images/pausebutton.png");
		return this.pause = true;
	},
	unPauseGame () {
		this.timePassing();
		$('#pause').css("background-color", "white");
		$('#pause').css("color", "black");
		if (this.lights === 1) {
			$('#pet img').attr("src", this.pet.currentPhoto);
		}
		if (this.lights === 0) {
			$('#pet img').attr("src","images/sleepingpanda.png");
		}
		return this.pause = false;
	},
	randomDance () {
		$('#pet img').velocity({
			translateX: Math.floor(Math.random() * 201 - 100),
		}, {
			duration: 0,
		});
	},
	reloadBoard () {
		location.reload();
	},
	resetGoodBoard () {
    	game.bonusGame = true;
    	game.round++,
		$('.stats').css("visibility", "hidden");
		$('.actions').css("visibility", "hidden");
		$('#action-display').css("visibility", "hidden");
		$('form').css("visibility", "visible");
		$('form').css("height", "100px");
		$('#pet img').css("visibility", "hidden");
		$('#petName').val('');
	}
}




// 
// 
// LISTENERS
// 
// 





$('#petName').on('keypress', (e) => {
    if(e.which == 13) {
    	e.preventDefault();
    	game.startGame();
    }
});

$('#pet-form').on('submit', (e) => {
	e.preventDefault();
	game.startGame();
});

$('button').on('click', (e) => {
	game.takeCare($(e.target));
});
