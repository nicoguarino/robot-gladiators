// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {

    //repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {

        // Prompt to choose attack or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        if (promptFight === "fight" || promptFight === "FIGHT") {

            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {

                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                
                // Subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);

                console.log("playerMoney", playerMoney);

                break;

            } 
        }
            
        //generate random damage value based on player's attack power
        var damage = randomNumber(playerAttack - 3, playerAttack);

        enemyHealth = Math.max(0, enemyHealth - damage);

        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            // award player money for winning
            playerMoney = playerMoney + 20;

            // leave while() since enemy is dead
            break;

        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        playerHealth = Math.max(0, playerHealth - damage);

        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check player's health
        if (playerHealth <= 0) {

            window.alert(playerName + " has died!");

            // leave while() loop if player is dead
            break;

        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }    
};

var endGame = function() {
    
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great Job, you've survived the game! You now have a score of " + playerMoney + ".");

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
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;

            } else {
                window.alert("You don't have enough mulla baby!");
            }
            break;
        
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase atack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough mulla baby!");
            }
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

var startGame = function() {
            
    // resets player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    
    for(var i = 0; i < enemyNames.length; i++) {

        if(playerHealth > 0) {

            // let the player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemy to fight based on the index of the endemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth before starting new fight
            enemyHealth = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedEnemyName viariable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            // if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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



