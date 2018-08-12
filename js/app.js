// Capture x and y position of player and collision state
let playerPos = {
    x: null,
    y: null,
    collision: false
}

// Enemies our player must avoid
class Enemy{
    constructor(x = -100) {
        // credit to MDN math.Random page for this bit of code for random number between 0 and 2
        const randomNumber = Math.floor(Math.random() * Math.floor(3));

        this.yVals = [60,145,230]
        this.speed = Math.floor(Math.random() * (500 - 150) + 150);
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = this.yVals[randomNumber]
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + (this.speed*dt);
        if (this.x > 500) {
            this.reset();
        }
        this.collision();
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Reset enemies that have left play area
    reset() {
        const randomNumber = Math.floor(Math.random() * Math.floor(3));
        this.y = this.yVals[randomNumber];
        this.speed = Math.floor(Math.random() * (500 - 150) + 150);
        this.x = -100;
    }

    // Check for collision between enemy and player
    collision() {
        const x = Math.abs(this.x - playerPos.x);
        const y = Math.abs(this.y - playerPos.y);
        const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if(distance < 60) {
            playerPos.collision = true;
        }
    }
}

// Player object
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
    }

    // Update player position and reset player if they have collided with an enemy
    update() {
        playerPos.x = this.x;
        playerPos.y = this.y;
        if (playerPos.collision) {
            this.resetPlayer();
        }
    }

    // Draw player sprite on canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Reset player to starting position
    resetPlayer() {
        this.x = 200;
        this.y = 400;
        playerPos.collision = false;
    }

    // Move player in response to key presses
    handleInput(key) {
        if (key === 'left' && this.x > 0) {
            this.x = this.x - 100;
        }
        if (key === 'right' && this.x < 400) {
            this.x = this.x + 100;
        }
        if (key === 'up' && this.y > 0) {
            this.y = this.y - 85;
        }
        if (key === 'up' && this.y <= 0) {
            this.resetPlayer();
        }
        if (key === 'down'&& this.y < 400) {
            this.y = this.y + 85;
        }
    }
}

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
player = new Player();
while (allEnemies.length < 4) {
    allEnemies.push(new Enemy(Math.floor(Math.random() * (300 - 100) + 100)));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
