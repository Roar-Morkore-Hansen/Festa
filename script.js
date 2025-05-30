
// Count lines in verse
const linePerVerse = document.querySelector(".verse").querySelectorAll(".line").length;

// Count num of verses
const lastVerseId = document.querySelectorAll(".verse").length - 1;

// Count of marked line
let lineCount = 0; 

// Number of lines
var maxLineNum = document.querySelectorAll(".line").length

// Turn loggin on or off with single variable.
var print_log = true;

function log(string) {
    if (print_log == true) {
        console.log(string);
    }
}

function getSelectedVerse() {
    return document.querySelector(".selected");
}

function getSelectedVerseId() {
    return getSelectedVerse().id;
}

// Deselecet prevoius and select new
function selectVerse(newId) {
    log("[selectVerse] Selected id: " + newId);

    if (newId >= 0 && newId <= lastVerseId) {   
        prevId = getSelectedVerseId();
        document.getElementById(prevId).classList.toggle("selected");
        document.getElementById(newId).classList.toggle("selected");
    }
};

function selectVerseKey(key) {
    var selectedVerseId = getSelectedVerseId();
    log("[selectVerseKey] selectedVerse: " + selectedVerseId)
    if (key == "Enter") {
        verse = Number(selectedVerseId) + 1;
        selectVerse(verse)
        log("[selectVerseKey enter] verseDown: " + verse)
    }
    else if (key == "Backspace") {
        verse = Number(selectedVerseId) - 1
        selectVerse(verse)
        log("[selectVerseKey backspace] verseUp: " + verse)
    }
}

function toggleMarkId(lineId) {
    const span = document.getElementById("line-" + lineId);
    toggleMark(span);
}

function toggleMark(span) {
    if (!span) return;
  
    const isMarked = span.querySelector("mark");
  
    if (isMarked) {
      span.innerHTML = isMarked.innerHTML;
    } else {
      span.innerHTML = `<mark>${span.innerHTML}</mark>`;
    }
}

function toggleMarkArrow(key) {
    var selectedVerseId = getSelectedVerseId();
    maxLineNum = document.querySelectorAll(".line").length

    if (key === "ArrowDown" && lineCount <= (maxLineNum - 1)) {
        lineCount++;
        toggleMarkId(lineCount);
    } else if (key === "ArrowUp" && lineCount != 0) {
        toggleMarkId(lineCount);
        lineCount--;
    }


    if (lineCount < (selectedVerseId * linePerVerse)) {
        selectVerse(Number(selectedVerseId) - 1);
    } else if (lineCount > ((selectedVerseId + 1) * (linePerVerse))) {
        selectVerse(Number(selectedVerseId) + 1);
    }

    log(`[toggleMarkArrow] selectedVerseId: ${selectedVerseId}, lineCount: ${lineCount}`);
}

bool = false
function toggle() {
    if (bool == true) {
        bool = false
    }
    else {
        bool = true;
    }
    return bool;
}

function toggleMarkAll() {
    var toggleBoolean = toggle();

    if (toggleBoolean == true) {
        var selectedVerseId = getSelectedVerseId();
        lineCount = Number(selectedVerseId) * linePerVerse;
    }

    log("[toggleMarkAll] bool: " + toggleBoolean)
    markAllLines(toggleBoolean)
}

function markAllLines(toggle) {
    lines = document.querySelectorAll(".line");

    lines.forEach(line => {
        const isMarked = line.querySelector("mark");
        if (!isMarked && toggle == true) {
            toggleMark(line)
        }
        else if (isMarked && toggle == false) {
            toggleMark(line)
        }
    })
}

// Pauses and plays audio of the selected verse
var currentAudio;
function pausePlay() {
    var audio = document.querySelector(".selected").parentElement.firstElementChild;

    log("[keyevent SPACE] Current audio: ")
    log(currentAudio)
    log("[keyevent SPACE] audio: ")
    log(audio)
    log("[keyevent SPACE] currentTime: " + audio.currentTime)

    // If selected vers is diffrent from vers that is currently playing then reset currentAudio. 
    if (currentAudio != audio && currentAudio != null) {
        currentAudio.load()
    }

    // If audio space is pressed while audio is playing then is should reset the audio.
    if (audio.currentTime > 0 && audio.currentTime < audio.duration) {
        audio.load()
    }
    else {
        audio.play()
    }
    currentAudio = audio
}

//Select verse when clicked on.
document.querySelectorAll(".verse").forEach(item => {
    item.addEventListener("click", event => {
        log(event.target);
        selectVerse(event.target.id);
    })
    log("[eventlistener] addEventListener to item id:" + item.id);
});


document.onkeydown = function checkKey(event) {
    // Play <audio> tag in the same <div> as selected <p> tag when space is pressed. 
    if (event.key == " ") {
        pausePlay();
    }
    else if (event.key == "Enter" || event.key == "Backspace") {
        selectVerseKey(event.key)
    }
    else if (event.key == "ArrowDown" || event.key == "ArrowUp") {
        toggleMarkArrow(event.key)
    }
};


// DRIVER CODE

