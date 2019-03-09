//$(document).ready(function() {

    //Set up object storing manager properties 
    var medAireManagers = {

        "Diann": {
            name: "Diann \"the Dream\" Weaverling",
            image: "Assets/Images/diann.png",
            audio: "",
            life: 100,
            attack: 10,
            returnAttack: 13,
        },


        "Timur": {
            name: "Timur \"The Siberian Express\" Dury",
            image: "Assets/Images/Timur.jpg",
            audio: "",
            life: 140,
            attack: 15,
            returnAttack: 10,

        },
            

        "Will": {
            name: "\"wild\" Will Mason",
            image: "Assets/Images/will.png",
            audio: "",
            life: 120,
            attack: 8,
            returnAttack: 8,
        },
    
        "Gerri": {
            name: "Gerri \"The Dragon\" Kania",
            image: "Assets/Images/gerri.jpg",
            audio: "",
            life: 120,
            attack: 8,
            returnAttack: 8,

        },
    };

    //Declare global variables
    var villians = [];
    var hero;
    var opponent;
    
    //Create fighter and Get fighter images to the screen for player selection. Will require new divs written to HTML
    var setUpGame = function(manager, managerDiv) {

        var fighterCard = $("<div class='manager' data=name='" + medAireManagers.name + "'>");
        var fightername = $("<div class='fighter-name'>").text(medAireManagers.name);
        var fighterImage = $("img alt='image' class='manager-image'>").attr("src", medAireManagers.image);
        var fighterLife = $("<div class='manager-life'>").text(medAireManagers.life);
        fighterCard.append(fightername).append(fighterImage).append(fighterLife);
        $("managerArea").append(fighterCard);
    };

    var startGame = function() {

        for (var key in medAireManagers) {
            setUpGame(medAireManagers[key], ".breakRoom");
        };
    };
    startGame();
    
//});