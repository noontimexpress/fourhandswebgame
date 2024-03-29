let knn;
var hzero = document.getElementById("hzero")
var hfive = document.getElementById("hfive")
var hten = document.getElementById("hten")
const modal = document.querySelector('.modal');
var computertotal;
var cool;
var playertotal;

function setup() {
    createCanvas(320, 240);
    video = createCapture(VIDEO);
    video.size(320, 240);
    features = ml5.featureExtractor('MobileNet', modelReady);
    knn = ml5.KNNClassifier();
    x = width / 2;
    y = height / 2;
}

function guessedCorrect(cool){
    console.log(cool);
    console.log(playertotal + computertotal);
    if (cool == playertotal + computertotal) {
        result.innerHTML = "<h1 class='text-win'>You Win</h1>";
        modal.style.display = 'block';
        return 'win';
    }
    else {
        result.innerHTML = "<h1 class='text-win'>You Lose</h1>";
        modal.style.display = 'block';
        return 'lose';
    }
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
        }
    if (result.label == "zero") {
            hzero.style.color = "#dc3545";
            playertotal = 0;
        }
    if (result.label == "five") {
            hfive.style.color = "#dc3545";
            playertotal = 5;
        }
    if (result.label == "five1") {
            hfive.style.color = "#dc3545";
            playertotal = 5;
        }
    if (result.label == "ten") {
            hten.style.color = "#dc3545";
            playertotal = 10;
        }
    }

function identifyHands() {
    if (knn.getNumLabels() > 0) {
        const logits = features.infer(video);
        knn.classify(logits, gotResult);
    }
}

function keyPressed() {
    const logits = features.infer(video);
    var i = 0;
    var j = 21;
    if (key == '0') {
        setInterval(function() {
            if (i < j) {
                knn.addExample(logits, 'zero');
                console.log('zero');
                i++;
            };
        }, 200);
    }
    if (key == '1') {
        setInterval(function() {
            if (i < j) {
                knn.addExample(logits, 'five');
                console.log('five');
                i++;
            };
        }, 200);
    }
    if (key == '2') {
        setInterval(function() {
            if (i < j) {
                knn.addExample(logits, 'five1');
                console.log('five1');
                i++;
            };
        }, 200);
    }
    if (key == '3') {
        setInterval(function() {
            if (i < j) {
                knn.addExample(logits, 'ten');
                console.log('ten');
                i++;
            };
        }, 200);
    } else if (key == 's') {
        knn.save('model.json');
    }
}


function modelReady() {
    console.log('model ready!');
    knn.load('model.json', function() {
        console.log('knn loaded');
    });
};

let speechRec = new p5.SpeechRec('en-US', gotSpeech);

var numbers = document.getElementById("numbers");
var button = document.getElementById("start");
var zero = document.getElementById("zero")
var five = document.getElementById("five")
var ten = document.getElementById("ten")
var fifteen = document.getElementById("fifteen")
var twenty = document.getElementById("twenty")

var firsthand = document.getElementById("firsthand")
var secondhand = document.getElementById("secondhand")

var time = 4;
var myInterval;

function gotSpeech() {
    if (speechRec.resultValue) {
        cool = speechRec.resultString;
        if (cool == "0") {
            zero.style.color = "#dc3545";
        }
        if (cool == "5") {
            five.style.color = "#dc3545";
        }
        if (cool == "10") {
            ten.style.color = "#dc3545";
        }
        if (cool == "15") {
            fifteen.style.color = "#dc3545";
        }
        if (cool == "20") {
            twenty.style.color = "#dc3545";
        }
    }
}

function getComputerChoice() {
    const rand = Math.random();
    if (rand < 0.25) {
        firsthand.src = 'fistleft.png';
        secondhand.src = 'fistright.png';
        console.log('0,0');
        computertotal = 0;
    }
    if (rand <= .50) {
        firsthand.src = 'fistleft.png';
        secondhand.src = 'fiveright.png';
        console.log('0,5');
        computertotal = 5;
    } else if (rand <= .75) {
        firsthand.src = 'fiveleft.png';
        secondhand.src = 'fistright.png';
        console.log('5,0');
        computertotal = 5;
    } else {
        firsthand.src = 'fiveleft.png';
        secondhand.src = 'fiveright.png';
        console.log('5,5');
        computertotal = 10;
    }
}

function resetround() {
    modal.style.display = 'none';
    zero.style.color = "#333333";
    five.style.color = "#333333";
    ten.style.color = "#333333";
    fifteen.style.color = "#333333";
    twenty.style.color = "#333333";
    hzero.style.color = "#333333";
    hfive.style.color = "#333333";
    hten.style.color = "#333333";
}

button.addEventListener("click", function(event) {
    resetround();
    speechRec.start();
    clearInterval(myInterval);
    myInterval = setInterval(function() {
        time--;
        if (time == -1) {
            button.innerHTML = "Again";
            clearInterval(myInterval);
            time = 4;
        } else {
            button.innerHTML = "Start";
            numbers.innerHTML = time;
        }
    }, 1000);
    setTimeout(getComputerChoice(), 3000);
    setTimeout(identifyHands(), 3000);
    setTimeout(() => { guessedCorrect(cool, playertotal); }, 5000);
})