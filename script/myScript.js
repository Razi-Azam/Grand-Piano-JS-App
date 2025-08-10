// Preload the background images for light on and off
const bgLightOff = new Image();
bgLightOff.src = "./images/bgStage1.jpg";

const bgLightOn = new Image();
bgLightOn.src = "./images/bgStage2.jpg";


//get the elements light toggle button, piano keys, text, and image
const toggleButton = document.getElementById('toggleButton');
const displayKey = document.getElementById("pianoKey");

let noteTimer = null;
const NOTE_DISPLAY_MS = 800; // in ms - how long note stays visible

const displayText = document.getElementById("displayText");
const pianoImage = document.querySelector(".piano");
var bodyStyle = document.body.style;

//switch on/off light
toggleButton.addEventListener('click', function() {
  if (toggleButton.classList.contains('on')) {
    toggleButton.innerText = 'Light Off';
    bodyStyle.background = `url("./images/bgStage1.jpg") no-repeat fixed center`;
    bodyStyle.backgroundSize = "cover";
  } else {
    toggleButton.innerText = 'Light On';
    bodyStyle.background = `url("./images/bgStage2.jpg") no-repeat fixed center`;
    bodyStyle.backgroundSize = "cover";
  }
  toggleButton.classList.toggle('on');
});

//select all the div that represents the piano keys
const pianoKeyDivs = document.querySelectorAll(".pianoKey");

pianoKeyDivs.forEach(pianoKey => {
    pianoKey.addEventListener("mouseout", hideDisplayElements);
    pianoKey.addEventListener("keyup", hideDisplayElements);
    pianoKey.addEventListener("click", () => playPiano(pianoKey, "click"));
    pianoKey.addEventListener("mouseover", () => playPiano(pianoKey, "mouseover"));
});

//for keydown event
document.addEventListener('keydown', function(event) {
    const keyMap = {
        "A": "C3",  "W": "C#3", "S": "D3",  "E": "D#3",
        "D": "E3",  "F": "F3",  "T": "F#3", "G": "G3",
        "Y": "G#3", "H": "A3",  "U": "A#3", "J": "B3",
        "K": "C4"
    };

    const boardkey = event.key.toUpperCase();
    const keyNote = keyMap[boardkey];

    if (keyNote) {
        playPiano(keyNote, "keydown");
    }
});

//definition of the function named playPiano
function playPiano(pianoKey, eventType) {
    if(eventType === "keydown") {
        const pianoAudio = document.getElementById(pianoKey);
        pianoAudio.currentTime = 1;
        displayPianoNote(pianoKey);
        pianoAudio.play();  
    }
    else {
        const pianoAudio = document.getElementById(pianoKey.dataset.note);
        pianoAudio.currentTime = 1;
        displayPianoNote(pianoAudio.id);    
        pianoAudio.play();
    }
}

//create function to display the piano note
//and change the background color of the body
function displayPianoNote(TextNote) {
    const keyElement = document.getElementById(TextNote);
    const keyNotes = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4" ];

    // if(keyNotes.includes(TextNote)) {
    //     displayKey.innerText = TextNote;
    // }

    if (!keyNotes.includes(TextNote)) return;

    displayKey.textContent = TextNote;

    //retrigger CSS animation
    displayKey.classList.remove('visible'); //emove animation class
    //force browser to reflow (reset animation)
    void displayKey.offsetWidth;
    displayKey.classList.add('visible'); //add animation class back
    
    if (noteTimer) clearTimeout(noteTimer);
    
    noteTimer = setTimeout(() => {
        displayKey.classList.remove('visible');
    }, NOTE_DISPLAY_MS);
}

function hideDisplayElements() {
    if (noteTimer) clearTimeout(noteTimer);
  displayKey.classList.remove('visible');
}