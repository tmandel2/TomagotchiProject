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
		//sitck dog current phot
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
			// if (game.lights === 1) {
			// 	$('#pet img').attr("src", this.currentPhoto);
			// 	this.fadeAppearance();
			// }
		}
		if (this.age === 10) {
			this.currentPhoto = "images/olderdog.png";
			// if (game.lights === 1) {
			// 	// $('#pet img').attr("src","images/olderdog.png");
			// 	this.fadeAppearance();
			// }
		}
		if (this.age === 20) {
			this.currentPhoto = "images/olderstill.jpg";
			// if (game.lights === 1) {
			// 	$('#pet img').attr("src","images/olderstill.jpg");
			// 	this.fadeAppearance();
			// }
		}
		if (this.age === 30) {
			this.currentPhoto = "images/dogphoto.jpg";
			// if (game.lights === 1) {
			// 	$('#pet img').attr("src","images/dogphoto.jpg");
			// 	this.fadeAppearance();
			// }
		}
		if (this.age === 40) {
			this.currentPhoto = "images/max2.jpg";
			// if (game.lights === 1) {
			// 	$('#pet img').attr("src","images/max2.jpg");
			// 	this.fadeAppearance();
			// }
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
		$('h1').text('YOU DIED!!!');
		clearInterval(game.secondsIncrease);
		$('#pet img').attr("src","images/dead-cow.jpg");
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
		$('#pet img').attr("src","images/angelcat.jpg");
		$('h1').text('You lived to a ripe old age');
		clearInterval(game.secondsIncrease);
		// $('.actions').hide();
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

const game = {
	pet: null,
	gameTime: 0,
	lights: 1,
	secondsIncrease: null,
	currentPhoto: null,
	bonusGame: false,
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
		// this.currentPhoto = "images/SFPET-1.gif";
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
			}
		}, 1000)
	},
	displayStats () {
		$('#hunger').text(`My hunger is ${this.pet.hunger} out of 10`);
		$('#boredom').text(`My boredom is ${this.pet.boredom} out of 10`);
		$('#sleepiness').text(`My sleepiness is ${this.pet.sleepiness} out of 10`);
		$('#age').text(`I am ${this.pet.age} years old!`);
		if (this.pet.sleepiness >= 8 || this.pet.boredom >= 8 || this.pet.hunger >= 8) {
			$('.stats').css('background-color', 'orangered');
		} else {
			$('.stats').css('background-color', 'pink');
		}
		this.pet.checkDeath();
		if (game.bonusGame) {
			$('body').css('background-color', `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`);
		}
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
	reloadBoard () {
		location.reload();
	},
	resetGoodBoard () {
    	game.bonusGame = true;
		$('.stats').css("visibility", "hidden");
		$('.actions').css("visibility", "hidden");
		$('#action-display').css("visibility", "hidden");
		$('form').css("visibility", "visible");
		$('form').css("height", "100px");
		$('#pet img').css("visibility", "hidden");
		$('#petName').val('');
	}
}


// function startBonusGame () {
// 	$('.stats').css("visibility", "visible");
// 	$('.actions').css("visibility", "visible");
// 	$('#action-display').css("visibility", "visible");
// 	$('#pet').append('<img src="images/SFPET-1.gif"/>');
// 	$('#pet img').velocity(
// 		"fadeIn", {
// 			duration: 1000,
// 		}
// 	);
// 	game.pet = new Tomagotchi($('#petName2').val());
// 	game.currentPhoto = "images/SFPET-1.gif";
//     game.displayStats();
//     game.timePassing();
// }



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
	game.takeCare(e);
});

// $('#petName2').on('keypress', (e) => {
//     if(e.which == 13) {
//     	e.preventDefault();
//     	startBonusGame();
//     }
// });

// $('#petSubmit2').on('click', (e) => {
// 	alert("heard petSubmit2");
// 	e.preventDefault();
// 	startBonusGame();
// });


