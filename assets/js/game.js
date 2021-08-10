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
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.").toLowerCase();
        console.log(promptFight);
        
        if (promptFight === "fight" || promptFight === "FIGHT") {

            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {

                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                
                // Subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;

                console.log("playerMoney", playerMoney);

                break;

            } 
        }
            
        // remove enemy's health by subtracting the amount set in the playerAttack variable.
        enemyHealth = enemyHealth - playerAttack;

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

        // remove player's health by subtracting the amount set in the enemyAttack variable.
        playerHealth = playerHealth - enemyAttack;

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
            enemyHealth = 50;

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedEnemyName viariable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

        } else {

            window.alert("You have lost your robot in battle! Game Over!");
            break;  
        }
    }

   endGame();
};

startGame();



