$(".gamebox").on("mousedown", function() {
    var original = $(this).css("background-color");
    var nextColor = newColor(original);
    flash($(this), nextColor, original);
    checkCorrect($(this).attr("id"));
});
$("button").on("click", function() {
    init();
});
$("input")

function newColor(original) {
    var numbers = original.match(/\d+/g).map(Number);
    for (var i = 0; i < numbers.length; i++) {
         numbers[i] = (numbers[i] + 50)%255;
    }
    var newC = "rgb("
    newC += numbers[0] + "," + numbers[1] + "," + numbers[2];
    newC += ")";
    return newC;
}

function beep(object) {
    id = object.attr("id");
    switch (id) {
        case "box1":
            var sound = new Audio(sounds[1]);
            sound.play();
            break;
        case "box2":
            var sound = new Audio(sounds[2]);
            sound.play();
            break;
        case "box3":
            var sound = new Audio(sounds[3]);
            sound.play();
            break;
        case "box4":
            var sound = new Audio(sounds[4]);
            sound.play();
            break;
    }
}

function flash(object, nextColor, original) {
    beep(object);
    object.animate({
        backgroundColor: nextColor,
    }, 100);
    object.animate({
        backgroundColor: original,
    }, 100);
}

var sounds = {
    1: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    2: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    3: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    4: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
    5: "wrong.wav"
}

var boxes = { 
    1: "#box1",
    2: "#box2",
    3: "#box3",
    4: "#box4"
};

function computerPlay(order) {
    for (let i = 0; i < order.length; i++) {
        let original = $(boxes[order[i]]).css("background-color");
        let nextColor = newColor(original);
        setTimeout(function() {
            flash($(boxes[order[i]]), nextColor, original);
        }, 1000*i);
    }
}

function generateRandom() {
    random = [];
    for (i=0; i<20; i++) {
        random.push(Math.floor(Math.random()*4)+1)
    }
    return random;
}

function checkCorrect(selection) {
    selection = "#" + selection;
    if (selection === boxes[order[position]]) {
        if (position < furthest -1) {
           position++;
        }
        else {
            if (furthest < 20) {
                furthest++;
                $("#count").text(furthest);
                setTimeout(function() {
                    computerPlay(order.slice(0,furthest));
                }, 2000);
                position = 0;
            }
            else if (furthest === 20) {
                $("h2").text("You win! Click 'Start' to play again!");
                $("h2").css("color", "green");
                order = [];
            }
        }
    }
    else {
        var sound = new Audio(sounds[5]);
        sound.play();
        console.log($("input").prop("checked"));
        if ($("input").prop("checked") === false) {
            setTimeout(function() {
                computerPlay(order.slice(0,furthest));
            }, 2000);
            position = 0;
        }
        else {
            setTimeout(function() {
            init();
            }, 2000);
        }
    }
}

function init() {
    //Declare three global variables to keep track of game stats.
    $("h2").css("color", "black");
    $("h2").html("Count:<span id='count'>1</span>")
    position = 0; //Starts at 0, out of 19.
    furthest = 1; //Starts at 1, out of 20.
    $("#count").text("1");
    order = generateRandom();
    computerPlay(order.slice(0,furthest));
}