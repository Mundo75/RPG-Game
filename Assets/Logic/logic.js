$(document).ready(function() {
   
  // Declare global variables and object for fighter properties
    
    var hero;
    var villians = [];
    var evilManager;
    var round = 1;
    var kills = 0;
    
    var fighters = {
      "Diann \"The Dream\" Weaverling": {
        name: "Diann \"The Dream\" Weaverling",
        life: 140,
        attack: 8,
        audio: "http://www.moviewavs.com/php/sounds/?id=bst&media=MP3S&type=TV_Shows&movie=Seinfeld&quote=sdingo.txt&file=sdingo.mp3",
        image: "Assets/Images/diann.jpg",
        retaliation: 15
      },

      "\"Wild Man\" Will Mason": {
        name: "\"Wild Man\" Will Mason",
        life: 120,
        attack: 10,
        audio: "http://www.moviewavs.com/php/sounds/?id=bst&media=MP3S&type=Movies&movie=Airplane&quote=amphetim.txt&file=amphetim.mp3",
        image: "Assets/Images/Will.jpg",
        retaliation: 5
      },
      "Gerri \"The Dragon\" Kania": {
        name: "Gerri \"The Dragon\" Kania",
        life: 180,
        attack: 7,
        audio: "../assets/Audio/WWE Wrestling.mp3",
        image: "Assets/Images/gerri.jpg",
        retaliation: 20
      },
      "Timur \"The Siberian Express\" Dorri": {
        name: "Timur \"The Siberian Express\" Dorri",
        life: 160,
        attack: 6,
        audio: "http://www.moviewavs.com/php/sounds/?id=gog&media=MP3S&type=Movies&movie=Team_America_World_Police&quote=sostupid.txt&file=sostupid.mp3",
        image: "Assets/Images/Timur.jpg",
        retaliation: 25
      }
    };
  
  //Add CEO content to play by play text div 
  $("#playByPlay").append("You managers had better come up with the correct root cause and make the customer happy, or i'll ship the lot of you to our Philadelphia office.  I don't care if you have to fight to the death.")
  
    
  
    //Set up the game board and build the fighter cards to display on the board based on the properties in the "fighters" object
    var initialGameBoard = function(manager, gameBoard) {
      
      var managerCard = $("<div class='manager' data-name='" + manager.name + "'>");
      var managerName = $("<div class='managerTitle'>").text(manager.name);
      var managerLife = $("<div class='managerLife'>").text(manager.life);
      var managerImage = $("<img alt='image' class='managerImage'>").attr("src", manager.image);
      
      managerCard.append(managerName).append(managerImage).append(managerLife);
      $(gameBoard).append(managerCard);
    };
  
    //write fighter cards to the DOM at the div class "breakRoom"
    var gameStart = function() {
      
      for (var key in fighters) {
        initialGameBoard(fighters[key], "#breakRoom");
      }
    };
    gameStart();

     // Insert text div to display the game text play by play commentary and comments from the CEO
     var gameText = function(showPlayByPlay) {
      
      var gamePlayByPlay = $("#playByPlay");
      var newMessage = $("<div>").text(showPlayByPlay);
      gamePlayByPlay.append(newMessage);
    };
  
    // Function to clear the play by play text div
    var clearPlayByPlay = function() {
      var gameMessage = $("#playByPlay");
  
      gameMessage.text("");
    };
  
    // select the hero with an on click event after all fighters have been pushed to the #breakRoom area
    $("#breakRoom").on("click", ".manager", function() {
      
      var name = $(this).attr("data-name");
      clearPlayByPlay();
      $("#CEO").hide("slow")
      
      if (hero === hero) {
        
        hero = fighters[name];

        for (var key in fighters) {
          if (key !== name) {
            villians.push(fighters[key]);
          }
        }
  
        // show cards of available opponents to fight
        $("#breakRoom").hide();
        refreshStats(hero, "#Hero");
        availableVillians(villians);
      }

    });
    
    var availableVillians = function(badGuys) {
      for (var i = 0; i < badGuys.length; i++) {
        initialGameBoard(badGuys[i], "#badGuyList");
      }
    };
    // select opponent with an on click event
    $("#badGuyList").on("click", ".manager", function() {
        var name = $(this).attr("data-name");
  
      // Add new opponent
      if ($("#opponent").children().length === 0) {
        $(this).remove();
        clearPlayByPlay();
        evilManager = fighters[name];
        refreshStats(evilManager, "#opponent");
      }
    });
  
    //creat on click event to trigger the fight action -- add and/or subtract life points based on the attackers attack value
    //trigger text messages after each attack to indicate damage done and update fighter stats on thier card
    $("#actionButton").on("click", function() {
     
      if ($("#opponent").children().length !== 0) {
        
        var attackMessage = "Good Point!!  You stun " + evilManager.name + " and take " + hero.attack * round + " life points.";
        var counterAttackMessage = "But " + evilManager.name + " strikes back hard taking " + evilManager.retaliation + " of your life points.";
        clearPlayByPlay();
  
        evilManager.life -= hero.attack * round;
               
        if (evilManager.life > 0) {
          
          refreshStats(evilManager, "#opponent");
          gameText(attackMessage);
          gameText(counterAttackMessage);
  
          // update life and attack values for next round
          hero.life -= evilManager.retaliation;
          refreshStats(hero, "#Hero");
  
          //Check for loss of round - if hero life is = to 0 alert loss message in Play by play text box
          if(hero.life <= 0) {
            $("#badGuyList").hide();
            clearPlayByPlay();
            $("#CEO").show("slow");
            fightAgain("You Lose!!! You have been transferred to PHL!!!      GAME OVER!!!");
            $("#actionButton").off("click");
          }
        }
        else {
          $("#opponent").empty();
  
          var gameStateMessage = "You have defeated " + evilManager.name + ", you can choose to fight another enemy.";
          gameText(gameStateMessage);
          kills++;
  
          // Check for win the game
          if (kills >= villians.length) {
            clearPlayByPlay();
            $("#actionButton").off("click");
            $("#CEO").show("slow")
            fightAgain("You Won!!!! The Client is Happy!!!");
          }
        }
        round++;
      }
      else {
        // Show text to alert the player that they have not selected an opponent.
        clearPlayByPlay();
        gameText("No soup for you PICK ANOTHER MANAGER TO FIGHT!!");
      }
    });
    //change the fighter stats to reflect the results of their present fight.  Change life on fighter card
    var refreshStats = function(fighterCard, gameBoardArea) {
      
      $(gameBoardArea).empty();
      initialGameBoard(fighterCard, gameBoardArea);
    };

    var fightAgain = function(finalText) {
        var restart = $("<button class='centerSection' id='restartButton'>Who's Next</button>").click(function() {
        location.reload();
        
      });
              
      // Clear play by play text box and change font color to red for final win/loss message
      var gameState = $("<div>").text(finalText);
      $("#playByPlay").css("color", "red");
      $("#playByPlay").css("text-align", "center");
      $("#playByPlay").append(gameState);
      $("body").append(restart);
    };
  });
  