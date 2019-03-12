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
      "Timur \"The Siberian Express\" Dury": {
        name: "Timur \"The Siberian Express\" Dury",
        life: 160,
        attack: 6,
        audio: "http://www.moviewavs.com/php/sounds/?id=gog&media=MP3S&type=Movies&movie=Team_America_World_Police&quote=sostupid.txt&file=sostupid.mp3",
        image: "Assets/Images/Timur.jpg",
        retaliation: 25
      }
    };
  
 
    
  
    //Set up the game board and build the fighter cards to display on the board based on the properties in the "fighters" object
    var initialGameBoard = function(manager, gameBoard) {
      
      var managerCard = $("<div class='manager' data-name='" + manager.name + "'>");
      var managerName = $("<div class='managerTitle'>").text(manager.name);
      var managerImage = $("<img alt='image' class='managerImage'>").attr("src", manager.image);
      var managerLife = $("<div class='managerLife'>").text(manager.life);

      
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
  
     
          // Check for win the game
          if (kills >= villians.length) {
            clearPlayByPlay();
            $("#actionButton").off("click");
            $("#CEO").show("slow")
            fightAgain("You Won!!!! The Client is Happy!!!");
          }
        }
        round++;
 
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