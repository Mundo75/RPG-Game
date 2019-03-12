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
        image: "assets/images/obi-wan.jpg",
        retaliation: 15
      },

      "\"Wild Man\" Will Mason": {
        name: "\"Wild Man\" Will Mason",
        life: 120,
        attack: 10,
        audio: "http://www.moviewavs.com/php/sounds/?id=bst&media=MP3S&type=Movies&movie=Airplane&quote=amphetim.txt&file=amphetim.mp3",
        image: "assets/images/luke-skywalker.jpg",
        retaliation: 5
      },
      "Gerri \"The Dragon\" Kania": {
        name: "Gerri \"The Dragon\" Kania",
        life: 180,
        attack: 7,
        audio: "../assets/Audio/WWE Wrestling.mp3",
        image: "assets/images/darth-sidious.png",
        retaliation: 20
      },
      "Timur \"The Siberian Express\" Dury": {
        name: "Timur \"The Siberian Express\" Dury",
        life: 160,
        attack: 6,
        audio: "http://www.moviewavs.com/php/sounds/?id=gog&media=MP3S&type=Movies&movie=Team_America_World_Police&quote=sostupid.txt&file=sostupid.mp3",
        image: "assets/images/darth-maul.jpg",
        retaliation: 25
      }
    };
  
  //Play sound byte at page open   
  $("#playByPlay").append("You managers had better come up with the correct root cause and make the customer happy, or i'll ship the lot of you to our Philadelphia office.  I don't care if you have to fight to the death.")
  
    
  
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
  
    
  
          // Check for win the game
         

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
  