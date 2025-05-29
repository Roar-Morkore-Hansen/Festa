
var currentAudio;

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

    var verse_id_new = id;
    var verse_id_prev = document.querySelector(".selected").id;
    document.getElementById(verse_id_prev).classList.toggle("selected");
    document.getElementById(verse_id_new).classList.toggle("selected");

};


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

        log("[keyevent] Current audio: ")
        log(currentAudio)
        log("[keyevent] audio: ")
        log(audio)

        // If selected vers is diffrent from vers that is currently playing then reset currentAudio. 
        if (currentAudio != audio || currentAudio != null) {
            currentAudio.load()
        }

        // If audio space is pressed while audio is playing then is should reset the audio.
        if (audio.currentTime > 0) {
            audio.load()
        }
        else {
            audio.play()
        }

        currentAudio = audio
    }
};

// DRIVER CODE


