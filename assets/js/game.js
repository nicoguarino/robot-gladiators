var fight = function(enemy) {
    

    //repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {

        // Prompt to choose attack or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        if (promptFight === "fight" || promptFight === "FIGHT") {

            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {

                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                
                // Subtract money from playerMoney for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);

                console.log("player Money", playerInfo.money);

                break;

            } 
        }
            
        //generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);

        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;

            // leave while() since enemy is dead
            break;

        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);

        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {

            window.alert(playerInfo.name + " has died!");

            // leave while() loop if player is dead
            break;

        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }    
};

var endGame = function() {
    
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great Job, you've survived the game! You now have a score of " + playerInfo.money + ".");

    } else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {

        //restart the game
        startGame();

    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {

    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to refill your health, upgrade your attack, or leave the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":

            playerInfo.refillHealth();
            break;
        
        case "UPGRADE":
        case "upgrade":

            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            // do nothing, so the function will end
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");
            
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// function to generate a random numeric value
var randomNumber = function() {

    var value = Math.floor(Math.random() * (max - min + 1));

    return value;
};

var getPlayerName() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
      }

    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,

    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },

    refillHealth: function () {
        
        if (this.money >= 7) {

            window.alert("Refilling player's health by 20 for 7 dollars.");

            this.health += 20;
            this.money -= 7;

            
        } else {
            window.alert("You don't have enough money!");
        }
    },

    upgradeAttack: function () {
        if (this.money >= 7) {

            window.alert("Upgrading player's attack by 6 for 7 dollars.");

            this.attack += 6;
            this.money -= 7;
            
        } else {
           window.alert("You don't have enough monies...broke bitch"); 
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

var startGame = function() {
            
    // resets player stats
    playerInfo.reset();
    
    for(var i = 0; i < enemyInfo.length; i++) {

        if(playerInfo.health > 0) {

            // let the player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemy to fight based on the index of the endemyNames array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedEnemyName viariable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                    
                if (storeConfirm) {
                    shop();
                }
            }

        } else {

            window.alert("You have lost your robot in battle! Game Over!");
            break;  
        }
    }

   endGame();
};

startGame();



