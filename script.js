
var currentAudio;

    // Count lines in the current verse
const linePerVerse = 4

// Turn loggin on or off with single variable.
print_log = true;

function log(string) {
    if (print_log == true) {
        console.log(string);
    }
}

// Deselecet prevoius and select new
function selectVerse(id) {
    log("[selectVerse] Selected id: " + id);

    maxVersesNum = document.querySelectorAll(".verse").length

    if (id >= 0 && id <= maxVersesNum) {   
        var verse_id_new = id;
        var verse_id_prev = document.querySelector(".selected").id;
        document.getElementById(verse_id_prev).classList.toggle("selected");
        document.getElementById(verse_id_new).classList.toggle("selected");
    }

};

function selectVerseKey(key) {
    var selectedVerse = document.querySelector(".selected").id;
    lastVerse = 2;
    log("[selectVerseKey] selectedVerse: " + selectedVerse)
    if (key == "Enter") {
        verse = Number(selectedVerse) + 1;
        selectVerse(verse)
        log("[selectVerseKey] verseDown: " + verse)
    }
    else if (key == "Backspace") {
        verse = Number(selectedVerse) - 1
        selectVerse(verse)
        log("[selectVerseKey] verseUp: " + verse)
    }
}

function toggleMark(lineId) {
    const span = document.getElementById("line-" + lineId);
    if (!span) return;
  
    const isMarked = span.querySelector("mark");
  
    if (isMarked) {
      span.innerHTML = isMarked.innerHTML;
    } else {
      span.innerHTML = `<mark>${span.innerHTML}</mark>`;
    }
  }

  let lineCount = 0; // Start at first line

function toggleMarkArrow(key) {
    selectedVerseId = document.querySelector(".selected").id;
    maxLineNum = document.querySelectorAll(".line").length

    if (key === "ArrowDown" && lineCount <= (maxLineNum - 1)) {
        lineCount++;
        toggleMark(lineCount);
    } else if (key === "ArrowUp" && lineCount != 0) {
        toggleMark(lineCount);
        lineCount--;
    }


    if (lineCount < (Number(selectedVerseId) * linePerVerse)) {
        console.log("prev verse")
        selectVerse(selectedVerseId - 1);
    } else if (lineCount > ((Number(selectedVerseId) + 1) * (linePerVerse))) {
        console.log("next verse")
        selectVerse(Number(selectedVerseId) + 1);
    }

    console.log(`[toggleMarkArrow] selectedVerseId: ${selectedVerseId}, lineCount: ${lineCount}`);
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
    tog = toggle();

    if (tog == true) {
        selectedVerseId = document.querySelector(".selected").id;
        lineCount = selectedVerseId * linePerVerse
    }

    console.log(tog)
    markAllLines(tog)
}

function markAllLines(toggle) {
    lines = document.querySelectorAll(".line");

    lines.forEach(line => {
        const isMarked = line.querySelector("mark");
        if (!isMarked && toggle == true) {
          line.innerHTML = `<mark>${line.innerHTML}</mark>`;
        }
        else if (isMarked && toggle == false) {
            line.innerHTML = isMarked.innerHTML;
        }
    })
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
    else if (event.key == "Enter" || event.key == "Backspace") {
        selectVerseKey(event.key)
    }
    else if (event.key == "ArrowDown" || event.key == "ArrowUp") {
        toggleMarkArrow(event.key)
    }
};


// DRIVER CODE

